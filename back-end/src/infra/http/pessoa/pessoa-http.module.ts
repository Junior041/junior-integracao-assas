import { Module } from '@nestjs/common';
import { CreatePessoaController } from './controllers/create-pessoa.controller';
import { CreatePessoaUseCase } from '@/domain/application/cases/pessoa/create-pessoa-use-case';
import { DatabaseModule } from '@/infra/database/database.module';
import { GetPessoaController } from './controllers/get-all-pessoa.controller';
import { GetPessoaUseCase } from '@/domain/application/cases/pessoa/get-all-pessoa-use-case';
import { UpdatePessoaUseCase } from '@/domain/application/cases/pessoa/update-pessoa-use-case';
import { UpdatePessoaController } from './controllers/update-pessoa.controller';
import { DeletePessoaController } from './controllers/delete-pessoa.controller';
import { DeletePessoaUseCase } from '@/domain/application/cases/pessoa/delete-pessoa-use-case';
import { MailModule } from '@/infra/mail/mail.module';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [
    CreatePessoaController,
    GetPessoaController,
    UpdatePessoaController,
    DeletePessoaController,
  ],
  providers: [
    CreatePessoaUseCase,
    GetPessoaUseCase,
    UpdatePessoaUseCase,
    DeletePessoaUseCase,
  ],
})
export class PessoaHttpModule {}
