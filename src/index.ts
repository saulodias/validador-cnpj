const NON_HEX_CHARS = /[^0-9A-Fa-f]/g;

export function validarCNPJ(cnpj: string): boolean {
  // Remove caracteres especiais e mantém apenas dígitos e A-F
  cnpj = cnpj.toUpperCase().replace(NON_HEX_CHARS, "");

  // Verifica o tamanho
  if (cnpj.length !== 14) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cnpj)) return false;

  // Valida os dígitos verificadores
  const base = cnpj.slice(0, 12);
  const digitosOriginais = cnpj.slice(12, 14);
  const digitosCalculados = gerarDigitosCNPJ(base);

  return digitosOriginais === digitosCalculados;
}

export function gerarDigitosCNPJ(base: string): string {
  // Remove caracteres especiais e mantém apenas dígitos e A-F
  base = base.replace(NON_HEX_CHARS, "").slice(0, 12);

  if (base.length !== 12 || /[^\dA-F]/.test(base)) {
    throw new Error("A base do CNPJ deve ter 12 dígitos válidos");
  }

  const primeiroDigito = calcularDV(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const segundoDigito = calcularDV(
    base + primeiroDigito,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );

  return primeiroDigito + segundoDigito;
}

function calcularDV(base: string, multiplicadores: number[]): string {
  let soma = 0;
  for (let i = 0; i < multiplicadores.length; i++) {
    soma += parseInt(base[i], 16) * multiplicadores[i];
  }
  const resto = soma % 11;
  return (resto < 2 ? 0 : 11 - resto).toString();
}
