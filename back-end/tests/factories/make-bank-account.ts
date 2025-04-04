import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  BankAccount,
  BankAccountProps,
} from '@/domain/enterprise/entities/bank-account';
import { makePessoa } from './make-pessoa';
import { makeUsuario } from './make-usuario';

export function makeBankAccount(
  override: Partial<BankAccountProps> = {},
  id?: UniqueEntityID,
): BankAccount {
  const pessoa = makePessoa(
    {},
    new UniqueEntityID(override.fkPessoa) || new UniqueEntityID(),
  );
  const usuario = makeUsuario(
    { fkPessoa: pessoa.id.toString() },
    new UniqueEntityID(),
  );

  const bankAccount = BankAccount.create(
    {
      fkPessoa: override.fkPessoa || pessoa.id.toString(),
      fkUserCreate: override.fkUserCreate || usuario.id.toString(),
      account: override.account || faker.number.int({ max: 9999 }).toString(),
      accountDigit: override.accountDigit || faker.string.numeric(1),
      agency: override.agency || faker.string.numeric(4),
      bank: override.bank || faker.company.name(),
      idAccount: override.idAccount || faker.string.uuid(),
      incomeValue:
        override.incomeValue || faker.number.float({ min: 1000, max: 10000 }),
      createdAt: override.createdAt || new Date(),
    },
    id || new UniqueEntityID(),
  );

  return bankAccount;
}
