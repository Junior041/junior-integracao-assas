import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../_global/pagination-dto';

export class ResponsePessoaDto {
  @ApiProperty({
    description: 'ID do usuário que criou a pessoa',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  idPessoa: string;

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
    type: PaginationDto,
  })
  pagination: PaginationDto;

  @ApiProperty({
    description: 'Telefone da pessoa',
    example: '(47) 99999-8888',
  })
  telefone: string;

  @ApiProperty({
    description: 'Email da pessoa',
    example: 'joao.silva@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Data de nascimento da pessoa',
    example: '1990-01-01',
    type: String,
    format: 'date',
  })
  dataNascimento: string;
}
