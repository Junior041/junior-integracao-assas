import { UsuarioRepository } from "@/domain/enterprise/repositories/usuario-repository";
import { DadoNaoEncontradoErro } from "@/core/errors/errors/dado-nao-encontrado-erro";
import { DeleteUsuarioUseCase } from "@/domain/application/cases/usuario/delete-usuario-use-case";
import { makeUsuario } from "tests/factories/make-usuario";
import { vi } from "vitest";

describe("DeleteUsuarioUseCase", () => {
  let usuarioRepository: UsuarioRepository;
  let sut: DeleteUsuarioUseCase;

  beforeEach(() => {
    usuarioRepository = {
      findById: vi.fn(),
      delete: vi.fn(),
    } as unknown as UsuarioRepository;

    sut = new DeleteUsuarioUseCase(usuarioRepository);
  });

  it("deve deletar um usuário se ele existir", async () => {
    const usuarioMock = makeUsuario();
    vi.spyOn(usuarioRepository, "findById").mockResolvedValue(usuarioMock);

    const result = await sut.execute({ idUsuario: usuarioMock.id.toString() });

    expect(result.isRight()).toBe(true);
    expect(usuarioRepository.delete).toHaveBeenCalledWith(usuarioMock.id.toString());
  });

  it("deve retornar erro se o usuário não existir", async () => {
    vi.spyOn(usuarioRepository, "findById").mockResolvedValue(null);

    const result = await sut.execute({ idUsuario: "usuario-inexistente" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DadoNaoEncontradoErro);
  });
});
