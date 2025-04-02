import { Pessoa } from "../entities/pessoa-entity";

export abstract class PessoaRepository {
    abstract create(data:Pessoa): Promise<Pessoa>
    abstract findByCpfCnpj(cpfCnpj: string): Promise<Pessoa | null>
}