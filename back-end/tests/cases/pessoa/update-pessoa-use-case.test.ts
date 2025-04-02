import { PessoaRepository } from "@/domain/enterprise/repositories/pessoa-repository";
import { makePessoa } from "tests/factories/make-pessoa";
import { UpdatePessoaUseCase } from "@/domain/application/cases/pessoa/update-pessoa-use-case";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DadoNaoEncontradoErro } from "@/core/errors/errors/dado-nao-encontrado-erro";

describe("UpdatePessoaUseCase", () => {
  let pessoaRepository: PessoaRepository;
  let sut: UpdatePessoaUseCase;

  beforeEach(async () => {
    pessoaRepository = {
      findById: vi.fn(),
      save: vi.fn(),
    } as unknown as PessoaRepository;
    sut = new UpdatePessoaUseCase(pessoaRepository);
  });

  it("deve alterar uma pessoa se encontrar ela pelo seu idPessoa", async () => {
    const pessoaMock = makePessoa();
    vi.spyOn(pessoaRepository, "findById").mockResolvedValue(pessoaMock);
    pessoaMock.nome = "João Silva";
    vi.spyOn(pessoaRepository, "save").mockResolvedValue(pessoaMock);

    const result = await sut.execute({
      idPessoa: pessoaMock.id.toString(),
      nome: "João Silva",
    });
    expect(result.isRight()).toBe(true);
  });

  it("deve retornar erro se não encontrar a pessoa", async () => {
    vi.spyOn(pessoaRepository, "findById").mockResolvedValue(null);
    const idPessoa = new UniqueEntityID().toString();
    const result = await sut.execute({
      idPessoa,
      nome: "João Silva",
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toEqual(
      new DadoNaoEncontradoErro({
        dado: "idPessoa",
        valor: idPessoa,
      })
    );
  });
});
