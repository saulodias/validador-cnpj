
## Sobre o CNPJ em 2026

A Receita Federal anunciou mudanças no formato do CNPJ para 2026. Embora não haja informações oficiais sobre o novo formato, esta biblioteca demonstra que a lógica de validação dos dígitos verificadores é flexível o suficiente para acomodar diferentes formatos, caso necessário.

O suporte a dígitos hexadecimais implementado aqui é apenas uma demonstração técnica de como adaptações poderiam ser feitas, não refletindo qualquer especificação oficial ou previsão do novo formato.

### Por que este experimento?

1. Demonstrar a flexibilidade do algoritmo de validação
2. Ilustrar como mudanças no formato podem ser acomodadas
3. Servir como exemplo educacional de adaptação de algoritmos
4. Mostrar que a lógica dos dígitos verificadores pode ser mantida mesmo com caracteres diferentes

## API

### validarCNPJ(cnpj: string): boolean
Valida um número de CNPJ, incluindo dígitos verificadores.

### gerarDigitosCNPJ(base: string): string
Gera os dígitos verificadores para uma base de CNPJ (primeiros 12 dígitos).

## Notas Importantes

- Esta é uma biblioteca de validação padrão de CNPJ
- O suporte a hexadecimais é puramente experimental e educacional
- Não há indicação oficial de que o novo formato utilizará caracteres hexadecimais
- Em produção, recomenda-se usar apenas a validação padrão com dígitos decimais

## Licença

MIT