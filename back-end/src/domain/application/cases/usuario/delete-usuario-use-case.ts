import { Either, left, right } from "@/core/either";
import { JaCadastradroErro } from "@/core/errors/errors/ja-registrado-erro";
import { UsuarioRepository } from "@/domain/enterprise/repositories/usuario-repository";
import { DadoNaoEncontradoErro } from "@/core/errors/errors/dado-nao-encontrado-erro";

interface DeleteUsuarioUseCaseRequest {
  idUsuario: string;
}

type DeleteUsuarioUseCaseResponse = Either<JaCadastradroErro, null>;

export class DeleteUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({ idUsuario }: DeleteUsuarioUseCaseRequest): Promise<DeleteUsuarioUseCaseResponse> {
    const usuario = await this.usuarioRepository.findById(idUsuario);
    if (!usuario) {
      return left(
        new DadoNaoEncontradoErro({
          dado: "idUsuario",
          valor: idUsuario,
        })
      );
    }

    await this.usuarioRepository.delete(idUsuario);
    return right(null);
  }
}
