import { Either, right } from '@/core/either';
import { Endereco } from '@/domain/enterprise/entities/endereco-entity';
import { EnderecoRepository } from '@/domain/enterprise/repositories/endereco-repository';
import { Injectable } from '@nestjs/common';

interface FetchEnderecoByPessoaUseCaseRequest {
  fkPessoa: string;
}

type FetchEnderecoByPessoaUseCaseResponse = Either<
  null,
  { enderecos: Endereco[] }
>;
@Injectable()
export class FetchEnderecoByPessoaUseCase {
  constructor(private readonly enderecoRepository: EnderecoRepository) {}

  async execute({
    fkPessoa,
  }: FetchEnderecoByPessoaUseCaseRequest): Promise<FetchEnderecoByPessoaUseCaseResponse> {
    const result = await this.enderecoRepository.fetchByFkPessoa(fkPessoa);
    return right({
      enderecos: result,
    });
  }
}
