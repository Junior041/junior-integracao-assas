import { Either, left, right } from '@/core/either';
import { GenericoErro } from '@/core/errors/errors/generico-erro';
import { JaCadastradroErro } from '@/core/errors/errors/ja-registrado-erro';
import { Pessoa } from '@/domain/enterprise/entities/pessoa-entity';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { Formatar } from '@/domain/utils/formatar';
import { Validations } from '@/domain/utils/validations';
import { Injectable } from '@nestjs/common';

interface CreatePessoaUseCaseRequest {
  nome: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  dataNascimento: Date;
  fkUserCreate: string;
}

type CreatePessoaUseCaseResponse = Either<
  JaCadastradroErro,
  {
    pessoa: Pessoa;
  }
>;
@Injectable()
export class CreatePessoaUseCase {
  constructor(private pessoaRepository: PessoaRepository) {}

  async execute(
    data: CreatePessoaUseCaseRequest,
  ): Promise<CreatePessoaUseCaseResponse> {
    if (
      !Validations.isValidCnpj(Formatar.limparString(data.cpfCnpj)) ||
      !Validations.isValidCpf(Formatar.limparString(data.cpfCnpj))
    ) {
      return left(new GenericoErro('cpf/cnpj invalido'));
    }

    const pessoaJaCadastrada = await this.pessoaRepository.verifyByUnique({
      cpfCnpj: Formatar.limparString(data.cpfCnpj),
      telefone: Formatar.limparString(data.telefone),
      email: data.email,
    });
    if (pessoaJaCadastrada) {
      return left(new JaCadastradroErro('Pessoa já cadastrada.'));
    }
    const pessoaSalvaNoBanco = await this.pessoaRepository.create(
      Pessoa.create({
        ...data,
        cpfCnpj: Formatar.limparString(data.cpfCnpj),
        telefone: Formatar.apenasNumeros(data.telefone),
      }),
    );
    return right({
      pessoa: pessoaSalvaNoBanco,
    });
  }
}
