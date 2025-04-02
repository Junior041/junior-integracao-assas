import { UseCaseError } from '@/core/errors/use-case-error';

export class CredenciaisInvalidasError extends Error implements UseCaseError {
  constructor() {
    super('Credenciais Invalidas.');
  }
}
