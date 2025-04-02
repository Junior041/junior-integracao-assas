import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface UsuarioProps {
  fkPessoa: string;
  email: string;
  senha: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Usuario extends Entity<UsuarioProps> {
  get fkPessoa() {
    return this.props.fkPessoa;
  }
  get email() {
    return this.props.email;
  }
  get senha() {
    return this.props.senha;
  }
  get ativo() {
    return this.props.ativo;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<UsuarioProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Usuario {
    const usuario = new Usuario(
      {
        createdAt: props.createdAt ?? new Date(),
        updatedAt: null,
        ...props,
      },
      id,
    );
    return usuario;
  }
}
