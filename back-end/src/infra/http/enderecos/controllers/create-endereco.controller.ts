import { CreateEnderecoUseCase } from '@/domain/application/cases/endereco/create-endereco-use-case';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipes';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { z } from 'zod';
import { ExceptionsHandle } from '../../pipes/exceptions-handle';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEnderecoDto } from '../dto/create-endereco-dto';

const createEnderecoSchema = z.object({
  fkPessoa: z.string().uuid(),
  cep: z.string(),
  rua: z.string(),
  numero: z.string(),
  complemento: z.string().optional(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  pais: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createEnderecoSchema);

type CreateEnderecoSchema = z.infer<typeof createEnderecoSchema>;

@Controller()
@ApiTags('Endereço')
export class CreateEnderecoController {
  constructor(private createEndereco: CreateEnderecoUseCase) {}

  @Post()
  @ApiBody({
    type: CreateEnderecoDto,
  })
  @ApiCreatedResponse({ description: 'Endereço criado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Erro de validação.' })
  @ApiNotFoundResponse({ description: 'Pessoa não encontrada.' })
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(bodyValidationPipe)
    body: CreateEnderecoSchema,
  ) {
    const result = await this.createEndereco.execute(body);

    if (result.isLeft()) {
      ExceptionsHandle.handle(result.value);
    }
  }
}
