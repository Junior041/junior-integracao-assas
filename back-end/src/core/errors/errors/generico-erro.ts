import { UseCaseError } from "@/core/errors/use-case-error";

export class GenericoErro extends Error implements UseCaseError {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("Erro ao tentar realizar a operação.");
    }
  }
}
