import { ApiProperty } from '@nestjs/swagger';

export class CreateBankAccountDto {
  @ApiProperty({ example: 'ASSAS' })
  bank: 'ASSAS';

  @ApiProperty({ example: 2500.75 })
  incomeValue: number;

  @ApiProperty({
    example: 'a8f5f167-f44f-4c95-9c45-3a9f51cce0ed',
    description: 'UUID da pessoa',
  })
  fkPessoa: string;

  @ApiProperty({
    example: '5f50c31f-2a99-4bb6-bf4c-555a9eccc58c',
    description: 'UUID do usuário que criou',
  })
  fkUserCreate: string;
}
