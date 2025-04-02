import { Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DadoNaoEncontradoErro } from '@/core/errors/errors/dado-nao-encontrado-erro';
import { Pessoa } from '@/domain/enterprise/entities/pessoa-entity';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';

interface UpdatePessoaUseCaseRequest {
  idPessoa: string;
  nome: string;
}

type UpdatePessoaUseCaseResponse = Either<Error, { pessoa: Pessoa }>;

export class UpdatePessoaUseCase {
  constructor(private pessoaRepository: PessoaRepository) {}

  async execute({
    idPessoa,
    nome,
  }: UpdatePessoaUseCaseRequest): Promise<UpdatePessoaUseCaseResponse> {
    const pessoa = await this.pessoaRepository.findById(idPessoa);
    if (!pessoa) {
      return left(
        new DadoNaoEncontradoErro({
          dado: 'idPessoa',
          valor: idPessoa,
        }),
      );
    }
    pessoa.nome = nome;

    const pessoaAtualizada = await this.pessoaRepository.save(
      new UniqueEntityID(idPessoa),
      pessoa,
    );

    return right({ pessoa: pessoaAtualizada });
  }
}
