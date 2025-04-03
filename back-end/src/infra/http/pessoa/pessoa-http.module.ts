import { Module } from '@nestjs/common';
import { CreatePessoaController } from './controllers/create-pessoa.controller';
import { CreatePessoaUseCase } from '@/domain/application/cases/pessoa/create-pessoa-use-case';
import { DatabaseModule } from '@/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CreatePessoaController],
  providers: [CreatePessoaUseCase],
})
export class PessoaHttpModule {}
