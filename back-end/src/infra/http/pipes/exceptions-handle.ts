import { CredenciaisInvalidasError } from '@/core/errors/errors/credenciais-invalidas-error';
import { DadoNaoEncontradoErro } from '@/core/errors/errors/dado-nao-encontrado-erro';
import { GenericoErro } from '@/core/errors/errors/generico-erro';
import { JaCadastradroErro } from '@/core/errors/errors/ja-registrado-erro';
import { UseCaseError } from '@/core/errors/use-case-error';
import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

export class ExceptionsHandle {
  public static handle(error: UseCaseError) {
    console.log(error);
    switch (error.constructor) {
      case JaCadastradroErro:
        throw new ConflictException(error.message);
      case DadoNaoEncontradoErro:
        throw new BadRequestException(error.message);
      case CredenciaisInvalidasError:
        throw new UnauthorizedException(error.message);
      case GenericoErro:
        throw new BadRequestException(error.message);
    }
  }
}
