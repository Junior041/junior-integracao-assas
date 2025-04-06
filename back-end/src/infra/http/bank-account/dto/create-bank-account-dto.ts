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
}
