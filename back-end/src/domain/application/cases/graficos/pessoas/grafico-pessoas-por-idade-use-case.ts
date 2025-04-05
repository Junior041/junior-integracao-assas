import { Either, right } from '@/core/either';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { Injectable } from '@nestjs/common';

interface GraficoPessoasPorIdadeUseCaseRequest {}

interface FaixaEtaria {
  faixa: string;
  total: number;
}

type GraficoPessoasPorIdadeUseCaseResponse = Either<null, FaixaEtaria[]>;
@Injectable()
export class GraficoPessoasPorIdadeUseCase {
  constructor(private readonly pessoaRepository: PessoaRepository) {}

  async execute({}: GraficoPessoasPorIdadeUseCaseRequest): Promise<GraficoPessoasPorIdadeUseCaseResponse> {
    const pessoas = await this.pessoaRepository.getAllPessoas({
      pagination: {
        page: 1,
        perPage: 9999,
      },
      order: {
        order: 'asc',
        orderBy: 'nome',
      },
    });

    const hoje = new Date();

    const faixaEtarias: Record<string, number> = {
      '0-17': 0,
      '18-25': 0,
      '26-35': 0,
      '36-45': 0,
      '46-60': 0,
      '60+': 0,
    };

    for (const pessoa of pessoas.pessoas) {
      if (!pessoa || !pessoa.dataNascimento) continue;

      const idade =
        hoje.getFullYear() - new Date(pessoa.dataNascimento).getFullYear();

      if (idade < 18) faixaEtarias['0-17']++;
      else if (idade <= 25) faixaEtarias['18-25']++;
      else if (idade <= 35) faixaEtarias['26-35']++;
      else if (idade <= 45) faixaEtarias['36-45']++;
      else if (idade <= 60) faixaEtarias['46-60']++;
      else faixaEtarias['60+']++;
    }

    const result: FaixaEtaria[] = Object.entries(faixaEtarias).map(
      ([faixa, total]) => ({
        faixa,
        total,
      }),
    );

    return right(result);
  }
}
