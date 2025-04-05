import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { JaCadastradroErro } from '@/core/errors/errors/ja-registrado-erro';
import { CreatePessoaUseCase } from '@/domain/application/cases/pessoa/create-pessoa-use-case';
import { makePessoa } from 'tests/factories/make-pessoa';
import { Queue } from 'bull';

describe('CreatePessoaUseCase', () => {
  let pessoaRepository: PessoaRepository;
  let emailQueue: Queue;
  let sut: CreatePessoaUseCase;

  beforeEach(() => {
    pessoaRepository = {
      verifyByUnique: vi.fn(),
      create: vi.fn(),
    } as unknown as PessoaRepository;

    emailQueue = {
      add: vi.fn(),
    } as unknown as Queue;

    sut = new CreatePessoaUseCase(pessoaRepository, emailQueue);
  });

  it('deve criar uma nova pessoa se o CPF/CNPJ não estiver cadastrado', async () => {
    vi.spyOn(pessoaRepository, 'verifyByUnique').mockResolvedValue(null);

    const pessoa = makePessoa();
    vi.spyOn(pessoaRepository, 'create').mockResolvedValue(pessoa);

    const result = await sut.execute({
      nome: 'João Silva',
      cpfCnpj: '73.833.414/0001-75',
      dataNascimento: new Date('2002-08-15'),
      email: 'teste@gmail.com',
      telefone: '(47) 99999-9999',
      tempoEmMinutosParaEnvioDoEmail: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toHaveProperty('pessoa');
    expect(pessoaRepository.create).toHaveBeenCalled();
    expect(emailQueue.add).toHaveBeenCalledWith(
      'send-welcome-email',
      expect.objectContaining({
        to: ['teste@gmail.com'],
        subject: expect.any(String),
        body: expect.any(String),
      }),
      expect.objectContaining({
        delay: 1000 * 60 * 30,
      }),
    );
  });

  it('deve retornar erro se o CPF/CNPJ já estiver cadastrado', async () => {
    const pessoaMock = makePessoa();
    vi.spyOn(pessoaRepository, 'verifyByUnique').mockResolvedValue(pessoaMock);

    const result = await sut.execute({
      nome: 'João Silva',
      cpfCnpj: '73.833.414/0001-75',
      dataNascimento: new Date('2002-08-15'),
      email: 'teste@gmail.com',
      telefone: '(47) 99999-9999',
      tempoEmMinutosParaEnvioDoEmail: 1,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(JaCadastradroErro);
  });
});
