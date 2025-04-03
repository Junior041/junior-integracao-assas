import { Pessoa } from '@/domain/enterprise/entities/pessoa-entity';

export class PessoaPResenter {
  static toHTTP(pessoa: Pessoa) {
    return {
      nome: pessoa.nome,
      cpfCnpj: pessoa.cpfCnpj,
      fkUserCreate: pessoa.fkUserCreate,
      createdAt: pessoa.createdAt,
    };
  }
}
