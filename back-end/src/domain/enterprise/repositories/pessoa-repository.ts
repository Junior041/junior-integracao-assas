import { PaginationParams } from "@/core/repositories/pagination-params";
import { Pessoa } from "../entities/pessoa-entity";
import { OrderColumnParams } from "@/core/repositories/order-column-params";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export abstract class PessoaRepository {
  abstract create(data: Pessoa): Promise<Pessoa>;
  abstract save(idPessoa: UniqueEntityID,data: Pessoa): Promise<Pessoa>;
  abstract findByCpfCnpj(cpfCnpj: string): Promise<Pessoa | null>;
  abstract findById(idPessoa: string): Promise<Pessoa | null>;
  abstract getAllPessoas({
    pagination,
    order,
    filtro,
  }: {
    pagination: PaginationParams;
    order: OrderColumnParams;
    filtro: {
      nome?: string;
      cpfCnpj?: string;
    };
  }): Promise<{ pessoas: Pessoa[]; pagination: PaginationParams }>;
}
