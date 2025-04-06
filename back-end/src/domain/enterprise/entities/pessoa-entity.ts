import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Endereco } from './endereco-entity';
import { BankAccount } from './bank-account';

export interface PessoaProps {
  nome: string;
  cpfCnpj: string;
  createdAt: Date;
  enderecos?: Endereco[];
  bankAccounts?: BankAccount[];

  //parte da assas
  telefone: string;
  email: string;
  dataNascimento: Date;
}

export class Pessoa extends Entity<PessoaProps> {
  get nome() {
    return this.props.nome;
  }
  get cpfCnpj() {
    return this.props.cpfCnpj;
  }
  get enderecos() {
    return this.props.enderecos;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  set nome(nome) {
    this.props.nome = nome;
  }

  // parte que precisa no assas
  get telefone() {
    return this.props.telefone;
  }
  get email() {
    return this.props.email;
  }
  get dataNascimento() {
    return this.props.dataNascimento;
  }
  get bankAccounts() {
    return this.props.bankAccounts;
  }
  static create(
    props: Optional<PessoaProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Pessoa {
    const pessoa = new Pessoa(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props,
      },
      id,
    );
    return pessoa;
  }
}
