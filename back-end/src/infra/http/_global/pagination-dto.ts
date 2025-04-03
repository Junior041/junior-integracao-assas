import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ example: 1, description: 'Número da página atual.' })
  page: number;

  @ApiProperty({ example: 10, description: 'Quantidade de itens por página.' })
  perPage: number;

  @ApiProperty({ example: 1, description: 'Total de itens disponíveis.' })
  total: number;
}
