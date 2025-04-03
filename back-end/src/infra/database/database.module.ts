import { Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { PrismaService } from './prisma/prisma.service';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { PrismaPessoaRepository } from './prisma/repositories/prisma-pessoa-repository';

@Module({
  imports: [EnvModule],
  providers: [
    PrismaService,

    {
      provide: PessoaRepository,
      useClass: PrismaPessoaRepository,
    },
  ],
  exports: [PessoaRepository],
})
export class DatabaseModule {}
