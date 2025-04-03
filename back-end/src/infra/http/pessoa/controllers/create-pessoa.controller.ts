import { CreatePessoaUseCase } from '@/domain/application/cases/pessoa/create-pessoa-use-case';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipes';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { z } from 'zod';
import { ExceptionsHandle } from '../../pipes/exceptions-handle';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePessoaDto } from '../dto/create-pessoa-dto';

const createPessoaSchema = z.object({
  nome: z.string(),
  cpfCnpj: z.string(),
  fkUserCreate: z.string().uuid(),
});

const bodyValidationPipe = new ZodValidationPipe(createPessoaSchema);

type CreatePessoaSchema = z.infer<typeof createPessoaSchema>;

@Controller('/')
@ApiTags('Pessoa')
export class CreatePessoaController {
  constructor(private createPessoa: CreatePessoaUseCase) {}

  @Post()
  @ApiBody({
    type: CreatePessoaDto,
  })
  @ApiCreatedResponse({ description: 'Pessoa criada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Erro de validação.' })
  @ApiConflictResponse({ description: 'Pessoa já cadastrada.' })
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(bodyValidationPipe)
    body: CreatePessoaSchema,
  ) {
    const result = await this.createPessoa.execute(body);

    if (result.isLeft()) {
      ExceptionsHandle.handle(result.value);
    }
  }
}
