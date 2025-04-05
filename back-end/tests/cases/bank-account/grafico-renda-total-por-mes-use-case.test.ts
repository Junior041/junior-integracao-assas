import { GraficoRendaTotalPorMesUseCase } from '@/domain/application/cases/graficos/bank-account/grafico-renda-total-por-mes-use-case';
import { BankAccountRepository } from '@/domain/enterprise/repositories/bank-account-repository';
import { makeBankAccount } from 'tests/factories/make-bank-account';

describe('GraficoRendaTotalPorMesUseCase', () => {
  let bankAccountRepository: BankAccountRepository;
  let sut: GraficoRendaTotalPorMesUseCase;

  beforeEach(() => {
    bankAccountRepository = {
      getAll: vi.fn(),
    } as unknown as BankAccountRepository;

    sut = new GraficoRendaTotalPorMesUseCase(bankAccountRepository);
  });

  it('deve retornar o total de renda agrupado por mês', async () => {
    const contas = [
      makeBankAccount({ createdAt: new Date('2025-04-01'), incomeValue: 1000 }),
      makeBankAccount({ createdAt: new Date('2025-04-15'), incomeValue: 2000 }),
      makeBankAccount({ createdAt: new Date('2025-05-01'), incomeValue: 3000 }),
    ];

    vi.spyOn(bankAccountRepository, 'getAll').mockResolvedValue(contas);

    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual([
      { mes: '2025-04', totalRenda: 3000 },
      { mes: '2025-05', totalRenda: 3000 },
    ]);
  });
});
