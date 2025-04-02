import { Endereco } from "../entities/endereco-entity";

export abstract class EnderecoRepository {
  abstract create(data: Endereco): Promise<Endereco>;
  abstract findById(idEndereco: string): Promise<Endereco | null>;
  abstract delete(idEndereco: string): Promise<null>;
}
