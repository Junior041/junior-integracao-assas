import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { CreateUsuarioUseCase } from '@/domain/application/cases/usuario/create-usuario-use-case';
import { CreateUsuarioDto } from '../dto/create-usuario-dto';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipes';
import { ExceptionsHandle } from '../../pipes/exceptions-handle';
import { z } from 'zod';

const createUsuarioSchema = z.object({
  fkPessoa: z.string().uuid(),
  email: z.string().email(),
  senha: z.string().min(6),
  ativo: z.boolean(),
});

const bodyValidationPipe = new ZodValidationPipe(createUsuarioSchema);

type CreateUsuarioSchema = z.infer<typeof createUsuarioSchema>;

@Controller()
@ApiTags('Usuario')
export class CreateUsuarioController {
  constructor(private createUsuario: CreateUsuarioUseCase) {}

  @Post()
  @ApiBody({ type: CreateUsuarioDto })
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Erro de validação.' })
  @ApiConflictResponse({ description: 'Usuário já cadastrado.' })
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body(bodyValidationPipe) body: CreateUsuarioSchema) {
    const result = await this.createUsuario.create(body);

    if (result.isLeft()) {
      ExceptionsHandle.handle(result.value);
    }
  }
}
