import { GraficoPessoasPorIdadeUseCase } from '@/domain/application/cases/graficos/pessoas/grafico-pessoas-por-idade-use-case';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('pessoas')
@ApiTags('Gráficos')
export class GraficoPessoasPorIdadeController {
  constructor(
    private readonly graficoPessoasPorIdade: GraficoPessoasPorIdadeUseCase,
  ) {}

  @Get('por-idade')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Faixas etárias das pessoas retornadas com sucesso.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          faixa: { type: 'string', example: '18-25' },
          total: { type: 'number', example: 42 },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Não autorizado.' })
  async handle() {
    const result = await this.graficoPessoasPorIdade.execute({});

    return result.value;
  }
}
