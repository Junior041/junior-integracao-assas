import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateBankAccountController } from './controllers/create-bank-account.controller';
import { CreateBankAccountUseCase } from '@/domain/application/cases/bank-account/create-bank-account-use-case';
import { DocumentSignerModule } from '@/infra/cobrancas/cobrancas.module';

@Module({
  imports: [DatabaseModule, DocumentSignerModule],
  controllers: [CreateBankAccountController],
  providers: [CreateBankAccountUseCase],
})
export class BankAccountHttpModule {}
