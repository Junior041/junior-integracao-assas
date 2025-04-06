import { UpdateEnderecoUseCase } from '@/domain/application/cases/endereco/update-endereco-use-case';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipes';
import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { z } from 'zod';
import { ExceptionsHandle } from '../../pipes/exceptions-handle';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateEnderecoDto } from '../dto/update-endereco-dto';

const updateEnderecoSchema = z.object({
  idEndereco: z.string().uuid(),
  cep: z.string(),
  rua: z.string(),
  numero: z.string(),
  complemento: z.string().optional(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  pais: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(updateEnderecoSchema);

type UpdateEnderecoSchema = z.infer<typeof updateEnderecoSchema>;

@Controller()
@ApiTags('Endereço')
export class UpdateEnderecoController {
  constructor(private updateEndereco: UpdateEnderecoUseCase) {}

  @Put()
  @ApiBody({
    type: UpdateEnderecoDto,
  })
  @ApiOkResponse({ description: 'Endereço atualizado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Erro de validação.' })
  @ApiNotFoundResponse({ description: 'Endereço não encontrado.' })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  async handle(
    @Body(bodyValidationPipe)
    body: UpdateEnderecoSchema,
  ) {
    const result = await this.updateEndereco.execute(body);

    if (result.isLeft()) {
      ExceptionsHandle.handle(result.value);
    }
  }
}
