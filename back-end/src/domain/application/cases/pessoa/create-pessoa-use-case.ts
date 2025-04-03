import { Either, left, right } from '@/core/either';
import { JaCadastradroErro } from '@/core/errors/errors/ja-registrado-erro';
import { Pessoa } from '@/domain/enterprise/entities/pessoa-entity';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { Formatar } from '@/domain/utils/formatar';
import { Injectable } from '@nestjs/common';

interface CreatePessoaUseCaseRequest {
  nome: string;
  cpfCnpj: string;
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
    const cpfJaCadastrado = await this.pessoaRepository.findByCpfCnpj(
      Formatar.limparString(data.cpfCnpj),
    );
    if (cpfJaCadastrado) {
      return left(new JaCadastradroErro('Pessoa já cadastrada.'));
    }
    const pessoaSalvaNoBanco = await this.pessoaRepository.create(
      Pessoa.create({ ...data, cpfCnpj: Formatar.limparString(data.cpfCnpj) }),
    );
    return right({
      pessoa: pessoaSalvaNoBanco,
    });
  }
}
