import { CreatePessoaUseCase } from '@/domain/application/cases/pessoa/create-pessoa-use-case';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipes';
import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { ExceptionsHandle } from '../../pipes/exceptions-handle';

const createPessoaSchema = z.object({
  nome: z.string(),
  cpfCnpj: z.string(),
  fkUserCreate: z.string().uuid(),
});

const bodyValidationPipe = new ZodValidationPipe(createPessoaSchema);

type CreatePessoaSchema = z.infer<typeof createPessoaSchema>;

@Controller('/')
export class CreatePessoaController {
  constructor(private createPessoa: CreatePessoaUseCase) {}

  @Post()
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
