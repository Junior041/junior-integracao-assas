import { Endereco } from "../entities/endereco-entity";

export abstract class EnderecoRepository {
  abstract create(data: Endereco): Promise<Endereco>;
}
