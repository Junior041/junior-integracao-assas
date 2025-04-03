import { Pessoa } from '@/domain/enterprise/entities/pessoa-entity';

export class PessoaPresenter {
  static toHTTP(pessoa: Pessoa) {
    return {
      idPessoa: pessoa.id.toString(),
      nome: pessoa.nome,
      cpfCnpj: pessoa.cpfCnpj,
      fkUserCreate: pessoa.fkUserCreate,
      createdAt: pessoa.createdAt,
    };
  }
}
