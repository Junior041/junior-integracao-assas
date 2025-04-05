import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'imobia',
  })
  senha: string;
}
