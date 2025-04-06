import { UpdateEnderecoUseCase } from '@/domain/application/cases/endereco/update-endereco-use-case';
import { EnderecoRepository } from '@/domain/enterprise/repositories/endereco-repository';
import { PessoaRepository } from '@/domain/enterprise/repositories/pessoa-repository';
import { DadoNaoEncontradoErro } from '@/core/errors/errors/dado-nao-encontrado-erro';
import { makeEndereco } from 'tests/factories/make-endereco';
import { vi } from 'vitest';

describe('UpdateEnderecoUseCase', () => {
  let enderecoRepository: EnderecoRepository;
  let pessoaRepository: PessoaRepository;
  let sut: UpdateEnderecoUseCase;

  beforeEach(() => {
    enderecoRepository = {
      findById: vi.fn(),
    } as unknown as EnderecoRepository;

    pessoaRepository = {} as PessoaRepository;

    sut = new UpdateEnderecoUseCase(enderecoRepository, pessoaRepository);
  });

  it('deve atualizar um endereço existente', async () => {
    const enderecoMock = makeEndereco();
    vi.spyOn(enderecoRepository, 'findById').mockResolvedValue(enderecoMock);

    const result = await sut.execute({
      idEndereco: enderecoMock.id.toString(),
      cep: '98765-432',
      rua: 'Nova Rua',
      numero: '200',
      complemento: 'Apto 202',
      bairro: 'Novo Bairro',
      cidade: 'Nova Cidade',
      estado: 'NC',
      pais: 'Brasil',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value['endereco'].cep).toBe('98765432');
    expect(result.value['endereco'].rua).toBe('Nova Rua');
    expect(result.value['endereco'].numero).toBe('200');
    expect(result.value['endereco'].complemento).toBe('Apto 202');
    expect(result.value['endereco'].bairro).toBe('Novo Bairro');
    expect(result.value['endereco'].cidade).toBe('Nova Cidade');
    expect(result.value['endereco'].estado).toBe('NC');
    expect(result.value['endereco'].pais).toBe('Brasil');
  });

  it('deve retornar erro se o endereço não existir', async () => {
    vi.spyOn(enderecoRepository, 'findById').mockResolvedValue(null);

    const result = await sut.execute({
      idEndereco: 'endereco-inexistente',
      cep: '12345-678',
      rua: 'Rua Exemplo',
      numero: '100',
      complemento: 'Casa',
      bairro: 'Centro',
      cidade: 'Cidade Exemplo',
      estado: 'EX',
      pais: 'Brasil',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DadoNaoEncontradoErro);
  });
});
