import { CreateBankAccountUseCase } from '@/domain/application/cases/bank-account/create-bank-account-use-case';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { BankAccountRepository } from '@/domain/enterprise/repositories/bank-account-repository';
import { makePessoa } from 'tests/factories/make-pessoa';
import { makeEndereco } from 'tests/factories/make-endereco';
import { JaCadastradroErro } from '@/core/errors/errors/ja-registrado-erro';
import { GenericoErro } from '@/core/errors/errors/generico-erro';
import { DadoNaoEncontradoErro } from '@/core/errors/errors/dado-nao-encontrado-erro';
import { BankAccount } from '@/domain/enterprise/entities/bank-account';
import { vi } from 'vitest';
import { makeBankAccount } from 'tests/factories/make-bank-account';
import { IntegracaoCobrancas } from '@/domain/application/integracoes/cobrancas/integracao-cobrancas';
import { UsuarioRepository } from '@/domain/enterprise/repositories/usuario-repository';
import { makeUsuario } from 'tests/factories/make-usuario';

describe('CreateBankAccountUseCase', () => {
  let pessoaRepository: PessoaRepository;
  let bankAccountRepository: BankAccountRepository;
  let usuarioRepository: UsuarioRepository;
  let integracaoCobranca: IntegracaoCobrancas;
  let sut: CreateBankAccountUseCase;

  beforeEach(() => {
    pessoaRepository = {
      findByIdWithEndereco: vi.fn(),
    } as unknown as PessoaRepository;

    bankAccountRepository = {
      findByFkPessoa: vi.fn(),
      create: vi.fn(),
    } as unknown as BankAccountRepository;

    integracaoCobranca = {
      createAccount: vi.fn(),
    } as unknown as IntegracaoCobrancas;

    usuarioRepository = {
      findById: vi.fn(),
    } as unknown as UsuarioRepository;

    sut = new CreateBankAccountUseCase(
      integracaoCobranca,
      pessoaRepository,
      usuarioRepository,
      bankAccountRepository,
    );
  });

  it('deve criar uma conta bancária se a pessoa existir e não tiver conta no banco', async () => {
    const pessoaMock = makePessoa({
      enderecos: [makeEndereco()],
    });

    vi.spyOn(pessoaRepository, 'findByIdWithEndereco').mockResolvedValue(
      pessoaMock,
    );
    vi.spyOn(usuarioRepository, 'findById').mockResolvedValue(makeUsuario());
    vi.spyOn(bankAccountRepository, 'findByFkPessoa').mockResolvedValue([]);

    const fakeApiResponse = {
      id: 'external-id',
      accountNumber: {
        account: '1234',
        accountDigit: '5',
        agency: '0001',
      },
      object: 'account',
    };

    vi.spyOn(integracaoCobranca, 'createAccount').mockResolvedValue(
      fakeApiResponse,
    );

    const fakeBankAccount = BankAccount.create({
      account: '1234',
      accountDigit: '5',
      agency: '0001',
      bank: 'ASSAS',
      fkPessoa: pessoaMock.id.toString(),
      fkUserCreate: 'user-1',
      idAccount: 'external-id',
      incomeValue: 5000,
    });

    vi.spyOn(bankAccountRepository, 'create').mockResolvedValue(
      fakeBankAccount,
    );

    const result = await sut.execute({
      bank: 'ASSAS',
      incomeValue: 5000,
      fkPessoa: pessoaMock.id.toString(),
      fkUserCreate: 'user-1',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toHaveProperty('bankAccount');
    expect(bankAccountRepository.create).toHaveBeenCalled();
  });

  it('deve retornar erro se a pessoa não existir', async () => {
    vi.spyOn(pessoaRepository, 'findByIdWithEndereco').mockResolvedValue(null);

    const result = await sut.execute({
      bank: 'ASSAS',
      incomeValue: 5000,
      fkPessoa: 'pessoa-inexistente',
      fkUserCreate: 'user-1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DadoNaoEncontradoErro);
  });

  it('deve retornar erro se a pessoa não possuir endereço', async () => {
    const pessoaMock = makePessoa({ enderecos: [] });

    vi.spyOn(pessoaRepository, 'findByIdWithEndereco').mockResolvedValue(
      pessoaMock,
    );

    const result = await sut.execute({
      bank: 'ASSAS',
      incomeValue: 5000,
      fkPessoa: pessoaMock.id.toString(),
      fkUserCreate: 'user-1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(GenericoErro);
  });

  it('deve retornar erro se a pessoa já tiver conta no mesmo banco', async () => {
    const pessoaMock = makePessoa({
      enderecos: [makeEndereco()],
    });
    vi.spyOn(pessoaRepository, 'findByIdWithEndereco').mockResolvedValue(
      pessoaMock,
    );
    vi.spyOn(usuarioRepository, 'findById').mockResolvedValue(makeUsuario());
    vi.spyOn(bankAccountRepository, 'findByFkPessoa').mockResolvedValue([
      makeBankAccount({
        bank: 'ASSAS',
      }),
    ]);

    const result = await sut.execute({
      bank: 'ASSAS',
      incomeValue: 5000,
      fkPessoa: pessoaMock.id.toString(),
      fkUserCreate: 'user-1',
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(JaCadastradroErro);
  });

  it('deve retornar erro se a integração com o banco retornar null', async () => {
    const pessoaMock = makePessoa({
      enderecos: [makeEndereco()],
    });

    vi.spyOn(pessoaRepository, 'findByIdWithEndereco').mockResolvedValue(
      pessoaMock,
    );
    vi.spyOn(usuarioRepository, 'findById').mockResolvedValue(makeUsuario());
    vi.spyOn(bankAccountRepository, 'findByFkPessoa').mockResolvedValue([]);
    vi.spyOn(integracaoCobranca, 'createAccount').mockResolvedValue(null);

    const result = await sut.execute({
      bank: 'ASSAS',
      incomeValue: 5000,
      fkPessoa: pessoaMock.id.toString(),
      fkUserCreate: 'user-1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(GenericoErro);
  });
});
