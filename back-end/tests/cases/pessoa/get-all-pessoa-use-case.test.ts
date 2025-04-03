import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { makePessoa } from 'tests/factories/make-pessoa';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { OrderColumnParams } from '@/core/repositories/order-column-params';
import { GetPessoaUseCase } from '@/domain/application/cases/pessoa/get-all-pessoa-use-case';

describe('GetPessoaUseCase', () => {
  let pessoaRepository: PessoaRepository;
  let sut: GetPessoaUseCase;

  beforeEach(() => {
    pessoaRepository = {
      getAllPessoas: vi.fn(),
    } as unknown as PessoaRepository;
    sut = new GetPessoaUseCase(pessoaRepository);
  });

  it('deve retornar uma lista paginada de pessoas', async () => {
    const pessoasMock = [makePessoa(), makePessoa()];
    const paginationMock: PaginationParams = { page: 1, perPage: 10, total: 2 };
    const orderMock: OrderColumnParams = { orderBy: 'nome', order: 'asc' };
    const filtroMock = { nome: 'João' };

    vi.spyOn(pessoaRepository, 'getAllPessoas').mockResolvedValue({
      pessoas: pessoasMock,
      pagination: paginationMock,
    });

    const result = await sut.execute({
      filtro: filtroMock,
      order: orderMock,
      pagination: paginationMock,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value!.pessoas).toHaveLength(2);
    expect(result.value!.pagination).toEqual(paginationMock);
  });

  it('deve retornar uma lista vazia se não houver pessoas correspondentes', async () => {
    const paginationMock: PaginationParams = { page: 1, perPage: 10, total: 0 };
    const orderMock: OrderColumnParams = { orderBy: 'nome', order: 'asc' };
    const filtroMock = { nome: 'Inexistente' };

    vi.spyOn(pessoaRepository, 'getAllPessoas').mockResolvedValue({
      pessoas: [],
      pagination: paginationMock,
    });

    const result = await sut.execute({
      filtro: filtroMock,
      order: orderMock,
      pagination: paginationMock,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value!.pessoas).toHaveLength(0);
    expect(result.value!.pagination).toEqual(paginationMock);
  });
});
