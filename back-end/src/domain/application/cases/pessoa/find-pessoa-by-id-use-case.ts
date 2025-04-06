import { Either, left, right } from '@/core/either';
import { Pessoa } from '@/domain/enterprise/entities/pessoa-entity';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { Injectable } from '@nestjs/common';

interface FindPessoaByIdUseCaseRequest {
  idPessoa: string;
}

type FindPessoaByIdUseCaseResponse = Either<
  null,
  {
    pessoa: Pessoa;
  }
>;

@Injectable()
export class FindPessoaByIdUseCase {
  constructor(private pessoaRepository: PessoaRepository) {}

  async execute({
    idPessoa,
  }: FindPessoaByIdUseCaseRequest): Promise<FindPessoaByIdUseCaseResponse> {
    const result = await this.pessoaRepository.findById(idPessoa);
    if (!result) {
      return left(null);
    }
    return right({
      pessoa: result,
    });
  }
}
