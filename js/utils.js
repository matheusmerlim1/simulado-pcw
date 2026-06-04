// Funções utilitárias puras, sem dependência de DOM ou estado.

/** Escapa caracteres especiais de HTML para exibição segura via innerHTML. */
export const escaparHtml = (texto) =>
  String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** Remove todos os espaços e deixa em minúsculas — usada na comparação de código. */
export const normalizar = (texto) => texto.replace(/\s+/g, '').toLowerCase();

/** Retorna uma NOVA cópia embaralhada do array (algoritmo de Fisher–Yates). */
export function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
