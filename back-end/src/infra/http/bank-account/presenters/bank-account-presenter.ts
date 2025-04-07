import { BankAccount } from '@/domain/enterprise/entities/bank-account';

export class BankAccountPresenter {
  static toHTTP(bankaccount: BankAccount) {
    return {
      idBankAccount: bankaccount.id.toString(),
      idAccount: bankaccount.idAccount,
      bank: bankaccount.bank,
      fkPessoa: bankaccount.fkPessoa,
      incomeValue: bankaccount.incomeValue,
      agency: bankaccount.agency,
      account: bankaccount.account,
      accountDigit: bankaccount.accountDigit,
      createdAt: bankaccount.createdAt,
      fkUserCreate: bankaccount.fkUserCreate,
    };
  }
}
