import { faker } from '@faker-js/faker';

import {
  Endereco,
  EnderecoProps,
} from '@/domain/enterprise/entities/endereco-entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makePessoa } from './make-pessoa';

export function makeEndereco(
  override: Partial<EnderecoProps> = {},
  id?: UniqueEntityID,
): Endereco {
  const pessoa = makePessoa(
    {},
    override.fkPessoa
      ? new UniqueEntityID(override.fkPessoa)
      : new UniqueEntityID(),
  );

  const endereco = Endereco.create(
    {
      fkPessoa: override.fkPessoa || pessoa.id.toString(),
      bairro: override.bairro || faker.location.street(),
      cep: override.cep || faker.location.zipCode(),
      cidade: override.cidade || faker.location.city(),
      estado: override.estado || faker.location.state(),
      pais: override.pais || faker.location.country(),
      rua: override.rua || faker.location.streetAddress(),
      complemento: override.complemento || faker.lorem.words(2),
      createdAt: override.createdAt || new Date(),
      numero: faker.number.int().toString(),
    },
    id || new UniqueEntityID(),
  );

  return endereco;
}
