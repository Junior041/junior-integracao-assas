import { Either, left, right } from '@/core/either';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { Injectable } from '@nestjs/common';
import { DadoNaoEncontradoErro } from '@/core/errors/errors/dado-nao-encontrado-erro';
import { GenericoErro } from '@/core/errors/errors/generico-erro';
import { BankAccountRepository } from '@/domain/enterprise/repositories/bank-account-repository';
import { BankAccount } from '@/domain/enterprise/entities/bank-account';
import { JaCadastradroErro } from '@/core/errors/errors/ja-registrado-erro';
import { IntegracaoCobrancas } from '../../integracoes/cobrancas/integracao-cobrancas';
import { UsuarioRepository } from '@/domain/enterprise/repositories/usuario-repository';
import { CredenciaisInvalidasError } from '@/core/errors/errors/credenciais-invalidas-error';

interface CreateBankAccountUseCaseRequest {
  bank: string;
  incomeValue: number;
  fkPessoa: string;
  fkUserCreate: string;
}

type CreateBankAccountUseCaseResponse = Either<
  | DadoNaoEncontradoErro
  | JaCadastradroErro
  | GenericoErro
  | CredenciaisInvalidasError,
  {
    bankAccount: BankAccount;
  }
>;
@Injectable()
export class CreateBankAccountUseCase {
  constructor(
    private integracaoCobranca: IntegracaoCobrancas,
    private pessoaRepository: PessoaRepository,
    private usuarioRepository: UsuarioRepository,
    private bankAccountRepository: BankAccountRepository,
  ) {}

  async execute({
    fkPessoa,
    fkUserCreate,
    bank,
    incomeValue,
  }: CreateBankAccountUseCaseRequest): Promise<CreateBankAccountUseCaseResponse> {
    const pessoa = await this.pessoaRepository.findByIdWithEndereco(fkPessoa);
    if (!pessoa) {
      return left(
        new DadoNaoEncontradoErro({
          dado: 'fkPessoa',
          valor: fkPessoa,
        }),
      );
    }
    if (!pessoa.enderecos || pessoa.enderecos.length === 0) {
      return left(new GenericoErro('Pessoa não possuí endereço cadastrado'));
    }
    const createdUser = await this.usuarioRepository.findById(fkUserCreate);
    if (!createdUser) {
      return left(new CredenciaisInvalidasError());
    }

    const bancosDaPessoa =
      await this.bankAccountRepository.findByFkPessoa(fkPessoa);
    if (bancosDaPessoa) {
      const ancoJacadastrado = bancosDaPessoa.find(
        (banco) => banco.bank === bank,
      );
      if (ancoJacadastrado) {
        return left(new JaCadastradroErro('Essa pessoa já possui uma conta'));
      }
    }

    const endereco = pessoa.enderecos[0];
    const retornoApi = await this.integracaoCobranca.createAccount({
      address: endereco.rua,
      addressNumber: endereco.numero,
      birthDate: pessoa.dataNascimento,
      cpfCnpj: pessoa.cpfCnpj,
      email: pessoa.email,
      incomeValue,
      mobilePhone: pessoa.telefone,
      name: pessoa.nome,
      postalCode: endereco.cep,
      province: endereco.bairro,
    });
    if (retornoApi !== null) {
      if ('errors' in retornoApi) {
        const mensagemErro = retornoApi.errors
          .map((e) => e.description)
          .join('; ');
        return left(new GenericoErro(`Erro na integração: ${mensagemErro}`));
      }

      const bankAccount = await this.bankAccountRepository.create(
        BankAccount.create({
          account: retornoApi.accountNumber.account,
          accountDigit: retornoApi.accountNumber.accountDigit,
          agency: retornoApi.accountNumber.agency,
          bank,
          fkPessoa,
          fkUserCreate,
          idAccount: retornoApi.id,
          incomeValue,
        }),
      );
      return right({ bankAccount });
    }
    return left(new GenericoErro('Erro ao criar conta ASSAS'));
  }
}
