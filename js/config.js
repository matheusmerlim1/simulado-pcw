// Configuração da disciplina: dificuldades, tipos e mapeamento de conteúdo por prova.

export const DIFICULDADES = ['easy', 'medium', 'hard'];
export const TIPOS = ['mc', 'tf', 'code'];

export const ROTULO_DIFICULDADE = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
export const ROTULO_DIFICULDADE_ICONE = { easy: '🟢 Fácil', medium: '🟡 Médio', hard: '🔴 Difícil' };

// ── Mapeamento de conteúdo por prova ──
// P1 (prova de 24/04, até a aula06-10-04): fundamentos de JS + revisão HTML/CSS.
// P2 (foco na aula11-29_05): assincronicidade, fetch/AJAX, async/await, MVC e MVP.
const TOPICOS_P1 = new Set([
  'Introdução', 'Tipos', 'Escopo', 'JS Básico', 'Arrays', 'JSON', 'Módulos',
  'DOM', 'Eventos', 'Storage', 'Arrow Functions', 'Operadores', 'Classes',
  'Exceções', 'HTML/CSS',
]);
const TOPICOS_P2 = new Set(['Promise/Fetch', 'Async/Await', 'REST/HTTP', 'MVC/MVP']);

const MARCADORES_P2 = /fetch|async|await|promise|\.then|controladora|apresentador|\bvisao\b|\bvisão\b|\bmvc\b|\bmvp\b/;

/**
 * Determina a qual prova ('p1' ou 'p2') uma questão pertence.
 * Tópicos diretos são resolvidos pelo conjunto; questões "Estilo Prova"
 * misturam conteúdo e são classificadas pelo que de fato abordam.
 */
export function provaDe(questao) {
  if (TOPICOS_P1.has(questao.topic)) return 'p1';
  if (TOPICOS_P2.has(questao.topic)) return 'p2';
  const texto = [
    questao.text,
    questao.answer || '',
    (questao.keywords || []).join(' '),
    questao.exp || '',
  ].join(' ').toLowerCase();
  return MARCADORES_P2.test(texto) ? 'p2' : 'p1';
}
