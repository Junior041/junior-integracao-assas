import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { BankAccount as BankAccountDomain } from '@/domain/enterprise/entities/bank-account';
import { Prisma } from '@prisma/client';

export class PrismaBankAccountMapper {
  static toDomain(
    raw: Prisma.BankAccountUncheckedCreateInput,
  ): BankAccountDomain {
    return BankAccountDomain.create(
      {
        account: raw.account,
        accountDigit: raw.accountDigit,
        agency: raw.agency,
        bank: raw.bank,
        fkPessoa: raw.fkPessoa,
        fkUserCreate: raw.fkUserCreate,
        idAccount: raw.idAccount,
        incomeValue: raw.incomeValue,
        createdAt: raw.createdAt ? new Date(raw.createdAt) : undefined,
      },
      new UniqueEntityID(raw.fkPessoa),
    );
  }

  static toPersistence(
    bankaccount: BankAccountDomain,
  ): Prisma.BankAccountUncheckedCreateInput {
    return {
      account: bankaccount.account,
      accountDigit: bankaccount.accountDigit,
      agency: bankaccount.agency,
      bank: bankaccount.bank,
      fkPessoa: bankaccount.fkPessoa,
      fkUserCreate: bankaccount.fkUserCreate,
      idAccount: bankaccount.idAccount,
      incomeValue: bankaccount.incomeValue,
    };
  }
}
