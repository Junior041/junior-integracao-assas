import { Either, right } from '@/core/either';
import { OrderColumnParams } from '@/core/repositories/order-column-params';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { Pessoa } from '@/domain/enterprise/entities/pessoa-entity';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { Formatar } from '@/domain/utils/formatar';
import { Injectable } from '@nestjs/common';

interface GetPessoaUseCaseRequest {
  pagination: PaginationParams;
  order: OrderColumnParams;
  filtro: {
    nome?: string;
    cpfCnpj?: string;
  };
}

type GetPessoaUseCaseResponse = Either<
  null,
  {
    pessoas: Pessoa[];
    pagination: PaginationParams;
  }
>;

@Injectable()
export class GetPessoaUseCase {
  constructor(private pessoaRepository: PessoaRepository) {}

  async execute({
    filtro,
    order,
    pagination,
  }: GetPessoaUseCaseRequest): Promise<GetPessoaUseCaseResponse> {
    const result = await this.pessoaRepository.getAllPessoas({
      filtro: {
        cpfCnpj: filtro.cpfCnpj
          ? Formatar.limparString(filtro.cpfCnpj)
          : undefined,
        nome: filtro.nome,
      },
      order,
      pagination,
    });
    return right({
      pessoas: result.pessoas,
      pagination: result.pagination,
    });
  }
}
