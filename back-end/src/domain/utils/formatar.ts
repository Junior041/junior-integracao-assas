export class Formatar {
  /**
   * Formata um CPF adicionando os pontos e o traço no formato XXX.XXX.XXX-XX.
   *
   * @param {string} cpf - CPF contendo apenas números (11 dígitos)
   * @returns {string} - CPF formatado no padrão brasileiro
   */
  static cpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
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
}
