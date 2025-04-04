import { EnderecoRepository } from '@/domain/enterprise/repositories/endereco-repository';
import { vi } from 'vitest';
import { FetchEnderecoByPessoaUseCase } from '@/domain/application/cases/endereco/fetch-endereco-by-pessoa-use-case';
import { makeEndereco } from 'tests/factories/make-endereco';

describe('FetchEnderecoByPessoaUseCase', () => {
  let enderecoRepository: EnderecoRepository;
  let sut: FetchEnderecoByPessoaUseCase;

  beforeEach(() => {
    enderecoRepository = {
      fetchByFkPessoa: vi.fn(),
    } as unknown as EnderecoRepository;

    sut = new FetchEnderecoByPessoaUseCase(enderecoRepository);
  });

  it('deve retornar um array de enderecos da pessoa', async () => {
    const enderecoMock = makeEndereco();
    vi.spyOn(enderecoRepository, 'fetchByFkPessoa').mockResolvedValue([
      enderecoMock,
    ]);

    const result = await sut.execute({
      fkPessoa: ' 83f0ebc8-c6f7-4294-b8ae-fbe630f91983 ',
    });
    expect(result.isRight()).toBe(true);

    expect(result.value).toHaveProperty('enderecos');
  });
});
