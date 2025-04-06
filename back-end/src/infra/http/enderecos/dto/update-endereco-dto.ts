import { ApiProperty } from '@nestjs/swagger';

export class UpdateEnderecoDto {
  @ApiProperty({
    description: 'UUID do endereço',
    example: '1e14f3cb-bb40-4bb4-b4fc-fb3a2390cbf1',
  })
  idEndereco: string;

  @ApiProperty({
    description: 'CEP do endereço',
    example: '88330-000',
  })
  cep: string;

  @ApiProperty({
    description: 'Rua do endereço',
    example: 'Rua XV de Novembro',
  })
  rua: string;

  @ApiProperty({
    description: 'Número do endereço',
    example: '1234',
  })
  numero: string;

  @ApiProperty({
    description: 'Complemento (opcional)',
    example: 'Apartamento 202',
    required: false,
  })
  complemento?: string;

  @ApiProperty({
    description: 'Bairro',
    example: 'Centro',
  })
  bairro: string;

  @ApiProperty({
    description: 'Cidade',
    example: 'Itajaí',
  })
  cidade: string;

  @ApiProperty({
    description: 'Estado',
    example: 'SC',
  })
  estado: string;

  @ApiProperty({
    description: 'País',
    example: 'Brasil',
  })
  pais: string;
}
