import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Endereco as EnderecoDomain } from '@/domain/enterprise/entities/endereco-entity';
import { Prisma } from '@prisma/client';

export class PrismaEnderecoMapper {
  static toDomain(raw: Prisma.EnderecoUncheckedCreateInput): EnderecoDomain {
    return EnderecoDomain.create(
      {
        bairro: raw.bairro,
        cep: raw.cep,
        cidade: raw.cidade,
        estado: raw.estado,
        fkPessoa: raw.fkPessoa,
        pais: raw.pais,
        rua: raw.rua,
        complemento: raw.complemento,
        createdAt: raw.createdAt ? new Date(raw.createdAt) : undefined,
        numero: raw.numero,
      },
      new UniqueEntityID(raw.idEndereco),
    );
  }

  static toPersistence(
    endereco: EnderecoDomain,
  ): Prisma.EnderecoUncheckedCreateInput {
    return {
      bairro: endereco.bairro,
      cep: endereco.cep,
      cidade: endereco.cidade,
      estado: endereco.estado,
      fkPessoa: endereco.fkPessoa,
      pais: endereco.pais,
      rua: endereco.rua,
      complemento: endereco.complemento,
      createdAt: endereco.createdAt,
      numero: endereco.numero,
    };
  }
}
