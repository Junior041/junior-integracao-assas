import { DeletePessoaUseCase } from '@/domain/application/cases/pessoa/delete-pessoa-use-case';
import {
  Controller,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionsHandle } from '../../pipes/exceptions-handle';

@Controller('/pessoa')
@ApiTags('Pessoa')
export class DeletePessoaController {
  constructor(private deletePessoaUseCase: DeletePessoaUseCase) {}

  @Delete(':idPessoa')
  @ApiNoContentResponse({ description: 'Pessoa deletada com sucesso.' })
  @ApiNotFoundResponse({ description: 'Pessoa não encontrada.' })
  @ApiBadRequestResponse({ description: 'Erro de validação ou exclusão.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('idPessoa') idPessoa: string) {
    const result = await this.deletePessoaUseCase.execute({ idPessoa });

    if (result.isLeft()) {
      ExceptionsHandle.handle(result.value);
    }
  }
}
