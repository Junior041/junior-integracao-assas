import { Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { PrismaService } from './prisma/prisma.service';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { PrismaPessoaRepository } from './prisma/repositories/prisma-pessoa-repository';
import { UsuarioRepository } from '@/domain/enterprise/repositories/usuario-repository';
import { PrismaUsuarioRepository } from './prisma/repositories/prisma-usuario-repository';
import { BankAccountRepository } from '@/domain/enterprise/repositories/bank-account-repository';
import { PrismaBankAccountRepository } from './prisma/repositories/prisma-bank-account-repository';
import { EnderecoRepository } from '@/domain/enterprise/repositories/endereco-repository';
import { PrismaEnderecoRepository } from './prisma/repositories/prisma-endereco-repository';

@Module({
  imports: [EnvModule],
  providers: [
    PrismaService,

    {
      provide: PessoaRepository,
      useClass: PrismaPessoaRepository,
    },
    {
      provide: UsuarioRepository,
      useClass: PrismaUsuarioRepository,
    },
    {
      provide: BankAccountRepository,
      useClass: PrismaBankAccountRepository,
    },
    {
      provide: EnderecoRepository,
      useClass: PrismaEnderecoRepository,
    },
  ],
  exports: [
    PessoaRepository,
    UsuarioRepository,
    BankAccountRepository,
    EnderecoRepository,
  ],
})
export class DatabaseModule {}
