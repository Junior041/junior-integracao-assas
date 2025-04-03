import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID da Pessoa.',
  })
  fkPessoa: string;

  @ApiProperty({
    example: 'usuario@email.com',
    description: 'E-mail do usuário.',
  })
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha do usuário.' })
  senha: string;

  @ApiProperty({
    example: true,
    description: 'Indica se o usuário está ativo.',
  })
  ativo: boolean;
}
