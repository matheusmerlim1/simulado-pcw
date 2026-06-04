# Simulado — Programação de Clientes Web

Simulado interativo de estudo para a disciplina **Programação de Clientes Web** (CEFET/RJ).
Banco com questões de múltipla escolha, verdadeiro/falso e escrita de código, baseadas nos
slides e provas da disciplina.

## Funcionalidades

- **Modos de prova**: P1, P2 e PF (Prova Final) — cada botão seleciona o conteúdo da prova;
  ajuste dificuldade/quantidade e clique em **Iniciar Simulado**.
- **Filtros**: dificuldade (fácil/médio/difícil), tópico e tipo de questão.
- **Três tipos de questão**: múltipla escolha, verdadeiro/falso e "escreva o código"
  (verificação por elementos obrigatórios).
- **Resultados**: percentual, desempenho por dificuldade e revisão questão a questão.

## Conteúdo

- **P1**: revisão HTML/CSS, introdução ao ES, tipos, escopo, arrays, JSON, módulos (ESM),
  DOM, eventos, storage, arrow functions, operadores (rest/spread), POO e exceções.
- **P2**: assincronicidade e promessas, fetch/AJAX, async/await, REST e os padrões MVC e MVP.

## Estrutura

```
Site QUIZ/
├── index.html          # marcação da interface
├── css/
│   └── styles.css      # estilos
└── js/
    ├── banco.js        # banco de questões (dados)
    ├── config.js       # dificuldades, rótulos e mapeamento por prova
    ├── utils.js        # funções utilitárias puras
    ├── Quiz.js         # modelo: estado, filtros, pontuação (sem DOM)
    ├── Visao.js        # visão: renderização e interação com o DOM
    └── main.js         # ponto de entrada: liga modelo, visão e eventos
```

## Como executar

O projeto usa **módulos ESM** (`<script type="module">`), então precisa ser servido por HTTP
(não funciona abrindo o arquivo direto via `file://`):

- **VS Code**: extensão *Live Server* → botão **Go Live**; ou
- **Terminal** (dentro da pasta do projeto):

  ```bash
  npx serve
  ```

Depois acesse o endereço indicado (ex.: `http://localhost:3000`).
