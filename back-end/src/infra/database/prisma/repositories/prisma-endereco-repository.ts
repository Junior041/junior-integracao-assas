import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { EnderecoRepository } from '@/domain/enterprise/repositories/endereco-repository';
import { Endereco } from '@/domain/enterprise/entities/endereco-entity';
import { PrismaEnderecoMapper } from '../mappers/primsa-endereco-mapper';

@Injectable()
export class PrismaEnderecoRepository implements EnderecoRepository {
  constructor(private prisma: PrismaService) {}
  async save(idEndereco: string, data: Endereco): Promise<Endereco> {
    const result = await this.prisma.endereco.update({
      data: PrismaEnderecoMapper.toPersistence(data),
      where: {
        idEndereco,
      },
    });
    return PrismaEnderecoMapper.toDomain(result);
  }
  async create(data: Endereco): Promise<Endereco> {
    const result = await this.prisma.endereco.create({
      data: PrismaEnderecoMapper.toPersistence(data),
    });
    return PrismaEnderecoMapper.toDomain(result);
  }
  async findById(idEndereco: string): Promise<Endereco | null> {
    const result = await this.prisma.endereco.findUnique({
      where: {
        idEndereco,
      },
    });
    if (!result) {
      return null;
    }
    return PrismaEnderecoMapper.toDomain(result);
  }
  async fetchByFkPessoa(fkPessoa: string): Promise<Endereco[]> {
    const result = await this.prisma.endereco.findMany({
      where: {
        fkPessoa,
      },
    });
    return result.map(PrismaEnderecoMapper.toDomain);
  }
  async delete(idEndereco: string): Promise<void> {
    await this.prisma.endereco.delete({
      where: {
        idEndereco,
      },
    });
  }
}
