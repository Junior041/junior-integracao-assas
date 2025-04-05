import { Endereco } from '@/domain/enterprise/entities/endereco-entity';

export class EnderecoPresenter {
  static toHTTP(endereco: Endereco) {
    return {
      idEndereco: endereco.id.toString(),
      fkPessoa: endereco.fkPessoa,
      cep: endereco.cep,
      rua: endereco.rua,
      numero: endereco.numero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
      pais: endereco.pais,
      createdAt: endereco.createdAt,
    };
  }
}
