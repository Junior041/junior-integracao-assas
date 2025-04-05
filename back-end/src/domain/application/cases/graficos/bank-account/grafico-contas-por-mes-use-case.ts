import { BankAccountRepository } from '@/domain/enterprise/repositories/bank-account-repository';
import { Either, right } from '@/core/either';
import { Injectable } from '@nestjs/common';

interface GraficoContasPorMesUseCase {
  mes: string; // Ex: "2025-04"
  total: number;
}

type GraficoGraficoContasPorMesUseCaseResponse = Either<
  null,
  GraficoContasPorMesUseCase[]
>;
@Injectable()
export class GraficoGraficoContasPorMesUseCase {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async execute(): Promise<GraficoGraficoContasPorMesUseCaseResponse> {
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
