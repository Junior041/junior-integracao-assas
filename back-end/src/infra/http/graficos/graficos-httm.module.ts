import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { GraficoPessoasPorIdadeUseCase } from '@/domain/application/cases/graficos/pessoas/grafico-pessoas-por-idade-use-case';
import { GraficoPessoasPorIdadeController } from './controllers/pessoas/grafico-pessoa-por-idade.controller';
import { GraficoContasPorMesController } from './controllers/bank-account/grafico-contas-por-mes.controller';
import { GraficoRendaTotalPorMesController } from './controllers/bank-account/grafico-renda-total-por-mes.controller';
import { GraficoRendaTotalPorMesUseCase } from '@/domain/application/cases/graficos/bank-account/grafico-renda-total-por-mes-use-case';
import { GraficoGraficoContasPorMesUseCase } from '@/domain/application/cases/graficos/bank-account/grafico-contas-por-mes-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    GraficoPessoasPorIdadeController,
    GraficoContasPorMesController,
    GraficoRendaTotalPorMesController,
  ],
  providers: [
    GraficoPessoasPorIdadeUseCase,
    GraficoGraficoContasPorMesUseCase,
    GraficoRendaTotalPorMesUseCase,
  ],
})
export class GraficosHttpModule {}
