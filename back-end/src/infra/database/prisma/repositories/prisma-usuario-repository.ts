import { UsuarioRepository } from '@/domain/enterprise/repositories/usuario-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Usuario } from '@/domain/enterprise/entities/usuario-entity';
import { EnvService } from '@/infra/env/env.service';
import { PrismaUsuarioMapper } from '../mappers/prisma-usuario-mapper';

@Injectable()
export class PrismaUsuarioRepository implements UsuarioRepository {
  constructor(
    private prisma: PrismaService,
    private envService: EnvService,
  ) {}
  async findById(idUsuario: string): Promise<Usuario | null> {
    const result = await this.prisma.usuario.findUnique({
      where: {
        idUsuario,
      },
    });
    if (!result) {
      return null;
    }
    return PrismaUsuarioMapper.toDomain(result);
  }
  async findByFkPessoa(fkPessoa: string): Promise<Usuario | null> {
    const result = await this.prisma.usuario.findUnique({
      where: {
        fkPessoa,
      },
    });
    if (!result) {
      return null;
    }
    return PrismaUsuarioMapper.toDomain(result);
  }
  async findByEmail(email: string): Promise<Usuario | null> {
    const result = await this.prisma.usuario.findUnique({
      where: {
        email,
      },
    });
    if (!result) {
      return null;
    }
    return PrismaUsuarioMapper.toDomain(result);
  }
  async delete(idUsuario: string): Promise<void> {
    await this.prisma.usuario.delete({
      where: {
        idUsuario,
      },
    });
  }
  async create(data: Usuario): Promise<Usuario> {
    const result = await this.prisma.usuario.create({
      data: PrismaUsuarioMapper.toPersistence(data),
    });
    return PrismaUsuarioMapper.toDomain(result);
  }
}
