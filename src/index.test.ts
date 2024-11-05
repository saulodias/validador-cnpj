import { gerarDigitosCNPJ, validarCNPJ } from "./index";

describe("CNPJ Validation and Generation", () => {
  describe("validarCNPJ", () => {
    test("deve validar CNPJs válidos", () => {
      expect(validarCNPJ("11.222.333/0001-81")).toBe(true);
      expect(validarCNPJ("57.874.175/0001-45")).toBe(true);
      expect(validarCNPJ("11222333000181")).toBe(true);
    });

    test("deve rejeitar CNPJs inválidos", () => {
      expect(validarCNPJ("11.222.333/0001-82")).toBe(false);
      expect(validarCNPJ("11.222.333/0001-00")).toBe(false);
      expect(validarCNPJ("00000000000000")).toBe(false);
    });

    test("deve rejeitar CNPJs com formato inválido", () => {
      expect(validarCNPJ("11.222.333/0001")).toBe(false);
      expect(validarCNPJ("abc")).toBe(false);
      expect(validarCNPJ("")).toBe(false);
    });
  });

  describe("gerarDigitosCNPJ", () => {
    test("deve gerar dígitos verificadores corretos", () => {
      expect(gerarDigitosCNPJ("112223330001")).toBe("81");
      expect(gerarDigitosCNPJ("578741750001")).toBe("45");
    });

    test("deve limpar caracteres especiais da base", () => {
      expect(gerarDigitosCNPJ("11.222.333/0001")).toBe("81");
      expect(gerarDigitosCNPJ("57.874.175/0001")).toBe("45");
    });

    test("deve lançar erro para base inválida", () => {
      expect(() => gerarDigitosCNPJ("123")).toThrow(
        "A base do CNPJ deve ter 12 dígitos"
      );
      expect(() => gerarDigitosCNPJ("")).toThrow(
        "A base do CNPJ deve ter 12 dígitos"
      );
    });
  });

  describe("CNPJs com dígitos hexadecimais", () => {
    test("deve gerar dígitos verificadores para bases com A-F", () => {
      expect(gerarDigitosCNPJ("A12223330001")).toBe("74");
      expect(gerarDigitosCNPJ("B28741750001")).toBe("53");
      expect(gerarDigitosCNPJ("C32223330001")).toBe("07");
      expect(gerarDigitosCNPJ("D44321230001")).toBe("60");
      expect(gerarDigitosCNPJ("E56789010001")).toBe("11");
      expect(gerarDigitosCNPJ("F67890120001")).toBe("48");
    });

    test("deve validar CNPJs começando com A-F", () => {
      expect(validarCNPJ("A1.222.333/0001-74")).toBe(true);
      expect(validarCNPJ("B2.874.175/0001-53")).toBe(true);
      expect(validarCNPJ("C3222333000107")).toBe(true);
      expect(validarCNPJ("D4.432.123/0001-60")).toBe(true);
      expect(validarCNPJ("E5.678.901/0001-11")).toBe(true);
      expect(validarCNPJ("F6.789.012/0001-48")).toBe(true);
    });

    test("deve rejeitar CNPJs com dígitos hexadecimais inválidos (G-Z)", () => {
      expect(validarCNPJ("G1.222.333/0001-95")).toBe(false);
      expect(validarCNPJ("X2.874.175/0001-31")).toBe(false);
      expect(validarCNPJ("Z3222333000170")).toBe(false);
    });

    test("deve lançar erro ao gerar dígitos para bases com caracteres inválidos", () => {
      expect(() => gerarDigitosCNPJ("G12223330001")).toThrow(
        "A base do CNPJ deve ter 12 dígitos válidos"
      );
      expect(() => gerarDigitosCNPJ("X28741750001")).toThrow(
        "A base do CNPJ deve ter 12 dígitos válidos"
      );
      expect(() => gerarDigitosCNPJ("Z32223330001")).toThrow(
        "A base do CNPJ deve ter 12 dígitos válidos"
      );
    });
  });
});
