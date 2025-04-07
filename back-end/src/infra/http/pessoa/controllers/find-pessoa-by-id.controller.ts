import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResponsePessoaDto } from '../dto/response-pessoa-dto';
import { FindPessoaByIdUseCase } from '@/domain/application/cases/pessoa/find-pessoa-by-id-use-case';
import { PessoaPresenter } from '../presenters/pessoa-presenter';

@ApiTags('Pessoa')
@Controller()
export class FindPessoaByIdController {
  constructor(private readonly findPessoaByIdUseCase: FindPessoaByIdUseCase) {}

  @Get(':idPessoa')
  @ApiOperation({ summary: 'Buscar pessoa por ID' })
  @ApiParam({ name: 'idPessoa', description: 'ID da pessoa', type: String })
  @ApiResponse({
    status: 200,
    description: 'Pessoa encontrada com sucesso',
    type: ResponsePessoaDto,
  })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada' })
  @ApiBearerAuth()
  async findById(@Param('idPessoa') idPessoa: string) {
    const result = await this.findPessoaByIdUseCase.execute({ idPessoa });

    if (result.isLeft()) {
      throw new HttpException('Pessoa não encontrada', HttpStatus.NOT_FOUND);
    } else {
      return {
        pessoa: PessoaPresenter.toHTTP(result.value.pessoa),
      };
    }
  }
}
