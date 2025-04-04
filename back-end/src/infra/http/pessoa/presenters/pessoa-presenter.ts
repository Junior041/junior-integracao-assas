import { Pessoa } from '@/domain/enterprise/entities/pessoa-entity';
import { Formatar } from '@/domain/utils/formatar';

export class PessoaPresenter {
  static toHTTP(pessoa: Pessoa) {
    return {
      idPessoa: pessoa.id.toString(),
      nome: pessoa.nome,
      cpfCnpj: Formatar.cpfOuCnpj(pessoa.cpfCnpj),
      fkUserCreate: pessoa.fkUserCreate,
      telefone: Formatar.telefone(pessoa.telefone),
      email: pessoa.email,
      dataNascimento: pessoa.dataNascimento,
      createdAt: pessoa.createdAt,
    };
  }
}
