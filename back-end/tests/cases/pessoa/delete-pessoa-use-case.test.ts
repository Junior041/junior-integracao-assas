import { PessoaRepository } from "@/domain/enterprise/repositories/pessoa-repository";
import { DadoNaoEncontradoErro } from "@/core/errors/errors/dado-nao-encontrado-erro";
import { GenericoErro } from "@/core/errors/errors/generico-erro";
import { DeletePessoaUseCase } from "@/domain/application/cases/pessoa/delete-pessoa-use-case";
import { makePessoa } from "tests/factories/make-pessoa";
import { vi } from "vitest";
import { makeEndereco } from "tests/factories/make-endereco";
import { UsuarioRepository } from "@/domain/enterprise/repositories/usuario-repository";
import { makeUsuario } from "tests/factories/make-usuario";

describe("DeletePessoaUseCase", () => {
  let pessoaRepository: PessoaRepository;
  let usuarioRepository: UsuarioRepository;
  let sut: DeletePessoaUseCase;

  beforeEach(() => {
    pessoaRepository = {
      findById: vi.fn(),
      delete: vi.fn(),
    } as unknown as PessoaRepository;
    usuarioRepository = {
      findByFkPessoa: vi.fn(),
    } as unknown as UsuarioRepository;

    sut = new DeletePessoaUseCase(pessoaRepository,usuarioRepository);
  });

  it("deve deletar uma pessoa se ela existir e não tiver endereços", async () => {
    const pessoaMock = makePessoa({ enderecos: [] });
    vi.spyOn(pessoaRepository, "findById").mockResolvedValue(pessoaMock);

    const result = await sut.execute({ idPessoa: pessoaMock.id.toString() });
    
    expect(result.isRight()).toBe(true);
    expect(pessoaRepository.delete).toHaveBeenCalledWith(pessoaMock.id.toString());
  });

  it("deve retornar erro se a pessoa não existir", async () => {
    vi.spyOn(pessoaRepository, "findById").mockResolvedValue(null);

    const result = await sut.execute({ idPessoa: "pessoa-inexistente" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DadoNaoEncontradoErro);
  });

  it("deve retornar erro se a pessoa possuir endereços ativos", async () => {
    const pessoaMock = makePessoa({ enderecos: [makeEndereco()] });
    vi.spyOn(pessoaRepository, "findById").mockResolvedValue(pessoaMock);

    const result = await sut.execute({ idPessoa: pessoaMock.id.toString() });
    
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(GenericoErro);
  });

  it("deve retornar erro se a pessoa for um usuario", async () => {
    const pessoaMock = makePessoa({ enderecos: [makeEndereco()] });
    const usuarioMock = makeUsuario({fkPessoa: pessoaMock.id.toValue()})
    vi.spyOn(pessoaRepository, "findById").mockResolvedValue(pessoaMock);
    vi.spyOn(usuarioRepository, "findByFkPessoa").mockResolvedValue(usuarioMock);


    const result = await sut.execute({ idPessoa: pessoaMock.id.toString() });
    
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(GenericoErro);
  });
});
