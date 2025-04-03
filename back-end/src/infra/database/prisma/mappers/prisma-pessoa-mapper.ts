import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Pessoa as PessoaDomain } from '@/domain/enterprise/entities/pessoa-entity';
import { Prisma } from '@prisma/client';

export class PrismaPessoaMapper {
  static toDomain(raw: Prisma.PessoaUncheckedCreateInput): PessoaDomain {
    return PessoaDomain.create(
      {
        cpfCnpj: raw.cpfCnpj,
        fkUserCreate: raw.fkUserCreate,
        nome: raw.nome,
        createdAt: raw.createdAt ? new Date(raw.createdAt) : undefined,
      },
      new UniqueEntityID(raw.idPessoa),
    );
  }

  static toPersistence(
    pessoa: PessoaDomain,
  ): Prisma.PessoaUncheckedCreateInput {
    return {
      cpfCnpj: pessoa.cpfCnpj,
      fkUserCreate: pessoa.fkUserCreate,
      nome: pessoa.nome,
      createdAt: pessoa.createdAt,
    };
  }
}
