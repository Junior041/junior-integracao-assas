import { GraficoGraficoContasPorMesUseCase } from '@/domain/application/cases/graficos/bank-account/grafico-contas-por-mes-use-case';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('contas')
@ApiTags('Gráficos')
export class GraficoContasPorMesController {
  constructor(
    private readonly graficoContasPorMes: GraficoGraficoContasPorMesUseCase,
  ) {}

  @Get('por-mes')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Total de contas cadastradas por mês.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          mes: { type: 'string', example: '2025-04' },
          total: { type: 'number', example: 10 },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado.' })
  async handle() {
    const result = await this.graficoContasPorMes.execute();
    return result.value;
  }
}
