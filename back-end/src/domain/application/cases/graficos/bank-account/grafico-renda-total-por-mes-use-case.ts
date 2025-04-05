import { Either, right } from '@/core/either';
import { BankAccountRepository } from '@/domain/enterprise/repositories/bank-account-repository';
import { Injectable } from '@nestjs/common';

interface RendaPorMes {
  mes: string;
  totalRenda: number;
}

type GraficoRendaTotalPorMesUseCaseRespose = Either<null, RendaPorMes[]>;
@Injectable()
export class GraficoRendaTotalPorMesUseCase {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async execute(): Promise<GraficoRendaTotalPorMesUseCaseRespose> {
    const contas = await this.bankAccountRepository.getAll();

    const agrupado: Record<string, number> = {};

    contas.forEach((conta) => {
      const mes = conta.createdAt.toISOString().slice(0, 7);
      agrupado[mes] = (agrupado[mes] || 0) + conta.incomeValue;
    });

    const result = Object.entries(agrupado).map(([mes, totalRenda]) => ({
      mes,
      totalRenda,
    }));

    return right(result);
  }
}
