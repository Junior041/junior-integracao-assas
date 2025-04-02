import { Module } from '@nestjs/common';
import { CreatePessoaController } from './controllers/create-pessoa.controller';
import { CreatePessoaUseCase } from '@/domain/application/cases/pessoa/create-pessoa-use-case';

@Module({
  //   imports: [PessoaDatabaseModule],
  controllers: [CreatePessoaController],
  providers: [CreatePessoaUseCase],
})
export class PessoaHttpModule {}
