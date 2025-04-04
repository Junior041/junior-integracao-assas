import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface EnderecoProps {
  fkPessoa: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  createdAt: Date;
}

export class Endereco extends Entity<EnderecoProps> {
  get fkPessoa() {
    return this.props.fkPessoa;
  }
  get cep() {
    return this.props.cep;
  }
  get rua() {
    return this.props.rua;
  }
  get numero() {
    return this.props.numero;
  }
  get complemento() {
    return this.props.complemento;
  }
  get bairro() {
    return this.props.bairro;
  }
  get cidade() {
    return this.props.cidade;
  }
  get estado() {
    return this.props.estado;
  }
  get pais() {
    return this.props.pais;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  static create(
    props: Optional<EnderecoProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Endereco {
    const endereco = new Endereco(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props,
      },
      id,
    );
    return endereco;
  }
}
