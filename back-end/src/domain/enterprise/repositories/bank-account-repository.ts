import { BankAccount } from '../entities/bank-account';

export abstract class BankAccountRepository {
  abstract create(data: BankAccount): Promise<BankAccount>;
  abstract findById(idBankAccount: string): Promise<BankAccount | null>;
  abstract findByFkPessoa(fkPessoa: string): Promise<BankAccount[]>;
}
