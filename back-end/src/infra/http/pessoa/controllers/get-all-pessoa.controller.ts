import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { OrderColumnParams } from '@/core/repositories/order-column-params';
import { GetPessoaUseCase } from '@/domain/application/cases/pessoa/get-all-pessoa-use-case';
import { ResponsePessoaDto } from '../dto/response-pessoa-dto';
import { PessoaPresenter } from '../presenters/pessoa-presenter';
import {
  apiQueryOrderParam,
  apiQueryPageParam,
  apiQueryPerPageParam,
  orderSchema,
  orderValidationPipe,
  pageValidationPipe,
  perPageValidationPipe,
} from '../../_global/pagination-params';
import { z } from 'zod';

@Controller('/get-all')
@ApiTags('Pessoa')
export class GetPessoaController {
  constructor(private getPessoa: GetPessoaUseCase) {}

  @Get()
  @ApiOkResponse({
    type: ResponsePessoaDto,
    description: 'Lista de pessoas retornada com sucesso.',
  })
  @ApiBadRequestResponse({ description: 'Erro nos parâmetros da requisição.' })
  @ApiQuery({ name: 'nome', required: false, type: String })
  @ApiQuery({ name: 'cpfCnpj', required: false, type: String })
  @ApiQuery({ name: 'orderBy', required: false, type: String })
  @ApiQuery(apiQueryOrderParam)
  @ApiQuery(apiQueryPageParam)
  @ApiQuery(apiQueryPerPageParam)
  @ApiBearerAuth()
  async handle(
    @Query('page', pageValidationPipe) page: number,
    @Query('perPage', perPageValidationPipe) perPage: number,
    @Query('order', orderValidationPipe) order: z.infer<typeof orderSchema>,
    @Query('nome') nome?: string,
    @Query('cpfCnpj') cpfCnpj?: string,
    @Query('orderBy') orderBy?: string,
  ) {
    const pagination: PaginationParams = {
      page: page ?? 1,
      perPage: perPage ?? 10,
    };

    const orderParams: OrderColumnParams = {
      orderBy: orderBy ?? 'nome',
      order: order ?? 'asc',
    };

    const filtro = {
      nome,
      cpfCnpj,
    };

    const result = await this.getPessoa.execute({
      filtro,
      order: orderParams,
      pagination,
    });
    if (result.isRight()) {
      return {
        pessoas: result.value.pessoas.map(PessoaPresenter.toHTTP),
        pagination: {
          page: result.value.pagination.page,
          perPage: result.value.pagination.perPage,
          total: result.value.pagination.total,
        },
      };
    }
    return result.value;
  }
}
