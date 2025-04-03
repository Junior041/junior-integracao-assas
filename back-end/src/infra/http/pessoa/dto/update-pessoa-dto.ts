import { ApiProperty } from '@nestjs/swagger';

export class UpdatePessoaDto {
  @ApiProperty({
    description: 'Nome atualizado da pessoa',
    example: 'João Silva',
  })
  nome: string;
}
