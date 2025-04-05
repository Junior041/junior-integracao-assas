import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateEnderecoUseCase } from '@/domain/application/cases/endereco/create-endereco-use-case';
import { CreateEnderecoController } from './controllers/create-endereco.controller';
import { FetchEnderecoByPessoaController } from './controllers/fetch-endereco-by-pessoa.controller';
import { FetchEnderecoByPessoaUseCase } from '@/domain/application/cases/endereco/fetch-endereco-by-pessoa-use-case';
import { DeleteEnderecoController } from './controllers/delte-endereco.controller';
import { DeleteEnderecoUseCase } from '@/domain/application/cases/endereco/delete-endereco-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateEnderecoController,
    FetchEnderecoByPessoaController,
    DeleteEnderecoController,
  ],
  providers: [
    CreateEnderecoUseCase,
    FetchEnderecoByPessoaUseCase,
    DeleteEnderecoUseCase,
  ],
})
export class EnderecoHttpModule {}
