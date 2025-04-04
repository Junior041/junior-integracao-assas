export class Validations {
  static isValidCnpj(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
      return false;
    }

    let soma = 0;
    let peso = 5;

    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj[i]) * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }

    let primeiroDigito = 11 - (soma % 11);
    primeiroDigito = primeiroDigito > 9 ? 0 : primeiroDigito;

    soma = 0;
    peso = 6;

    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj[i]) * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }

    let segundoDigito = 11 - (soma % 11);
    segundoDigito = segundoDigito > 9 ? 0 : segundoDigito;

    return (
      cnpj[12] === primeiroDigito.toString() &&
      cnpj[13] === segundoDigito.toString()
    );
  }

  static isValidCpf(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf[i]) * (10 - i);
    }
    let primeiroDigito = 11 - (soma % 11);
    primeiroDigito = primeiroDigito > 9 ? 0 : primeiroDigito;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf[i]) * (11 - i);
    }
    let segundoDigito = 11 - (soma % 11);
    segundoDigito = segundoDigito > 9 ? 0 : segundoDigito;

    return (
      cpf[9] === primeiroDigito.toString() &&
      cpf[10] === segundoDigito.toString()
    );
  }
}
