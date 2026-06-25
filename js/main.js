// Ponto de entrada: instancia o modelo e a visão e liga os eventos da interface.
import { BANCO } from './banco.js';
import { Quiz } from './Quiz.js';
import { Visao } from './Visao.js';

const quiz = new Quiz(BANCO);
const visao = new Visao(quiz);

// ─────────────── Ações (controladora) ───────────────

function iniciarSimulado() {
  const total = quiz.montar(visao.quantidadeSelecionada);
  if (total === 0) return;
  visao.mostrarPlacar(true);
  visao.mostrarTela('quiz');
  visao.renderizarQuestao();
}

// Coleção especial: seleciona só aquele tópico e já inicia o simulado.
function iniciarColecao(topico) {
  quiz.selecionarTopicoExclusivo(topico);
  visao.sincronizarSelecao();
  iniciarSimulado();
}

// Selecionar uma prova apenas define o conteúdo; o usuário ainda pode ajustar
// dificuldade/quantidade e só então clicar em "Iniciar Simulado".
function selecionarProva(prova) {
  quiz.selecionarProva(prova);
  visao.sincronizarSelecao();
  document.getElementById('btn-start').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function proximaQuestao() {
  if (quiz.avancar()) visao.renderizarQuestao();
  else visao.renderizarResultados();
}

function voltarParaInicio() {
  quiz.resetarSelecao();
  visao.mostrarPlacar(false);
  visao.sincronizarSelecao();
  visao.mostrarTela('home');
}

function refazerSimulado() {
  quiz.refazer();
  visao.mostrarTela('quiz');
  visao.renderizarQuestao();
  visao.atualizarPlacar();
}

// Aplica uma mudança de filtro e ressincroniza a interface.
// Mexer nos TÓPICOS desfaz o preset de prova; dificuldade/tipo o preservam,
// permitindo configurar a prova selecionada antes de iniciar.
function aplicarFiltro(acao, desfazProva = false) {
  if (desfazProva) quiz.limparProva();
  acao();
  visao.sincronizarSelecao();
}

// ─────────────── Ligação de eventos ───────────────

function ligarEventos() {
  // Cartas de prova (delegação).
  document.querySelector('.prova-grid').addEventListener('click', (e) => {
    const carta = e.target.closest('.prova-card');
    if (carta) selecionarProva(carta.dataset.prova);
  });

  // Coleções especiais (delegação): iniciam o simulado direto naquele tópico.
  document.querySelector('.colecao-grid').addEventListener('click', (e) => {
    const carta = e.target.closest('.colecao-card');
    if (carta) iniciarColecao(carta.dataset.colecao);
  });

  // Filtros de dificuldade e tipo (preservam o preset de prova).
  document.querySelector('.diff-grid').addEventListener('click', (e) => {
    const carta = e.target.closest('.diff-card');
    if (carta) aplicarFiltro(() => quiz.alternarDificuldade(carta.dataset.diff));
  });
  document.querySelector('.type-grid').addEventListener('click', (e) => {
    const carta = e.target.closest('.type-card');
    if (carta) aplicarFiltro(() => quiz.alternarTipo(carta.dataset.type));
  });
  // Mexer nos tópicos vira modo personalizado (desfaz o preset de prova).
  document.getElementById('topics-grid').addEventListener('click', (e) => {
    const pilula = e.target.closest('.topic-pill');
    if (pilula) aplicarFiltro(() => quiz.alternarTopico(pilula.dataset.topic), true);
  });
  // Marcar / limpar todos os tópicos de uma vez.
  document.getElementById('btn-topics-all').addEventListener('click',
    () => aplicarFiltro(() => quiz.selecionarTodosTopicos(), true));
  document.getElementById('btn-topics-none').addEventListener('click',
    () => aplicarFiltro(() => quiz.limparTopicos(), true));

  // Botões fixos.
  document.getElementById('btn-start').addEventListener('click', iniciarSimulado);
  document.getElementById('btn-next').addEventListener('click', proximaQuestao);
  document.getElementById('btn-check').addEventListener('click', () => visao.verificarCodigoAtual());
  document.getElementById('btn-quiz-home').addEventListener('click', voltarParaInicio);
  document.getElementById('btn-quiz-home-bottom').addEventListener('click', voltarParaInicio);
  document.getElementById('btn-home').addEventListener('click', voltarParaInicio);
  document.getElementById('btn-retry').addEventListener('click', refazerSimulado);
  document.querySelector('.review-toggle').addEventListener('click', () => visao.alternarRevisao());
}

// ─────────────── Inicialização ───────────────
// O script é carregado como módulo (defer implícito), então o DOM já existe.
visao.montarTelaInicial();
ligarEventos();
