import { Either, left, right } from "@/core/either";
import { JaCadastradroErro } from "@/core/errors/errors/ja-registrado-erro";
import { Pessoa } from "@/domain/enterprise/entities/pessoa-entity";
import { PessoaRepository } from "@/domain/enterprise/repositories/pessoa-repository";
import { Formatar } from "@/domain/utils/formatar";

interface CreatePessoaUseCaseRequest {
  nome: string;
  cpfCnpj: string;
  fkUserCreate: string;
}

type CreatePessoaUseCaseResponse = Either<
  JaCadastradroErro,
  {
    pessoa: Pessoa;
  }
>;

export class CreatePessoaUseCase {
  constructor(private pessoaRepository: PessoaRepository) {}

  async create(data: CreatePessoaUseCaseRequest): Promise<CreatePessoaUseCaseResponse> {
    const cpfJaCadastrado = await this.pessoaRepository.findByCpfCnpj(Formatar.limparString(data.cpfCnpj));
    if (cpfJaCadastrado) {
      return left(new JaCadastradroErro("Pessoa já cadastrada."));
    }
    const pessoaSalvaNoBanco = await this.pessoaRepository.create(Pessoa.create(data));
    return right({
      pessoa: pessoaSalvaNoBanco,
    });
  }
}
