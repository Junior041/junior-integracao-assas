import { GraficoRendaTotalPorMesUseCase } from '@/domain/application/cases/graficos/bank-account/grafico-renda-total-por-mes-use-case';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@Controller('contas')
@ApiTags('Gráficos')
export class GraficoRendaTotalPorMesController {
  constructor(
    private readonly graficoRendaTotalPorMesUseCase: GraficoRendaTotalPorMesUseCase,
  ) {}

  @Get('renda-total-por-mes')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Renda total agrupada por mês retornada com sucesso.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno ao gerar gráfico de renda total por mês.',
  })
  async handle() {
    const result = await this.graficoRendaTotalPorMesUseCase.execute();
    return result.value;
  }
}
