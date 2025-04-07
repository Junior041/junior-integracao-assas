import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { z } from 'zod';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUseCase } from '@/domain/application/cases/usuario/login-use-case';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes';
import { ExceptionsHandle } from '@/infra/http/pipes/exceptions-handle';
import { LoginDto } from '../dto/login-dto';
import { Public } from '../../auth/public';

const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
});

const bodyValidationPipe = new ZodValidationPipe(loginSchema);

type LoginSchema = z.infer<typeof loginSchema>;

@Controller('auth')
@ApiTags('Usuário')
export class LoginController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Public()
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Login realizado com sucesso.',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', example: 'jwt.token.aqui' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Erro de validação.' })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas.' })
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body(bodyValidationPipe)
    body: LoginSchema,
  ) {
    const result = await this.loginUseCase.execute(body);

    if (result.isLeft()) {
      ExceptionsHandle.handle(result.value);
    }
    return result.value;
  }
}
