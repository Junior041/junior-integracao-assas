import { ApiProperty } from '@nestjs/swagger';

export class CreatePessoaDto {
  @ApiProperty({
    description: 'Nome da pessoa',
    example: 'João Silva',
  })
  nome: string;

  @ApiProperty({
    description: 'CPF ou CNPJ da pessoa',
    example: '123.456.789-00',
  })
  cpfCnpj: string;

  @ApiProperty({
    description: 'ID do usuário que criou a pessoa',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  fkUserCreate: string;
}
