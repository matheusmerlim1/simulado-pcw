import { escaparHtml, embaralhar } from './utils.js';
import { TOPICOS_META } from './banco.js';
import { ROTULO_DIFICULDADE, ROTULO_DIFICULDADE_ICONE } from './config.js';

const LETRAS = ['A', 'B', 'C', 'D', 'E'];

/**
 * Camada de apresentação: renderiza as telas e cuida da interação com
 * cada questão. Conhece o modelo (Quiz) para ler dados e registrar respostas.
 */
export class Visao {
  #quiz;

  // Estado transitório da questão em exibição.
  #respondida = false;
  #posCorretaMc = 0;
  #respostasVF = {};
  #vfFinalizado = false;

  constructor(quiz) {
    this.#quiz = quiz;
  }

  #id(idElemento) { return document.getElementById(idElemento); }

  // ─────────────── Tela inicial ───────────────

  /** Preenche os contadores e monta a grade de tópicos. */
  montarTelaInicial() {
    const q = this.#quiz;
    this.#id('cnt-easy').textContent = q.contarPorDificuldade('easy') + ' questões';
    this.#id('cnt-medium').textContent = q.contarPorDificuldade('medium') + ' questões';
    this.#id('cnt-hard').textContent = q.contarPorDificuldade('hard') + ' questões';
    this.#id('cnt-mc').textContent = q.contarPorTipo('mc') + ' questões';
    this.#id('cnt-tf').textContent = q.contarPorTipo('tf') + ' questões';
    this.#id('cnt-code').textContent = q.contarPorTipo('code') + ' questões';
    this.#id('cnt-p1').textContent = q.contarPorProva('p1') + ' questões';
    this.#id('cnt-p2').textContent = q.contarPorProva('p2') + ' questões';
    this.#id('cnt-pf').textContent = q.contarPorProva('all') + ' questões';
    this.#id('cnt-col-prova').textContent = q.contarPorTopico('Prova 2026-1') + ' questões';
    this.#id('cnt-col-async').textContent = q.contarPorTopico('Async⇄Promise') + ' questões';
    this.#id('cnt-col-mvp').textContent = q.contarPorTopico('MVC/MVP') + ' questões';

    const grade = this.#id('topics-grid');
    grade.replaceChildren();
    q.topicos.forEach((topico) => {
      const pilula = document.createElement('div');
      pilula.className = 'topic-pill on';
      pilula.dataset.topic = topico;
      pilula.innerHTML = `
        <div class="tp-head">
          <span class="tp-dot"></span>
          <span class="tp-name">${escaparHtml(topico)}</span>
          <span class="tp-count">${q.contarPorTopico(topico)}</span>
        </div>
        <div class="tp-summary">${escaparHtml(TOPICOS_META[topico] || '')}</div>`;
      grade.append(pilula);
    });
    this.sincronizarSelecao();
  }

  /** Reflete o estado de seleção do modelo nas cartas/pílulas. */
  sincronizarSelecao() {
    const q = this.#quiz;
    document.querySelectorAll('.diff-card').forEach((carta) => {
      carta.classList.toggle('active', q.dificuldades.has(carta.dataset.diff));
    });
    document.querySelectorAll('.type-card').forEach((carta) => {
      carta.classList.toggle('active', q.tipos.has(carta.dataset.type));
    });
    document.querySelectorAll('#topics-grid .topic-pill').forEach((pilula) => {
      pilula.classList.toggle('on', q.topicosSelecionados.has(pilula.dataset.topic));
    });
    document.querySelectorAll('.prova-card').forEach((carta) => {
      carta.classList.toggle('active', carta.dataset.prova === q.provaSelecionada);
    });
  }

  get quantidadeSelecionada() {
    return parseInt(this.#id('qty-select').value, 10);
  }

  // ─────────────── Navegação de telas ───────────────

  mostrarTela(idTela) {
    ['home', 'quiz', 'results'].forEach((tela) => {
      this.#id(tela).style.display = tela === idTela ? 'block' : 'none';
    });
  }

  mostrarPlacar(visivel) {
    this.#id('live-score').style.display = visivel ? 'block' : 'none';
  }

  atualizarPlacar() {
    this.#id('ls-val').textContent = `${this.#quiz.acertos}/${this.#quiz.totalQuestoes}`;
  }

  // ─────────────── Questão atual ───────────────

  renderizarQuestao() {
    const q = this.#quiz.questaoAtual;
    this.#respondida = false;
    this.#respostasVF = {};
    this.#vfFinalizado = false;

    this.#id('q-counter').textContent = `Questão ${this.#quiz.indiceAtual + 1} / ${this.#quiz.totalQuestoes}`;
    this.#id('q-tag-topic').textContent = q.topic;
    const tagDif = this.#id('q-tag-diff');
    tagDif.textContent = ROTULO_DIFICULDADE[q.diff];
    tagDif.className = `tag tag-${q.diff}`;

    const ehCodigo = q.type === 'code';
    this.#id('q-tag-code').style.display = ehCodigo ? 'inline-block' : 'none';
    this.#id('q-type-badge').style.display = ehCodigo ? 'inline-block' : 'none';
    this.#id('q-stripe').className = ehCodigo ? 'q-stripe code' : `q-stripe ${q.diff}`;
    this.#id('prog-fill').style.width = `${(this.#quiz.indiceAtual / this.#quiz.totalQuestoes) * 100}%`;
    this.#id('q-text').textContent = q.text;

    const blocoCodigo = this.#id('q-code');
    if (q.code) {
      blocoCodigo.textContent = q.code;
      blocoCodigo.style.display = 'block';
    } else {
      blocoCodigo.style.display = 'none';
    }

    // Reinicia áreas de resposta.
    this.#id('feedback').className = 'feedback';
    this.#id('btn-next').className = 'btn-next';
    this.#id('options-list').style.display = 'none';
    this.#id('options-list').replaceChildren();
    this.#id('tf-list').style.display = 'none';
    this.#id('tf-progress').style.display = 'none';
    this.#id('code-input-area').style.display = 'none';

    if (q.type === 'mc') this.#renderizarMultiplaEscolha(q);
    else if (q.type === 'tf') this.#renderizarVerdadeiroFalso(q);
    else this.#renderizarCodigo(q);
  }

  // ---- Múltipla escolha ----

  #renderizarMultiplaEscolha(q) {
    const indices = embaralhar(q.options.map((_, i) => i));
    this.#posCorretaMc = indices.indexOf(q.answer);
    const lista = this.#id('options-list');
    lista.style.display = 'flex';
    lista.replaceChildren();
    indices.forEach((indiceOriginal, posicao) => {
      const item = document.createElement('li');
      const botao = document.createElement('button');
      botao.className = 'opt';
      botao.innerHTML = `<span class="opt-ltr">${LETRAS[posicao]}</span><span>${escaparHtml(q.options[indiceOriginal])}</span>`;
      botao.addEventListener('click', () => this.#escolherMultiplaEscolha(posicao, q));
      item.append(botao);
      lista.append(item);
    });
  }

  #escolherMultiplaEscolha(posicao, q) {
    if (this.#respondida) return;
    this.#respondida = true;
    const botoes = document.querySelectorAll('.opt');
    botoes.forEach((b) => { b.disabled = true; });
    const acertou = posicao === this.#posCorretaMc;
    botoes[posicao].classList.add(acertou ? 'correct' : 'wrong');
    if (!acertou) botoes[this.#posCorretaMc].classList.add('reveal');
    this.#quiz.registrar(q, acertou);
    this.#mostrarFeedback(acertou, q.exp);
  }

  // ---- Verdadeiro / Falso ----

  #renderizarVerdadeiroFalso(q) {
    const lista = this.#id('tf-list');
    const progresso = this.#id('tf-progress');
    lista.style.display = 'flex';
    lista.replaceChildren();
    progresso.style.display = 'block';
    progresso.textContent = `0 / ${q.statements.length} respondidas`;

    const ordem = embaralhar(q.statements.map((_, i) => i));
    ordem.forEach((indiceOriginal, posicao) => {
      const afirmacao = q.statements[indiceOriginal];
      const item = document.createElement('div');
      item.className = 'tf-item';
      item.id = `tfi-${posicao}`;
      item.dataset.origIdx = indiceOriginal;
      item.innerHTML = `<span class="tf-stmt">${escaparHtml(afirmacao.text)}</span>
        <div class="tf-btns">
          <button class="tf-btn" id="tfV${posicao}">V</button>
          <button class="tf-btn" id="tfF${posicao}">F</button>
        </div>`;
      item.querySelector(`#tfV${posicao}`).addEventListener('click', (e) => this.#escolherVF(posicao, true, e));
      item.querySelector(`#tfF${posicao}`).addEventListener('click', (e) => this.#escolherVF(posicao, false, e));
      lista.append(item);
    });
  }

  #escolherVF(posicao, valor, evento) {
    evento.stopPropagation();
    if (this.#respondida) return;
    const q = this.#quiz.questaoAtual;
    const botaoV = this.#id(`tfV${posicao}`);
    const botaoF = this.#id(`tfF${posicao}`);
    botaoV.classList.remove('sel-v');
    botaoF.classList.remove('sel-f');
    (valor ? botaoV : botaoF).classList.add(valor ? 'sel-v' : 'sel-f');
    this.#respostasVF[posicao] = valor;

    const respondidas = Object.keys(this.#respostasVF).length;
    this.#id('tf-progress').textContent = `${respondidas} / ${q.statements.length} respondidas`;

    if (respondidas === q.statements.length && !this.#vfFinalizado) {
      this.#finalizarVF(q);
    }
  }

  #finalizarVF(q) {
    this.#vfFinalizado = true;
    this.#respondida = true;
    let tudoCerto = true;
    document.querySelectorAll('.tf-item').forEach((item) => {
      const posicao = parseInt(item.id.replace('tfi-', ''), 10);
      const indiceOriginal = parseInt(item.dataset.origIdx, 10);
      const correta = q.statements[indiceOriginal].answer;
      const resposta = this.#respostasVF[posicao];
      const botaoV = this.#id(`tfV${posicao}`);
      const botaoF = this.#id(`tfF${posicao}`);
      botaoV.disabled = true;
      botaoF.disabled = true;
      if (resposta === correta) {
        (correta ? botaoV : botaoF).classList.add('right');
        item.classList.add('resolved-ok');
      } else {
        tudoCerto = false;
        (correta ? botaoF : botaoV).classList.add('wrong-ans');
        (correta ? botaoV : botaoF).classList.add('right');
        item.classList.add('resolved-err');
      }
    });
    this.#quiz.registrar(q, tudoCerto);
    this.#mostrarFeedback(tudoCerto, q.exp);
  }

  // ---- Escreva o código ----

  #renderizarCodigo(q) {
    this.#id('code-input-area').style.display = 'block';
    const area = this.#id('code-textarea');
    area.value = '';
    area.className = 'code-input';
    this.#id('diff-tokens').className = 'diff-tokens';
    this.#id('diff-tokens').replaceChildren();
    this.#id('btn-check').disabled = false;
    area.focus();
    area.onkeydown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const inicio = area.selectionStart;
        const fim = area.selectionEnd;
        area.value = area.value.substring(0, inicio) + '  ' + area.value.substring(fim);
        area.selectionStart = area.selectionEnd = inicio + 2;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') this.verificarCodigoAtual();
    };
  }

  /** Verifica a resposta de código da questão atual (botão ou Ctrl+Enter). */
  verificarCodigoAtual() {
    if (this.#respondida) return;
    const q = this.#quiz.questaoAtual;
    if (q.type !== 'code') return;
    const textoUsuario = this.#id('code-textarea').value;
    const { correta, faltando } = this.#quiz.verificarCodigo(q, textoUsuario);
    this.#respondida = true;

    const area = this.#id('code-textarea');
    area.className = 'code-input ' + (correta ? 'ok' : 'err');
    this.#id('btn-check').disabled = true;

    const tokens = this.#id('diff-tokens');
    tokens.className = 'diff-tokens show';
    if (!correta) {
      tokens.innerHTML =
        '<div class="diff-line" style="color:var(--muted);margin-bottom:6px">Elementos obrigatórios não encontrados:</div>' +
        faltando.map((k) => `<div class="diff-line diff-rem">✗ ${escaparHtml(k)}</div>`).join('');
    } else {
      tokens.innerHTML = '<div class="diff-line diff-add">✓ Todos os elementos necessários presentes</div>';
    }

    this.#quiz.registrar(q, correta, { userCode: textoUsuario });
    this.#mostrarFeedback(correta, q.exp, q.answer);
  }

  // ---- Feedback ----

  #mostrarFeedback(acertou, explicacao, codigoReferencia) {
    const feedback = this.#id('feedback');
    this.#id('fb-head').textContent = acertou ? '✓ Correto!' : '✗ Incorreto';
    let corpo = `<span>${escaparHtml(explicacao)}</span>`;
    if (codigoReferencia) {
      corpo += `<div style="margin-top:10px;font-size:11px;color:var(--muted);font-family:'IBM Plex Mono',monospace;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">Resposta de referência:</div>
        <pre style="background:var(--code-bg);border:1px solid var(--border);border-radius:4px;padding:12px;font-family:'IBM Plex Mono',monospace;font-size:11.5px;line-height:1.7;color:#b8c4e8;overflow-x:auto;white-space:pre">${escaparHtml(codigoReferencia)}</pre>`;
    }
    this.#id('fb-body').innerHTML = corpo;
    feedback.className = `feedback show ${acertou ? 'ok' : 'err'}`;
    this.#id('btn-next').className = 'btn-next show';
    this.atualizarPlacar();
  }

  // ─────────────── Resultados ───────────────

  renderizarResultados() {
    const q = this.#quiz;
    this.mostrarTela('results');
    this.#id('prog-fill').style.width = '100%';

    const pct = q.percentual;
    this.#id('res-pct').textContent = pct + '%';
    this.#id('res-frac').textContent = `${q.acertos} / ${q.totalQuestoes}`;

    const arco = this.#id('ring-arc');
    const circunferencia = 2 * Math.PI * 63;
    const cor = pct >= 80 ? '#3ddc84' : pct >= 60 ? '#f5c842' : '#ff4f6a';
    arco.setAttribute('stroke', cor);
    arco.setAttribute('stroke-dasharray', circunferencia);
    arco.setAttribute('stroke-dashoffset', circunferencia);
    setTimeout(() => arco.setAttribute('stroke-dashoffset', circunferencia * (1 - pct / 100)), 100);
    this.#id('res-pct').style.color = cor;

    const [titulo, mensagem] =
      pct >= 90 ? ['Excelente!', 'Domínio completo. Você está pronto para a prova.'] :
      pct >= 70 ? ['Muito bom!', 'Revise os pontos com erro e reforce.'] :
      pct >= 50 ? ['Regular', 'Revise o material e tente de novo.'] :
                  ['Continue estudando', 'Releia os slides com calma.'];
    this.#id('res-title').textContent = titulo;
    this.#id('res-msg').textContent = mensagem;

    const breakdown = this.#id('diff-breakdown');
    breakdown.innerHTML = q.desempenhoPorDificuldade()
      .map((r) => `<div class="db-card ${r.dificuldade}"><div class="db-label">${ROTULO_DIFICULDADE[r.dificuldade]}</div><div class="db-score">${r.acertos}/${r.total}</div><div class="db-pct">${r.percentual}%</div></div>`)
      .join('');

    const totalCodigo = q.contarHistoricoPorTipo('code');
    const erros = q.totalQuestoes - q.acertos;
    this.#id('res-table').innerHTML = `
      <div class="rt-row"><span class="rt-label">Acertos</span><span class="rt-val g">${q.acertos}</span></div>
      <div class="rt-row"><span class="rt-label">Erros</span><span class="rt-val r">${erros}</span></div>
      <div class="rt-row"><span class="rt-label">Questões de código</span><span class="rt-val" style="color:var(--purple)">${totalCodigo}</span></div>
      <div class="rt-row"><span class="rt-label">Aproveitamento</span><span class="rt-val ${pct >= 70 ? 'g' : pct >= 50 ? 'y' : 'r'}">${pct}%</span></div>`;

    this.#montarRevisao();
  }

  #montarRevisao() {
    const lista = this.#id('review-list');
    lista.replaceChildren();
    this.#quiz.historico.forEach((h, i) => {
      const item = document.createElement('div');
      item.className = `rev-item ${h.correct ? 'ok' : 'err'}`;
      const rotuloDif = ROTULO_DIFICULDADE_ICONE[h.q.diff];
      const tagTipo = h.q.type === 'code' ? '<span class="tag tag-code" style="font-size:9px">✎ Código</span>' : '';
      let extra = '';
      if (h.q.type === 'code' && !h.correct && h.userCode) {
        extra = `<div class="rev-code">Sua resposta:\n${escaparHtml(h.userCode)}</div>`;
      }
      if (h.q.type === 'code') {
        extra += `<div class="rev-code">Referência:\n${escaparHtml(h.q.answer)}</div>`;
      }
      item.innerHTML = `<div class="rev-q">${i + 1}. ${escaparHtml(h.q.text)}</div>
        <div class="rev-meta"><span class="tag tag-topic">${escaparHtml(h.q.topic)}</span><span class="tag tag-${h.q.diff}">${rotuloDif}</span>${tagTipo}
          <span style="font-family:monospace;font-size:10px;color:${h.correct ? 'var(--green)' : 'var(--red)'}">${h.correct ? '✓ Correto' : '✗ Incorreto'}</span>
        </div>
        <div class="rev-exp">${escaparHtml(h.q.exp)}</div>${extra}`;
      lista.append(item);
    });
  }

  alternarRevisao() {
    const lista = this.#id('review-list');
    const botao = document.querySelector('.review-toggle');
    const aberta = lista.style.display === 'block';
    lista.style.display = aberta ? 'none' : 'block';
    botao.textContent = aberta ? 'Ver revisão ▾' : 'Ocultar revisão ▴';
  }
}
