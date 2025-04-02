import { UseCaseError } from "@/core/errors/use-case-error";

export class JaCadastradroErro extends Error implements UseCaseError {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("Já Registrado.");
    }
  }
}
