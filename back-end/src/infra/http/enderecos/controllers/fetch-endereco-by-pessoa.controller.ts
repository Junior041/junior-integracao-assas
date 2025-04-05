import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipes';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FetchEnderecoByPessoaUseCase } from '@/domain/application/cases/endereco/fetch-endereco-by-pessoa-use-case';
import { EnderecoPresenter } from '../presenter/endereco-presenter';
import { ResponseEnderecoDto } from '../dto/response-endereco-dto';

const fetchEnderecoSchema = z.object({
  fkPessoa: z.string().uuid(),
});

const queryValidationPipe = new ZodValidationPipe(fetchEnderecoSchema);

type FetchEnderecoQuery = z.infer<typeof fetchEnderecoSchema>;

@Controller()
@ApiTags('Endereço')
export class FetchEnderecoByPessoaController {
  constructor(
    private readonly fetchEnderecoByPessoa: FetchEnderecoByPessoaUseCase,
  ) {}

  @Get()
  @ApiQuery({ name: 'fkPessoa', type: String, description: 'UUID da pessoa' })
  @ApiOkResponse({
    type: ResponseEnderecoDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Erro de validação.' })
  @HttpCode(HttpStatus.OK)
  async handle(
    @Query(queryValidationPipe)
    query: FetchEnderecoQuery,
  ) {
    const result = await this.fetchEnderecoByPessoa.execute(query);

    return result.value?.enderecos.map(EnderecoPresenter.toHTTP);
  }
}
