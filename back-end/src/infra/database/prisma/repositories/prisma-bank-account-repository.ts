import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { EnvService } from '@/infra/env/env.service';
import { BankAccountRepository } from '@/domain/enterprise/repositories/bank-account-repository';
import { BankAccount } from '@/domain/enterprise/entities/bank-account';
import { PrismaBankAccountMapper } from '../mappers/prisma-bank-account-mapper';

@Injectable()
export class PrismaBankAccountRepository implements BankAccountRepository {
  constructor(
    private prisma: PrismaService,
    private envService: EnvService,
  ) {}
  async create(data: BankAccount): Promise<BankAccount> {
    const result = await this.prisma.bankAccount.create({
      data: PrismaBankAccountMapper.toPersistence(data),
    });
    return PrismaBankAccountMapper.toDomain(result);
  }
  async findById(idBankAccount: string): Promise<BankAccount | null> {
    const result = await this.prisma.bankAccount.findUnique({
      where: {
        idBankAccount,
      },
    });
    if (!result) {
      return null;
    }
    return PrismaBankAccountMapper.toDomain(result);
  }
  async findByFkPessoa(fkPessoa: string): Promise<BankAccount[]> {
    const result = await this.prisma.bankAccount.findMany({
      where: {
        fkPessoa,
      },
    });
    return result.map(PrismaBankAccountMapper.toDomain);
  }
}
