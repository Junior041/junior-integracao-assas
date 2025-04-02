import { CredenciaisInvalidasError } from "@/core/errors/errors/credenciais-invalidas-error";
import { LoginUseCase } from "@/domain/application/cases/usuario/login-use-case";
import { UsuarioRepository } from "@/domain/enterprise/repositories/usuario-repository";
import { makeUsuario } from "tests/factories/make-usuario";
import { FakeEncrypter } from "tests/faker/cryptography/faker-encrypter";
import { FakeHasher } from "tests/faker/cryptography/faker-hasher";

let usuarioRepository: UsuarioRepository;
let fakeEncrypter: FakeEncrypter;
let fakeHasher: FakeHasher;
let sut: LoginUseCase;

describe('LoginUseCAse', () => {
	beforeEach(() => {
		usuarioRepository = {
            findByEmail: vi.fn()
        } as unknown as UsuarioRepository;
		fakeEncrypter = new FakeEncrypter();
		fakeHasher = new FakeHasher();
		sut = new LoginUseCase(usuarioRepository,fakeHasher,fakeEncrypter);
	});

	it('deve ser possivel se autenticar', async () => {
		const usuario = makeUsuario({
			email: 'teste@gmail.com',
            senha: await fakeHasher.hash('teste_senha'),
		});
        
		vi.spyOn(usuarioRepository, "findByEmail").mockResolvedValue(usuario)

		const result = await sut.execute({
			email: "teste@gmail.com",
			senha: "teste_senha",
		});
        
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			accessToken: expect.any(String)
		});
	});

	it('deve retornar erro generico caso nao encontre o email', async () => {
		vi.spyOn(usuarioRepository, "findByEmail").mockResolvedValue(null)

		const result = await sut.execute({
			email: "teste@gmail.com",
			senha: "teste_senha",
		});
        
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(CredenciaisInvalidasError);
	});

	it('deve retornar erro generico caso a senha nao seja igual', async () => {
		const usuario = makeUsuario({
			email: 'teste@gmail.com',
            senha: await fakeHasher.hash('outra_senha'),
		});
        
		vi.spyOn(usuarioRepository, "findByEmail").mockResolvedValue(usuario)

		const result = await sut.execute({
			email: "teste@gmail.com",
			senha: "teste_senha",
		});
        
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(CredenciaisInvalidasError);
	});

});