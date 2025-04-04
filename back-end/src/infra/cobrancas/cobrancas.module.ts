import { Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { IntegracaoCobrancas } from '@/domain/application/integracoes/cobrancas/integracao-cobrancas';
import { Assas } from './assas';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: IntegracaoCobrancas,
      useClass: Assas,
    },
  ],
  exports: [IntegracaoCobrancas],
})
export class DocumentSignerModule {}
