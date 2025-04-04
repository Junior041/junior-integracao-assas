import { Either, left, right } from '@/core/either';
import { DadoNaoEncontradoErro } from '@/core/errors/errors/dado-nao-encontrado-erro';
import { Endereco } from '@/domain/enterprise/entities/endereco-entity';
import { EnderecoRepository } from '@/domain/enterprise/repositories/endereco-repository';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { Formatar } from '@/domain/utils/formatar';

interface CreateEnderecoUseCaseRequest {
  fkPessoa: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
}

type CreateEnderecoUseCaseResponse = Either<
  DadoNaoEncontradoErro,
  {
    endereco: Endereco;
  }
>;

export class CreateEnderecoUseCase {
  constructor(
    private readonly enderecoRepository: EnderecoRepository,
    private readonly pessoaRepository: PessoaRepository,
  ) {}
  async execute(
    data: CreateEnderecoUseCaseRequest,
  ): Promise<CreateEnderecoUseCaseResponse> {
    const pessoa = await this.pessoaRepository.findById(data.fkPessoa);
    if (!pessoa) {
      return left(
        new DadoNaoEncontradoErro({
          dado: 'fkPessoa',
          valor: data.fkPessoa,
        }),
      );
    }

    const cep = Formatar.limparString(data.cep);

    const endereco = Endereco.create({
      ...data,
      cep,
    });

    await this.enderecoRepository.create(endereco);
    return right({
      endereco,
    });
  }
}
