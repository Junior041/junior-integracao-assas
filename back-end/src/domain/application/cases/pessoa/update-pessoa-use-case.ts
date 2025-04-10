import { Either, left, right } from '@/core/either';
import { DadoNaoEncontradoErro } from '@/core/errors/errors/dado-nao-encontrado-erro';
import { Pessoa } from '@/domain/enterprise/entities/pessoa-entity';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { Injectable } from '@nestjs/common';

interface UpdatePessoaUseCaseRequest {
  idPessoa: string;
  nome: string;
}

type UpdatePessoaUseCaseResponse = Either<Error, { pessoa: Pessoa }>;
@Injectable()
export class UpdatePessoaUseCase {
  constructor(private pessoaRepository: PessoaRepository) {}

  async execute({
    idPessoa,
    nome,
  }: UpdatePessoaUseCaseRequest): Promise<UpdatePessoaUseCaseResponse> {
    const pessoa = await this.pessoaRepository.findById(idPessoa);
    if (!pessoa) {
      return left(
        new DadoNaoEncontradoErro({
          dado: 'idPessoa',
          valor: idPessoa,
        }),
      );
    }
    pessoa.nome = nome;

    const pessoaAtualizada = await this.pessoaRepository.save(idPessoa, pessoa);

    return right({ pessoa: pessoaAtualizada });
  }
}
