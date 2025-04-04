import { faker } from '@faker-js/faker';

import {
  Pessoa,
  PessoaProps,
} from '@/domain/enterprise/entities/pessoa-entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export function makePessoa(
  override: Partial<PessoaProps> = {},
  id?: UniqueEntityID,
): Pessoa {
  const pessoa = Pessoa.create(
    {
      cpfCnpj: override.cpfCnpj || '33.364.217/0001-30',
      fkUserCreate: override.fkUserCreate || new UniqueEntityID().toString(),
      nome: override.nome || faker.person.fullName(),
      createdAt: override.createdAt || undefined,
      dataNascimento: override.dataNascimento || faker.date.birthdate(),
      email: override.email || faker.internet.email(),
      telefone: override.telefone || '47999999999',
      enderecos: override.enderecos,
    },
    id || new UniqueEntityID(),
  );
  return pessoa;
}
