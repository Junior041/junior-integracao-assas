import { BankAccountRepository } from '@/domain/enterprise/repositories/bank-account-repository';
import { Either, right } from '@/core/either';

interface GraficoContasPorMesUseCase {
  mes: string; // Ex: "2025-04"
  total: number;
}

type Response = Either<null, GraficoContasPorMesUseCase[]>;

export class GraficoGraficoContasPorMesUseCase {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async execute(): Promise<Response> {
    const contas = await this.bankAccountRepository.getAll();

    const agrupado: Record<string, number> = {};

    contas.forEach((conta) => {
      const mes = conta.createdAt.toISOString().slice(0, 7); // "YYYY-MM"
      agrupado[mes] = (agrupado[mes] || 0) + 1;
    });

    const result: GraficoContasPorMesUseCase[] = Object.entries(agrupado).map(
      ([mes, total]) => ({ mes, total }),
    );

    return right(result);
  }
}
