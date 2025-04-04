export class Formatar {
  /**
   * Formata uma string como CPF ou CNPJ automaticamente.
   * - CPF: XXX.XXX.XXX-XX
   * - CNPJ: XX.XXX.XXX/0001-XX
   *
   * @param {string} valor - CPF (11 dígitos) ou CNPJ (14 dígitos)
   * @returns {string} - Valor formatado
   */
  static cpfOuCnpj(valor: string): string {
    const apenasNumeros = valor.replace(/\D/g, '');

    if (apenasNumeros.length === 11) {
      // CPF
      return apenasNumeros.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4',
      );
    } else if (apenasNumeros.length === 14) {
      // CNPJ
      return apenasNumeros.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5',
      );
    }

    return valor; // Retorna sem formatação se não tiver 11 ou 14 dígitos
  }

  /**
   * Remove caracteres especiais de uma string e converte para minúsculas.
   *
   * @param {string} str - String a ser sanitizada
   * @returns {string} - String limpa, sem caracteres especiais
   */
  static limparString(str: string): string {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .trim();
  }

  /**
   * Formata um número de telefone brasileiro para o padrão (XX) XXXXX-XXXX.
   * Aceita números com 10 ou 11 dígitos.
   *
   * @param {string} telefone - Número do telefone contendo apenas dígitos
   * @returns {string} - Telefone formatado
   */
  static telefone(telefone: string): string {
    return telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
  }

  /**
   * Converte uma string para "Slug" (usado em URLs).
   * Remove acentos, caracteres especiais e substitui espaços por "-".
   *
   * @param {string} texto - Texto original
   * @returns {string} - Texto formatado como slug
   */
  static slug(texto: string): string {
    return texto
      .normalize('NFD') // Remove acentos
      .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove caracteres especiais
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-'); // Substitui espaços por "-"
  }

  /**
   * Formata um número para o padrão monetário brasileiro (R$ 1.234,56).
   *
   * @param {number} valor - Valor numérico a ser formatado
   * @returns {string} - Valor formatado em reais
   */
  static moeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  /**
   * Remove todos os caracteres que não são dígitos da string.
   *
   * @param {string} valor - Texto contendo números e caracteres diversos
   * @returns {string} - Apenas os números da string original
   */
  static apenasNumeros(valor: string): string {
    return valor.replace(/\D/g, '');
  }
}
