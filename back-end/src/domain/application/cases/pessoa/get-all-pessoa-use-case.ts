import { Either, right } from "@/core/either";
import { OrderColumnParams } from "@/core/repositories/order-column-params";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { Pessoa } from "@/domain/enterprise/entities/pessoa-entity";
import { PessoaRepository } from "@/domain/enterprise/repositories/pessoa-repository";

interface GetCreatePessoaUseCaseRequest {
  pagination: PaginationParams;
  order: OrderColumnParams;
  filtro: {
    nome?: string;
    cpfCnpj?: string;
  };
}

type GetCreatePessoaUseCaseResponse = Either<
  null,
  {
    pessoas: Pessoa[];
    pagination: PaginationParams;
  }
>;

export class GetCreatePessoaUseCase {
  constructor(private pessoaRepository: PessoaRepository) {}

  async execute({ filtro, order, pagination }: GetCreatePessoaUseCaseRequest): Promise<GetCreatePessoaUseCaseResponse> {
    const result = await this.pessoaRepository.getAllPessoas({ filtro, order, pagination });
    return right({
      pessoas: result.pessoas,
      pagination: result.pagination,
    });
  }
}
