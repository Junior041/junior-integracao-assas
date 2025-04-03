import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { OrderColumnParams } from '@/core/repositories/order-column-params';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { Pessoa } from '@/domain/enterprise/entities/pessoa-entity';
import { PrismaPessoaMapper } from '../mappers/prisma-pessoa-mapper';
import { EnvService } from '@/infra/env/env.service';

@Injectable()
export class PrismaPessoaRepository implements PessoaRepository {
  constructor(
    private prisma: PrismaService,
    private envService: EnvService,
  ) {}
  async create(data: Pessoa): Promise<Pessoa> {
    const result = await this.prisma.pessoa.create({
      data: PrismaPessoaMapper.toPersistence(data),
    });
    return PrismaPessoaMapper.toDomain(result);
  }
  async save(idPessoa: string, data: Pessoa): Promise<Pessoa> {
    const result = await this.prisma.pessoa.update({
      data: PrismaPessoaMapper.toPersistence(data),
      where: {
        idPessoa: idPessoa,
      },
    });
    return PrismaPessoaMapper.toDomain(result);
  }
  async findByCpfCnpj(cpfCnpj: string): Promise<Pessoa | null> {
    const result = await this.prisma.pessoa.findUnique({
      where: {
        cpfCnpj,
      },
    });
    if (!result) {
      return null;
    }
    return PrismaPessoaMapper.toDomain(result);
  }
  async findById(idPessoa: string): Promise<Pessoa | null> {
    const result = await this.prisma.pessoa.findUnique({
      where: {
        idPessoa,
      },
    });
    if (!result) {
      return null;
    }
    return PrismaPessoaMapper.toDomain(result);
  }
  async getAllPessoas({
    pagination,
    order,
    filtro,
  }: {
    pagination: PaginationParams;
    order: OrderColumnParams;
    filtro?: { nome?: string; cpfCnpj?: string };
  }): Promise<{ pessoas: Pessoa[]; pagination: PaginationParams }> {
    const { page } = pagination;
    const { orderBy, order: orderDirection } = order;
    const perPage =
      pagination.perPage || this.envService.get('DEFAULT_PER_PAGE');
    const where = {
      nome: filtro?.nome
        ? { contains: filtro.nome, mode: 'insensitive' }
        : undefined,
      cpfCnpj: filtro?.cpfCnpj ? { equals: filtro.cpfCnpj } : undefined,
    };

    const pessoas = await this.prisma.pessoa.findMany({
      where,
      orderBy: { [orderBy]: orderDirection },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const totalRegistros = await this.prisma.pessoa.count({ where });

    return {
      pessoas: pessoas.map(PrismaPessoaMapper.toDomain),
      pagination: { page, perPage, total: totalRegistros },
    };
  }
  async delete(idPessoa: string): Promise<void> {
    await this.prisma.pessoa.delete({
      where: {
        idPessoa,
      },
    });
  }
}
