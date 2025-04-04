import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface BankAccountProps {
  idAccount: string;
  bank: string;
  fkPessoa: string;
  incomeValue: number;
  agency: string;
  account: string;
  accountDigit: string;
  createdAt: Date;
  fkUserCreate: string;
}

export class BankAccount extends Entity<BankAccountProps> {
  get idAccount() {
    return this.props.idAccount;
  }
  get bank() {
    return this.props.bank;
  }
  get incomeValue() {
    return this.props.incomeValue;
  }
  get fkPessoa() {
    return this.props.fkPessoa;
  }
  get agency() {
    return this.props.agency;
  }
  get account() {
    return this.props.account;
  }
  get accountDigit() {
    return this.props.accountDigit;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get fkUserCreate() {
    return this.props.fkUserCreate;
  }
  static create(
    props: Optional<BankAccountProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): BankAccount {
    const bankaccount = new BankAccount(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props,
      },
      id,
    );
    return bankaccount;
  }
}
