import { DIFICULDADES, TIPOS, provaDe } from './config.js';
import { embaralhar, normalizar } from './utils.js';

/**
 * Modelo do simulado: guarda o banco de questões, a seleção de filtros
 * e o progresso da rodada atual. Não toca no DOM — apenas regras e dados.
 */
export class Quiz {
  #banco;
  #topicos;

  constructor(banco) {
    this.#banco = banco;
    this.#topicos = [...new Set(banco.map((q) => q.topic))];
    this.resetarSelecao();

    this.questoes = [];
    this.indiceAtual = 0;
    this.acertos = 0;
    this.historico = [];
  }

  get topicos() { return this.#topicos; }
  get questaoAtual() { return this.questoes[this.indiceAtual]; }
  get totalQuestoes() { return this.questoes.length; }
  get percentual() {
    return this.totalQuestoes ? Math.round((this.acertos / this.totalQuestoes) * 100) : 0;
  }

  // ─────────────── Seleção de filtros ───────────────

  resetarSelecao() {
    this.provaSelecionada = 'all';
    this.dificuldades = new Set(DIFICULDADES);
    this.topicosSelecionados = new Set(this.#topicos);
    this.tipos = new Set(TIPOS);
  }

  /** Alterna um valor num conjunto, garantindo que ao menos um permaneça. */
  #alternar(conjunto, valor) {
    if (conjunto.has(valor)) {
      if (conjunto.size === 1) return false;
      conjunto.delete(valor);
    } else {
      conjunto.add(valor);
    }
    return true;
  }

  alternarDificuldade(d) { return this.#alternar(this.dificuldades, d); }
  alternarTipo(t) { return this.#alternar(this.tipos, t); }
  alternarTopico(t) { return this.#alternar(this.topicosSelecionados, t); }

  limparProva() { this.provaSelecionada = 'all'; }

  /** Tópicos que possuem ao menos uma questão da prova informada. */
  topicosDaProva(prova) {
    if (prova === 'all') return new Set(this.#topicos);
    return new Set(
      this.#topicos.filter((t) => this.#banco.some((q) => q.topic === t && provaDe(q) === prova)),
    );
  }

  /** Aplica um preset de prova (p1, p2 ou all) à seleção de filtros. */
  selecionarProva(prova) {
    this.provaSelecionada = prova;
    this.dificuldades = new Set(DIFICULDADES);
    this.tipos = new Set(TIPOS);
    this.topicosSelecionados = this.topicosDaProva(prova);
  }

  /** Seleciona um único tópico (coleção especial), com todas as dificuldades e tipos. */
  selecionarTopicoExclusivo(topico) {
    this.provaSelecionada = 'all';
    this.dificuldades = new Set(DIFICULDADES);
    this.tipos = new Set(TIPOS);
    this.topicosSelecionados = new Set([topico]);
  }

  // ─────────────── Contadores (para a tela inicial) ───────────────

  contarPorDificuldade(d) { return this.#banco.filter((q) => q.diff === d).length; }
  contarPorTipo(t) { return this.#banco.filter((q) => q.type === t).length; }
  contarPorTopico(t) { return this.#banco.filter((q) => q.topic === t).length; }
  contarPorProva(p) { return this.#banco.filter((q) => p === 'all' || provaDe(q) === p).length; }

  // ─────────────── Montagem do simulado ───────────────

  /** Filtra o banco pelos filtros atuais. */
  #questoesElegiveis() {
    return this.#banco.filter((q) =>
      this.dificuldades.has(q.diff) &&
      this.topicosSelecionados.has(q.topic) &&
      this.tipos.has(q.type) &&
      (this.provaSelecionada === 'all' || provaDe(q) === this.provaSelecionada),
    );
  }

  /** Intercala as questões por dificuldade (fácil → médio → difícil, repetindo). */
  #intercalarPorDificuldade(pool) {
    const grupos = {
      easy: embaralhar(pool.filter((q) => q.diff === 'easy')),
      medium: embaralhar(pool.filter((q) => q.diff === 'medium')),
      hard: embaralhar(pool.filter((q) => q.diff === 'hard')),
    };
    const ordem = DIFICULDADES.filter((d) => this.dificuldades.has(d) && grupos[d].length);
    const cursores = { easy: 0, medium: 0, hard: 0 };
    const resultado = [];
    while (resultado.length < pool.length) {
      let adicionou = false;
      for (const d of ordem) {
        if (cursores[d] < grupos[d].length) {
          resultado.push(grupos[d][cursores[d]++]);
          adicionou = true;
        }
      }
      if (!adicionou) break;
    }
    return resultado;
  }

  /** Monta a rodada com até `quantidade` questões. Retorna o total selecionado. */
  montar(quantidade) {
    const intercaladas = this.#intercalarPorDificuldade(this.#questoesElegiveis());
    this.questoes = intercaladas.slice(0, Math.min(quantidade, intercaladas.length));
    this.indiceAtual = 0;
    this.acertos = 0;
    this.historico = [];
    return this.questoes.length;
  }

  /** Refaz a mesma rodada, reembaralhando as questões. */
  refazer() {
    this.questoes = embaralhar(this.questoes);
    this.indiceAtual = 0;
    this.acertos = 0;
    this.historico = [];
  }

  // ─────────────── Respostas e progresso ───────────────

  /** Registra o resultado de uma questão no histórico e na pontuação. */
  registrar(questao, correta, extras = {}) {
    if (correta) this.acertos++;
    this.historico.push({ q: questao, correct: correta, type: questao.type, ...extras });
  }

  /** Verifica uma resposta de código: retorna { correta, faltando[] }. */
  verificarCodigo(questao, textoUsuario) {
    const usuario = normalizar(textoUsuario);
    const faltando = (questao.keywords || []).filter((k) => !usuario.includes(normalizar(k)));
    return { correta: faltando.length === 0, faltando };
  }

  /** Avança para a próxima questão. Retorna false quando a rodada acabou. */
  avancar() {
    this.indiceAtual++;
    return this.indiceAtual < this.questoes.length;
  }

  // ─────────────── Resultados ───────────────

  /** Desempenho agregado por dificuldade (somente as que apareceram). */
  desempenhoPorDificuldade() {
    return DIFICULDADES.map((d) => {
      const total = this.historico.filter((h) => h.q.diff === d).length;
      const acertos = this.historico.filter((h) => h.q.diff === d && h.correct).length;
      return {
        dificuldade: d,
        total,
        acertos,
        percentual: total ? Math.round((acertos / total) * 100) : 0,
      };
    }).filter((r) => r.total > 0);
  }

  contarHistoricoPorTipo(tipo) {
    return this.historico.filter((h) => h.q.type === tipo).length;
  }
}
