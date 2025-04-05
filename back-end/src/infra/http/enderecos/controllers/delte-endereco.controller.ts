import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipes';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteEnderecoUseCase } from '@/domain/application/cases/endereco/delete-endereco-use-case';
import { ExceptionsHandle } from '../../pipes/exceptions-handle';

const deleteEnderecoSchema = z.object({
  idEndereco: z.string().uuid(),
});

const paramValidationPipe = new ZodValidationPipe(deleteEnderecoSchema);

type DeleteEnderecoParams = z.infer<typeof deleteEnderecoSchema>;

@Controller('endereco')
@ApiTags('Endereço')
export class DeleteEnderecoController {
  constructor(private readonly deleteEndereco: DeleteEnderecoUseCase) {}

  @Delete(':idEndereco')
  @ApiParam({
    name: 'idEndereco',
    description: 'UUID do endereço a ser deletado',
    example: 'f0123456-789a-4bcd-1234-abcdefabcdef',
  })
  @ApiOkResponse({
    description: 'Endereço deletado com sucesso.',
  })
  @ApiBadRequestResponse({ description: 'Erro de validação nos parâmetros.' })
  @ApiNotFoundResponse({ description: 'Endereço não encontrado.' })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  async handle(
    @Param(paramValidationPipe)
    params: DeleteEnderecoParams,
  ) {
    const result = await this.deleteEndereco.execute(params);

    if (result.isLeft()) {
      ExceptionsHandle.handle(result.value);
    }
  }
}
