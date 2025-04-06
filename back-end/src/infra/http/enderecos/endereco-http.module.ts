import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateEnderecoUseCase } from '@/domain/application/cases/endereco/create-endereco-use-case';
import { CreateEnderecoController } from './controllers/create-endereco.controller';
import { FetchEnderecoByPessoaController } from './controllers/fetch-endereco-by-pessoa.controller';
import { FetchEnderecoByPessoaUseCase } from '@/domain/application/cases/endereco/fetch-endereco-by-pessoa-use-case';
import { DeleteEnderecoController } from './controllers/delete-endereco.controller';
import { DeleteEnderecoUseCase } from '@/domain/application/cases/endereco/delete-endereco-use-case';
import { UpdateEnderecoController } from './controllers/update-endereco.controller';
import { UpdateEnderecoUseCase } from '@/domain/application/cases/endereco/update-endereco-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateEnderecoController,
    FetchEnderecoByPessoaController,
    DeleteEnderecoController,
    UpdateEnderecoController,
  ],
  providers: [
    CreateEnderecoUseCase,
    FetchEnderecoByPessoaUseCase,
    DeleteEnderecoUseCase,
    UpdateEnderecoUseCase,
  ],
})
export class EnderecoHttpModule {}
