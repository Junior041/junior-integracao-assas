import { faker } from "@faker-js/faker";

import { Usuario, UsuarioProps } from "@/domain/enterprise/entities/usuario-entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makePessoa } from "./make-pessoa";

export function makeUsuario(override: Partial<UsuarioProps> = {}, id?: UniqueEntityID): Usuario {
  const pessoa = makePessoa({}, override.fkPessoa ? new UniqueEntityID(override.fkPessoa) : new UniqueEntityID());
  const usuario = Usuario.create(
    {
      ativo: override.ativo || faker.datatype.boolean(),
      email: override.email || faker.internet.email(),
      fkPessoa: override.fkPessoa || pessoa.id.toString(),
      senha: override.senha || faker.lorem.slug(2),
      createdAt: override.createdAt,
      updatedAt: override.updatedAt,
    },
    id || new UniqueEntityID()
  );
  return usuario;
}
