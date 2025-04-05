import { Either, left, right } from '@/core/either';
import { DadoNaoEncontradoErro } from '@/core/errors/errors/dado-nao-encontrado-erro';
import { Endereco } from '@/domain/enterprise/entities/endereco-entity';
import { EnderecoRepository } from '@/domain/enterprise/repositories/endereco-repository';
import { Injectable } from '@nestjs/common';

interface DeleteEnderecoUseCaseRequest {
  idEndereco: string;
}

type DeleteEnderecoUseCaseResponse = Either<
  DadoNaoEncontradoErro,
  {
    endereco: Endereco;
  }
>;

@Injectable()
export class DeleteEnderecoUseCase {
  constructor(private readonly enderecoRepository: EnderecoRepository) {}
  async execute({
    idEndereco,
  }: DeleteEnderecoUseCaseRequest): Promise<DeleteEnderecoUseCaseResponse> {
    const endereco = await this.enderecoRepository.findById(idEndereco);
    if (!endereco) {
      return left(
        new DadoNaoEncontradoErro({
          dado: 'idEndereco',
          valor: idEndereco,
        }),
      );
    }

    await this.enderecoRepository.delete(idEndereco);
    return right({
      endereco,
    });
  }
}
