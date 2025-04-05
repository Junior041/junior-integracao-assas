import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BankAccountRepository } from '@/domain/enterprise/repositories/bank-account-repository';
import { BankAccount } from '@/domain/enterprise/entities/bank-account';
import { makeBankAccount } from 'tests/factories/make-bank-account';
import { GraficoGraficoContasPorMesUseCase } from '@/domain/application/cases/graficos/bank-account/grafico-contas-por-mes-use-case';

describe('GraficoContasPorMesUseCase', () => {
  let bankAccountRepository: BankAccountRepository;
  let sut: GraficoGraficoContasPorMesUseCase;

  beforeEach(() => {
    bankAccountRepository = {
      getAll: vi.fn(),
    } as unknown as BankAccountRepository;

    sut = new GraficoGraficoContasPorMesUseCase(bankAccountRepository);
  });

  it('deve agrupar as contas bancárias por mês corretamente', async () => {
    const contasMock: BankAccount[] = [
      makeBankAccount({
        createdAt: new Date('2025-04-01'),
      }),
      makeBankAccount({
        createdAt: new Date('2025-04-15'),
      }),
      makeBankAccount({
        createdAt: new Date('2025-05-10'),
      }),
    ];

    vi.spyOn(bankAccountRepository, 'getAll').mockResolvedValue(contasMock);

    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual([
      { mes: '2025-04', total: 2 },
      { mes: '2025-05', total: 1 },
    ]);
  });

  it('deve retornar lista vazia se não houver contas bancárias', async () => {
    vi.spyOn(bankAccountRepository, 'getAll').mockResolvedValue([]);

    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual([]);
  });
});
