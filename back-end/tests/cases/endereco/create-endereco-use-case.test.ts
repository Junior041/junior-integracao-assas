import { EnderecoRepository } from '@/domain/enterprise/repositories/endereco-repository';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { DadoNaoEncontradoErro } from '@/core/errors/errors/dado-nao-encontrado-erro';
import { CreateEnderecoUseCase } from '@/domain/application/cases/endereco/create-endereco-use-case';
import { makePessoa } from 'tests/factories/make-pessoa';
import { vi } from 'vitest';

describe('CreateEnderecoUseCase', () => {
  let enderecoRepository: EnderecoRepository;
  let pessoaRepository: PessoaRepository;
  let sut: CreateEnderecoUseCase;

  beforeEach(() => {
    enderecoRepository = {
      create: vi.fn(),
    } as unknown as EnderecoRepository;

    pessoaRepository = {
      findById: vi.fn(),
    } as unknown as PessoaRepository;

    sut = new CreateEnderecoUseCase(enderecoRepository, pessoaRepository);
  });

  it('deve criar um novo endereço se a pessoa existir', async () => {
    const pessoaMock = makePessoa();
    vi.spyOn(pessoaRepository, 'findById').mockResolvedValue(pessoaMock);

    const result = await sut.execute({
      fkPessoa: pessoaMock.id.toString(),
      cep: '12345-678',
      rua: 'Rua Exemplo',
      numero: '100',
      complemento: 'Apto 101',
      bairro: 'Centro',
      cidade: 'Cidade Exemplo',
      estado: 'EX',
      pais: 'Brasil',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toHaveProperty('endereco');
    expect(enderecoRepository.create).toHaveBeenCalled();
  });

  it('deve retornar erro se a pessoa não existir', async () => {
    vi.spyOn(pessoaRepository, 'findById').mockResolvedValue(null);

    const result = await sut.execute({
      fkPessoa: 'pessoa-inexistente',
      cep: '12345-678',
      rua: 'Rua Exemplo',
      bairro: 'Centro',
      cidade: 'Cidade Exemplo',
      estado: 'EX',
      pais: 'Brasil',
      numero: '21',
      complemento: 'casa',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DadoNaoEncontradoErro);
  });
});
