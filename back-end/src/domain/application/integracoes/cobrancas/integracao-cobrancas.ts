export type CreateAccountBody = {
  name: string;
  email: string;
  cpfCnpj: string;
  mobilePhone: string;
  incomeValue: number;
  address: string;
  addressNumber?: string;
  province: string;
  postalCode: string;
  birthDate: Date;
};

export type CreateAccountResponse = {
  object: string;
  id: string; // UUID
  accountNumber: {
    agency: string;
    account: string;
    accountDigit: string;
  };
};

export abstract class IntegracaoCobrancas {
  abstract createAccount(
    body: CreateAccountBody,
  ): Promise<CreateAccountResponse | { errors: any[] } | null>;
}
