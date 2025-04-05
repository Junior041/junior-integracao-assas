import { UpdatePessoaUseCase } from '@/domain/application/cases/pessoa/update-pessoa-use-case';
import {
  Controller,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionsHandle } from '../../pipes/exceptions-handle';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipes';
import { z } from 'zod';
import { UpdatePessoaDto } from '../dto/update-pessoa-dto';

const updatePessoaSchema = z.object({
  nome: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(updatePessoaSchema);
type UpdatePessoaSchema = z.infer<typeof updatePessoaSchema>;

@Controller()
@ApiTags('Pessoa')
export class UpdatePessoaController {
  constructor(private updatePessoaUseCase: UpdatePessoaUseCase) {}

  @Put(':idPessoa')
  @ApiBody({ type: UpdatePessoaDto })
  @ApiOkResponse({ description: 'Pessoa atualizada com sucesso.' })
  @ApiNotFoundResponse({ description: 'Pessoa não encontrada.' })
  @ApiBadRequestResponse({ description: 'Erro de validação.' })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  async handle(
    @Param('idPessoa') idPessoa: string,
    @Body(bodyValidationPipe)
    body: UpdatePessoaSchema,
  ) {
    const result = await this.updatePessoaUseCase.execute({
      idPessoa,
      ...body,
    });

    if (result.isLeft()) {
      ExceptionsHandle.handle(result.value);
    }

    return;
  }
}
