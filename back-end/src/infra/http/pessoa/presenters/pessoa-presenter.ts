import { Pessoa } from '@/domain/enterprise/entities/pessoa-entity';
import { Formatar } from '@/domain/utils/formatar';
import { BankAccountPresenter } from '../../bank-account/presenters/bank-account-presenter';
import { EnderecoPresenter } from '../../enderecos/presenter/endereco-presenter';

export class PessoaPresenter {
  static toHTTP(pessoa: Pessoa) {
    return {
      idPessoa: pessoa.id.toString(),
      nome: pessoa.nome,
      cpfCnpj: Formatar.cpfOuCnpj(pessoa.cpfCnpj),
      telefone: Formatar.telefone(pessoa.telefone),
      email: pessoa.email,
      dataNascimento: pessoa.dataNascimento,
      createdAt: pessoa.createdAt,
      bankAccount: pessoa.bankAccounts
        ? pessoa.bankAccounts.map(BankAccountPresenter.toHTTP)
        : undefined,
      enderecos: pessoa.enderecos
        ? pessoa.enderecos.map(EnderecoPresenter.toHTTP)
        : undefined,
    };
  }
}
