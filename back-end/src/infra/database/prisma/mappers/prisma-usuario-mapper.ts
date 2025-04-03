import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Usuario as UsuarioDomain } from '@/domain/enterprise/entities/usuario-entity';
import { Prisma } from '@prisma/client';

export class PrismaUsuarioMapper {
  static toDomain(raw: Prisma.UsuarioUncheckedCreateInput): UsuarioDomain {
    return UsuarioDomain.create(
      {
        ativo: Boolean(raw.ativo),
        email: raw.email,
        fkPessoa: raw.fkPessoa,
        senha: raw.senha,
        createdAt: raw.createdAt ? new Date(raw.createdAt) : undefined,
        updatedAt: raw.createdAt ? new Date(raw.createdAt) : undefined,
      },
      new UniqueEntityID(raw.fkPessoa),
    );
  }

  static toPersistence(
    usuario: UsuarioDomain,
  ): Prisma.UsuarioUncheckedCreateInput {
    return {
      fkPessoa: usuario.fkPessoa,
      email: usuario.email,
      senha: usuario.senha,
      ativo: usuario.ativo,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt ? new Date(usuario.updatedAt) : undefined,
    };
  }
}
