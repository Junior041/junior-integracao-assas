import { Either, left, right } from '@/core/either';
import { DadoNaoEncontradoErro } from '@/core/errors/errors/dado-nao-encontrado-erro';
import { Endereco } from '@/domain/enterprise/entities/endereco-entity';
import { EnderecoRepository } from '@/domain/enterprise/repositories/endereco-repository';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { Formatar } from '@/domain/utils/formatar';
import { Injectable } from '@nestjs/common';

interface UpdateEnderecoUseCaseRequest {
  idEndereco: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
}

type UpdateEnderecoUseCaseResponse = Either<
  DadoNaoEncontradoErro,
  {
    endereco: Endereco;
  }
>;

@Injectable()
export class UpdateEnderecoUseCase {
  constructor(
    private readonly enderecoRepository: EnderecoRepository,
    private readonly pessoaRepository: PessoaRepository,
  ) {}
  async execute(
    data: UpdateEnderecoUseCaseRequest,
  ): Promise<UpdateEnderecoUseCaseResponse> {
    const endereco = await this.enderecoRepository.findById(data.idEndereco);
    if (!endereco) {
      return left(
        new DadoNaoEncontradoErro({
          dado: 'idEndereco',
          valor: data.idEndereco,
        }),
      );
    }
    endereco.cep = Formatar.apenasNumeros(data.cep);
    endereco.rua = data.rua;
    endereco.numero = data.numero;
    endereco.complemento = data.complemento;
    endereco.bairro = data.bairro;
    endereco.cidade = data.cidade;
    endereco.estado = data.estado;
    endereco.pais = data.pais;

    return right({
      endereco,
    });
  }
}
