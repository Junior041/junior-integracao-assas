import { EnderecoRepository } from "@/domain/enterprise/repositories/endereco-repository";
import { DadoNaoEncontradoErro } from "@/core/errors/errors/dado-nao-encontrado-erro";
import { DeleteEnderecoUseCase } from "@/domain/application/cases/endereco/delete-endereco-use-case";
import { makeEndereco } from "tests/factories/make-endereco";
import { vi } from "vitest";

describe("DeleteEnderecoUseCase", () => {
  let enderecoRepository: EnderecoRepository;
  let sut: DeleteEnderecoUseCase;

  beforeEach(() => {
    enderecoRepository = {
      findById: vi.fn(),
      delete: vi.fn(),
    } as unknown as EnderecoRepository;

    sut = new DeleteEnderecoUseCase(enderecoRepository);
  });

  it("deve deletar um endereço se ele existir", async () => {
    const enderecoMock = makeEndereco();
    vi.spyOn(enderecoRepository, "findById").mockResolvedValue(enderecoMock);

    const result = await sut.execute({ idEndereco: enderecoMock.id.toString() });

    expect(result.isRight()).toBe(true);
    expect(enderecoRepository.delete).toHaveBeenCalledWith(enderecoMock.id.toString());
  });

  it("deve retornar erro se o endereço não existir", async () => {
    vi.spyOn(enderecoRepository, "findById").mockResolvedValue(null);

    const result = await sut.execute({ idEndereco: "endereco-inexistente" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DadoNaoEncontradoErro);
  });
});
