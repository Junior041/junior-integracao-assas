import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { JaCadastradroErro } from '@/core/errors/errors/ja-registrado-erro';
import { CreatePessoaUseCase } from '@/domain/application/cases/pessoa/create-pessoa-use-case';
import { makePessoa } from 'tests/factories/make-pessoa';

describe('CreatePessoaUseCase', () => {
  let pessoaRepository: PessoaRepository;
  let sut: CreatePessoaUseCase;

  beforeEach(async () => {
    pessoaRepository = {
      findByCpfCnpj: vi.fn(),
      create: vi.fn(),
    } as unknown as PessoaRepository;
    sut = new CreatePessoaUseCase(pessoaRepository);
  });

  it('deve criar uma nova pessoa se o CPF/CNPJ não estiver cadastrado', async () => {
    const result = await sut.execute({
      nome: 'João Silva',
      cpfCnpj: '12345678900',
      fkUserCreate: 'user-123',
    });

    vi.spyOn(pessoaRepository, 'findByCpfCnpj').mockResolvedValue(null);

    expect(result.isRight()).toBe(true);
    expect(result.value).toHaveProperty('pessoa');
  });

  it('deve retornar erro se o CPF/CNPJ já estiver cadastrado', async () => {
    const pessoaMock = makePessoa();

    vi.spyOn(pessoaRepository, 'findByCpfCnpj').mockResolvedValue(pessoaMock);

    const result = await sut.execute({
      nome: 'João Silva',
      cpfCnpj: '000-000-000-55',
      fkUserCreate: 'user-123',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(JaCadastradroErro);
  });
});
