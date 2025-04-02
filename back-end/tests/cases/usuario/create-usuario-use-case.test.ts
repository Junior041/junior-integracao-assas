import { PessoaRepository } from "@/domain/enterprise/repositories/pessoa-repository";
import { makePessoa } from "tests/factories/make-pessoa";
import { UsuarioRepository } from "@/domain/enterprise/repositories/usuario-repository";
import { CreateUsuarioUseCase } from "@/domain/application/cases/usuario/create-usuario-use-case";
import { HashGenerator } from "@/domain/application/cryptography/hasher-generator";
import { FakeHasher } from "tests/faker/cryptography/faker-hasher";

describe("CreateUsuarioUseCase", () => {
  let usuarioRepository: UsuarioRepository;
  let pessoaRepository: PessoaRepository;
  let hashGenerator: HashGenerator;
  let sut: CreateUsuarioUseCase;

  beforeEach(async () => {
    usuarioRepository = {
      findByFkPessoa: vi.fn(),
      findByEmail: vi.fn(),
      create: vi.fn(),
    } as unknown as UsuarioRepository;
    pessoaRepository = {
      findById: vi.fn(),
    } as unknown as PessoaRepository;
    hashGenerator = new FakeHasher();
    sut = new CreateUsuarioUseCase(usuarioRepository, pessoaRepository, hashGenerator);
  });

  it("Deve criar um usuario", async () => {
    const pessoaMock = makePessoa();
    vi.spyOn(usuarioRepository, "findByFkPessoa").mockResolvedValue(null);
    vi.spyOn(usuarioRepository, "findByEmail").mockResolvedValue(null);
    vi.spyOn(pessoaRepository, "findById").mockResolvedValue(pessoaMock);

    const result = await sut.create({
      ativo: true,
      email: "teste@gmail.com",
      fkPessoa: pessoaMock.id.toString(),
      senha: "senha",
    });
    expect(result.isRight()).toBe(true);
    expect(result.value).toHaveProperty("usuario");
  });

  it("A senha do usuario deve ter sido criptografada", async () => {
    const pessoaMock = makePessoa();
    vi.spyOn(usuarioRepository, "findByFkPessoa").mockResolvedValue(null);
    vi.spyOn(usuarioRepository, "findByEmail").mockResolvedValue(null);
    vi.spyOn(pessoaRepository, "findById").mockResolvedValue(pessoaMock);

    const result = await sut.create({
      ativo: true,
      email: "teste@gmail.com",
      fkPessoa: pessoaMock.id.toString(),
      senha: "senha",
    });
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value).toHaveProperty("usuario");
      expect(result.value["usuario"].senha).toEqual(await hashGenerator.hash("senha"));
    }
  });
  
});
