import { Either, left, right } from "@/core/either";
import { DadoNaoEncontradoErro } from "@/core/errors/errors/dado-nao-encontrado-erro";
import { GenericoErro } from "@/core/errors/errors/generico-erro";
import { PessoaRepository } from "@/domain/enterprise/repositories/pessoa-repository";
import { UsuarioRepository } from "@/domain/enterprise/repositories/usuario-repository";

interface DeletePessoaUseCaseRequest {
  idPessoa: string;
}

type DeletePessoaUseCaseResponse = Either<DadoNaoEncontradoErro | GenericoErro, null>;

export class DeletePessoaUseCase {
  constructor(
        private pessoaRepository: PessoaRepository,
        private usuarioRepository: UsuarioRepository,
    ) {}

  async execute({ idPessoa }: DeletePessoaUseCaseRequest): Promise<DeletePessoaUseCaseResponse> {
    const pessoa = await this.pessoaRepository.findById(idPessoa);
    if (!pessoa) {
      return left(
        new DadoNaoEncontradoErro({
          dado: "idPessoa",
          valor: idPessoa,
        })
      );
    }

    
    if (pessoa.enderecos && pessoa.enderecos.length > 0) {
        return left(new GenericoErro("Pessoa possuí endereços ativos. não é possível deletar."));
    }
    
    const usuario = await this.usuarioRepository.findByFkPessoa(idPessoa);
    if (usuario) {
        return left(new GenericoErro("Não é possível deletar, pois a pessoa é um USUARIO."));
    }

    await this.pessoaRepository.delete(idPessoa);
    return right(null);
  }
}
