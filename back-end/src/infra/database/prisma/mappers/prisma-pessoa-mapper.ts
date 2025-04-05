import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Pessoa as PessoaDomain } from '@/domain/enterprise/entities/pessoa-entity';
import { Prisma } from '@prisma/client';
import { PrismaEnderecoMapper } from './primsa-endereco-mapper';

type PessoaUncheckedCreateInputWithRelations =
  Prisma.PessoaUncheckedCreateInput & {
    Endereco?: Prisma.EnderecoUncheckedCreateInput[] | null;
  };

export class PrismaPessoaMapper {
  static toDomain(raw: PessoaUncheckedCreateInputWithRelations): PessoaDomain {
    return PessoaDomain.create(
      {
        cpfCnpj: raw.cpfCnpj,
        nome: raw.nome,
        createdAt: raw.createdAt ? new Date(raw.createdAt) : undefined,
        dataNascimento: new Date(raw.dataNascimento),
        email: raw.email,
        telefone: raw.telefone,
        enderecos: raw.Endereco
          ? raw.Endereco.map(PrismaEnderecoMapper.toDomain)
          : undefined,
      },
      new UniqueEntityID(raw.idPessoa),
    );
  }

  static toPersistence(
    pessoa: PessoaDomain,
  ): Prisma.PessoaUncheckedCreateInput {
    return {
      cpfCnpj: pessoa.cpfCnpj,
      nome: pessoa.nome,
      createdAt: pessoa.createdAt,
      dataNascimento: pessoa.dataNascimento,
      email: pessoa.email,
      telefone: pessoa.telefone,
    };
  }
}
