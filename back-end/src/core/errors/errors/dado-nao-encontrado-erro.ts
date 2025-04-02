import { UseCaseError } from '@/core/errors/use-case-error';

interface DadoNaoEncontradoErroParams {
  dado?: string;
  valor?: string | number;
}

export class DadoNaoEncontradoErro extends Error implements UseCaseError {
  constructor({ dado, valor }: DadoNaoEncontradoErroParams) {
    if (dado && valor) {
      super(`Dado '${dado}' com valor '${valor.toString()}' não encontrado`);
    } else if (dado) {
      super(`Dado '${dado}' não encontrado`);
    } else {
      super('Dado não encontrado');
    }
  }
}
