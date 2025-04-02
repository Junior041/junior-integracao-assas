import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface PessoaProps {
  nome: string;
  cpfCnpj: string;
  fkUserCreate: string;
  createdAt: Date;
}

export class Pessoa extends Entity<PessoaProps> {
  get nome() {
    return this.props.nome;
  }
  get cpfCnpj() {
    return this.props.cpfCnpj;
  }
  get fkUserCreate() {
    return this.props.fkUserCreate;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  set nome(nome) {
    this.props.nome = nome;
  }
  static create(props: Optional<PessoaProps, "createdAt">, id?: UniqueEntityID): Pessoa {
    const pessoa = new Pessoa(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props,
      },
      id
    );
    return pessoa;
  }
}
