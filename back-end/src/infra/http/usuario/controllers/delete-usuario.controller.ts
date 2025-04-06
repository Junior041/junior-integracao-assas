import { DeleteUsuarioUseCase } from '@/domain/application/cases/usuario/delete-usuario-use-case';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipes';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { z } from 'zod';
import { ExceptionsHandle } from '../../pipes/exceptions-handle';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

const deleteUsuarioSchema = z.object({
  idUsuario: z.string().uuid(),
});

const paramValidationPipe = new ZodValidationPipe(deleteUsuarioSchema);

type DeleteUsuarioSchema = z.infer<typeof deleteUsuarioSchema>;

@Controller()
@ApiTags('Usuário')
export class DeleteUsuarioController {
  constructor(private deleteUsuario: DeleteUsuarioUseCase) {}

  @Delete(':idUsuario')
  @ApiParam({
    name: 'idUsuario',
    description: 'UUID do endereço a ser deletado',
    example: 'f0123456-789a-4bcd-1234-abcdefabcdef',
  })
  @ApiNoContentResponse({ description: 'Usuário deletado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Erro de validação.' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  async handle(
    @Param(paramValidationPipe)
    { idUsuario }: DeleteUsuarioSchema,
  ) {
    const result = await this.deleteUsuario.execute({ idUsuario });

    if (result.isLeft()) {
      ExceptionsHandle.handle(result.value);
    }
  }
}
