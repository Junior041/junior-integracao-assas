import { GraficoPessoasPorIdadeUseCase } from '@/domain/application/cases/graficos/pessoas/grafico-pessoas-por-idade-use-case';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { makePessoa } from 'tests/factories/make-pessoa';

describe('GraficoPessoaPorIdade', () => {
  let pessoaRepository: PessoaRepository;
  let sut: GraficoPessoasPorIdadeUseCase;

  beforeEach(() => {
    pessoaRepository = {
      getAllPessoas: vi.fn(),
    } as unknown as PessoaRepository;

    sut = new GraficoPessoasPorIdadeUseCase(pessoaRepository);
  });

  it('deve agrupar pessoas por faixa etária', async () => {
    const hoje = new Date();
    const pessoas = [
      makePessoa({ dataNascimento: new Date(hoje.getFullYear() - 20, 0, 1) }), // 20 anos → 18-25
      makePessoa({ dataNascimento: new Date(hoje.getFullYear() - 30, 0, 1) }), // 30 anos → 26-35
      makePessoa({ dataNascimento: new Date(hoje.getFullYear() - 40, 0, 1) }), // 40 anos → 36-45
      makePessoa({ dataNascimento: new Date(hoje.getFullYear() - 10, 0, 1) }), // 10 anos → 0-17
    ];

    vi.spyOn(pessoaRepository, 'getAllPessoas').mockResolvedValue({
      pessoas: pessoas,
      pagination: {
        page: 1,
        perPage: 9999,
      },
    });

    const result = await sut.execute({});

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.arrayContaining([
        { faixa: '0-17', total: 1 },
        { faixa: '18-25', total: 1 },
        { faixa: '26-35', total: 1 },
        { faixa: '36-45', total: 1 },
        { faixa: '46-60', total: 0 },
        { faixa: '60+', total: 0 },
      ]),
    );
  });
});
