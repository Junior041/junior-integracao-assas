import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipes';
import { CreateBankAccountUseCase } from '@/domain/application/cases/bank-account/create-bank-account-use-case';
import { ExceptionsHandle } from '../../pipes/exceptions-handle';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateBankAccountDto } from '../dto/create-bank-account-dto';
import { UserPayload } from '../../auth/jwt.strategy';
import { CurrentUser } from '../../auth/current-user-decorator';

const createBankAccountSchema = z.object({
  bank: z.enum(['ASSAS']),
  incomeValue: z.number(),
  fkPessoa: z.string().uuid(),
});

const bodyValidationPipe = new ZodValidationPipe(createBankAccountSchema);
type CreateBankAccountSchema = z.infer<typeof createBankAccountSchema>;

@Controller()
@ApiTags('Bank Account')
export class CreateBankAccountController {
  constructor(private createBankAccount: CreateBankAccountUseCase) {}

  @Post()
  @ApiBody({ type: CreateBankAccountDto })
  @ApiCreatedResponse({ description: 'Conta bancária criada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Erro de validação ou integração.' })
  @ApiNotFoundResponse({ description: 'Pessoa não encontrada.' })
  @ApiConflictResponse({ description: 'Conta bancária já cadastrada.' })
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async handle(
    @Body(bodyValidationPipe) body: CreateBankAccountSchema,
    @CurrentUser() { sub }: UserPayload,
  ) {
    const result = await this.createBankAccount.execute({
      ...body,
      fkUserCreate: sub,
    });

    if (result.isLeft()) {
      ExceptionsHandle.handle(result.value);
    }
  }
}
