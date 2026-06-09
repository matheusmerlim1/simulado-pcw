// Banco de questões do simulado de Programação de Clientes Web.
// Cada questão: { topic, diff(easy|medium|hard), type(mc|tf|code), text, exp, ... }
//  - mc:   options[], answer(índice)
//  - tf:   statements[{ text, answer:boolean }]
//  - code: answer(referência), keywords[] (trechos obrigatórios)

export const TOPICOS_META = {
  "Tipos":           "Tipos primitivos (string, number, bigint, boolean, null, undefined, symbol), typeof, invólucros (wrappers) e comportamento de falsy values.",
  "Escopo":          "var vs let vs const, hoisting, modo estrito (use strict), objeto global vs escopo global, ES5 vs ES6+.",
  "DOM":             "querySelector, createElement, append, innerHTML, classList, replaceChildren, reflow e boas práticas de manipulação.",
  "Eventos":         "addEventListener, removeEventListener, event.preventDefault, stopPropagation, DOMContentLoaded, load, CustomEvent.",
  "Classes":         "Sintaxe class, constructor, herança (extends, super), atributos e métodos privados (#), static, getters e setters.",
  "Módulos":         "ESM: export, export default, import nomeado, import default, import namespace (as *), escopo de módulo.",
  "Storage":         "sessionStorage vs localStorage, interface Storage (getItem, setItem, removeItem, clear), JSON.stringify/parse.",
  "Arrays":          "map, filter, find, findIndex, forEach, some, every, from, spread, operações de conjunto (união, interseção, diferença).",
  "Exceções":        "try/catch/finally, throw, classe Error, criar exceções customizadas (extends Error), this.name, this.message.",
  "Operadores":      "Spread/rest (...), desestruturação de arrays e objetos, optional chaining (?.), nullish coalescing (??), super.",
  "Promise/Fetch":   "Estados da Promise (pending/fulfilled/rejected), .then/.catch/.finally, Promise.all/race/allSettled, fetch API, response.ok.",
  "Async/Await":     "async function, await, try/catch com async, diferença para .then(), comportamento de retorno implícito como Promise.",
  "REST/HTTP":       "Métodos HTTP, códigos de status, cabeçalhos, REST vs RESTful, HATEOS, versionamento de API, CORS.",
  "Arrow Functions": "Sintaxe com e sem corpo, this léxico, sem arguments, sem new, bind() não funciona, quando usar e não usar.",
  "JS Básico":       "Funções, callbacks, lambdas, closures, prototype, call/apply/bind, herança com prototype, objetos, arrays ES5.",
  "MVC/MVP":         "Separação de responsabilidades: Modelo, Visão e Controladora/Apresentador. No MVC a Controladora é o ponto de entrada e instancia Modelo+Visão; no MVP a Visão instancia o Apresentador passando this. bind(this), callbacks e Serviço.",
  "Estilo Prova":    "★ Questões no formato exato das provas: exceção de validação (Q1), classe com #privados + validar (Q2a), cadastro+localStorage (Q2b), listagem DOM map/filter (Q3), completar lacunas (Q5).",
  "HTML/CSS":        "Revisão de HTML e CSS: estrutura de tabela (thead/tbody/tfoot), formulários (label/for, input, select), validação nativa (required, minlength, maxlength, min, max), <dialog>/showModal, <output>, <template> e seletores CSS.",
  "JSON":            "Formato JSON: JSON.stringify e JSON.parse, serialização de objetos, chaves entre aspas duplas, perda de métodos/prototype ao serializar e o padrão de leitura com fallback || '[]'.",
};

export const BANCO = [

// ══════════════════ TIPOS ══════════════════
{topic:"Tipos",diff:"easy",type:"mc",
text:"Quantos tipos primitivos existem no JavaScript ES6+?",
options:["5","6","7","8"],
answer:2,
exp:"São 7: string, number, bigint, boolean, null, undefined e symbol (ES6+). Além desses, há o tipo object."},

{topic:"Tipos",diff:"easy",type:"mc",
text:"O que retorna typeof null em JavaScript?",
options:['"null"','"undefined"','"object"','"boolean"'],
answer:2,
exp:'typeof null retorna "object" — bug histórico do JavaScript 1, mantido por compatibilidade. null deveria retornar "null".'},

{topic:"Tipos",diff:"medium",type:"mc",
text:"Qual das opções a seguir NÃO avalia para false (falsy) em JavaScript?",
options:["0","\"\"","null","\"false\""],
answer:3,
exp:'"false" é uma string não-vazia, portanto truthy. Falsy values: 0, -0, NaN, null, undefined, "" e false.'},

{topic:"Tipos",diff:"medium",type:"mc",
text:"O que retorna typeof new Number(37)?",
options:['"number"','"object"','"Number"','"function"'],
answer:1,
exp:'new Number(37) cria um objeto invólucro (wrapper), então typeof retorna "object". Sem new: typeof Number(37) retorna "number".'},

{topic:"Tipos",diff:"hard",type:"mc",
text:"Qual a diferença entre null e undefined?",
options:["São idênticos e intercambiáveis","null indica valor nulo/objeto inexistente; undefined indica ausência de qualquer valor","undefined é para variáveis; null é para funções","null é falsy; undefined é truthy"],
answer:1,
exp:"null = valor nulo/vazio, como um objeto inexistente. undefined = ausência de qualquer valor — padrão de variáveis não inicializadas, parâmetros omitidos e propriedades inexistentes."},

{topic:"Tipos",diff:"medium",type:"tf",
text:"Assinale V ou F sobre tipos em JavaScript.",
statements:[
  {text:"typeof NaN retorna \"number\".",answer:true},
  {text:"null e undefined são considerados o mesmo tipo pelo operador ===.",answer:false},
  {text:"Symbol() === Symbol() retorna false, pois cada Symbol é único.",answer:true},
  {text:"O tipo bigint permite representar inteiros arbitrariamente grandes.",answer:true}
],
exp:'NaN é do tipo number — typeof NaN === "number". null === undefined é false (tipos diferentes); null == undefined é true. Cada Symbol() é único por definição.'},

{topic:"Tipos",diff:"easy",type:"code",
text:"Escreva uma expressão que verifique se a variável x NÃO é um número (use a função correta para isso, não typeof).",
answer:"isNaN(x)",
keywords:["isNaN"],
exp:"isNaN(x) retorna true se x não for um número. Na prova, o erro comum foi usar !Number(x) em vez de isNaN(x)."},

// ══════════════════ ESCOPO ══════════════════
{topic:"Escopo",diff:"easy",type:"mc",
text:"Quais são os escopos disponíveis no JavaScript ES5?",
options:["global, função, bloco","global, função, catch e with (sem strict mode)","global e função apenas","global, bloco e módulo"],
answer:1,
exp:"ES5: global, função, catch e with (apenas sem 'use strict'). O escopo de bloco foi introduzido no ES6 com let e const."},

{topic:"Escopo",diff:"medium",type:"mc",
text:"Dado: if(true){ var x=1; const y=2; } — o que ocorre ao executar console.log(x) e console.log(y) fora do bloco?",
options:["Imprime 1 e 2","Imprime 1, depois ReferenceError para y","ReferenceError para x","undefined para ambos"],
answer:1,
exp:"var tem escopo de função/global — x=1 é acessível. const tem escopo de bloco — y causa ReferenceError fora do bloco."},

{topic:"Escopo",diff:"medium",type:"mc",
text:"O que é hoisting em JavaScript?",
options:["Otimização do motor JS","Elevação automática de declarações var e funções para o topo do escopo, sem as inicializações","Conversão implícita de tipos","Comportamento exclusivo do strict mode"],
answer:1,
exp:"Hoisting eleva declarações (não inicializações) para o topo do escopo. Ocorre com var e declarações de funções. let/const são içados mas ficam em temporal dead zone."},

{topic:"Escopo",diff:"hard",type:"mc",
text:"Ao declarar const x = 1 no escopo global de um script comum, o que ocorre?",
options:["x fica no escopo global E no objeto global (window/self)","x fica no escopo global mas NÃO no objeto global","x fica apenas no objeto global","Causa erro em modo não-estrito"],
answer:1,
exp:"let e const declaradas globalmente ficam no escopo global mas NÃO no objeto global. var declarada globalmente fica em ambos. Assim, self.x retorna undefined para const/let."},

{topic:"Escopo",diff:"medium",type:"tf",
text:"Assinale V ou F sobre escopo em JavaScript.",
statements:[
  {text:"'use strict' pode ser declarado dentro de uma função, afetando apenas aquela função.",answer:true},
  {text:"Em ES6+, variáveis declaradas com let em um bloco if são visíveis fora do bloco.",answer:false},
  {text:"O objeto globalThis referencia o objeto global de forma consistente em ambientes diferentes.",answer:true},
  {text:"Uma variável var declarada no escopo global é acessível como propriedade de window no navegador.",answer:true}
],
exp:"'use strict' pode coexistir com modo normal — pode ser declarado em uma função. let/const têm escopo de bloco. globalThis foi introduzido no ES2020."},

{topic:"Escopo",diff:"hard",type:"code",
text:"Escreva como ativar o modo estrito (strict mode) em um arquivo JavaScript inteiro.",
answer:"'use strict';",
keywords:["use strict"],
exp:"'use strict'; deve ser a primeira instrução do arquivo ou da função. Ativa a forma mais rigorosa do JavaScript, eliminando erros silenciosos."},

// ══════════════════ DOM ══════════════════
{topic:"DOM",diff:"easy",type:"mc",
text:"Qual método retorna o PRIMEIRO elemento que corresponde a um seletor CSS?",
options:["getElementsByClassName()","querySelectorAll()","querySelector()","getElementById()"],
answer:2,
exp:"querySelector() retorna o primeiro match. querySelectorAll() retorna NodeList com todos. getElementById() busca só por id."},

{topic:"DOM",diff:"easy",type:"mc",
text:"Por que innerHTML é desaconselhado para inserir conteúdo externo (de usuários)?",
options:["É incompatível com o Chrome","É lento e sujeito a ataques XSS (injeção de script)","Só aceita texto simples","Não permite event listeners"],
answer:1,
exp:"innerHTML é lento (re-parse completo) e sujeito a XSS. Para conteúdo externo: sanitize com DOMPurify e adicione como fragmento para evitar reflow."},

{topic:"DOM",diff:"medium",type:"mc",
text:"O que faz tbody.replaceChildren() sem argumentos?",
options:["Substitui o tbody por um novo elemento","Remove todos os filhos do tbody","Adiciona novos filhos mantendo os existentes","Clona o tbody"],
answer:1,
exp:"replaceChildren() sem argumentos remove todos os filhos. Com argumentos, substitui os filhos pelos nós passados. Muito usado para limpar tabelas antes de redesenhar."},

{topic:"DOM",diff:"medium",type:"mc",
text:"Qual é a diferença entre append() e appendChild()?",
options:["São idênticos","append() aceita Nodes e strings; appendChild() aceita apenas Nodes","appendChild() é mais rápido","append() só funciona com textos"],
answer:1,
exp:"append() aceita Node e DOMString (string de texto). appendChild() só aceita Node. Na prova, o erro foi usar li.appendChild(texto) onde texto era uma string."},

{topic:"DOM",diff:"hard",type:"mc",
text:"Para alternar a classe CSS 'ativo' num elemento div.ativo específico entre várias divs, o código correto é:",
options:["document.querySelector('div').classList.toggle('ativo')","document.querySelector('div.ativo').classList.toggle('ativo')","document.getElementById('div').classList.add('ativo')","document.querySelector('div').className = 'ativo'"],
answer:1,
exp:"Deve-se selecionar especificamente a div com classe 'ativo' usando 'div.ativo', depois usar classList.toggle('ativo'). Foi item da prova — resposta parcial não pontuou."},

{topic:"DOM",diff:"medium",type:"tf",
text:"Assinale V ou F sobre manipulação do DOM.",
statements:[
  {text:"getElementsByTagName('span') retorna o primeiro elemento span encontrado.",answer:false},
  {text:"document.createDocumentFragment() cria um fragmento fora do DOM para melhorar performance.",answer:true},
  {text:"classList.toggle('classe') adiciona a classe se ausente e remove se presente.",answer:true},
  {text:"Adicionar elementos ao DOM um por vez é mais eficiente do que adicioná-los todos de uma vez.",answer:false}
],
exp:"getElementsByTagName retorna HTMLCollection com TODOS os elementos. Fragmentos são mais eficientes pois causam apenas 1 reflow. Adicionar tudo de uma vez é mais eficiente."},

{topic:"DOM",diff:"medium",type:"code",
text:"Escreva o código para criar um elemento <li>, definir seu texto para 'Item 1' e adicioná-lo a um <ul> já selecionado na variável ul.",
answer:`const li = document.createElement('li');
li.append('Item 1');
ul.append(li);`,
keywords:["createElement","li","append"],
exp:"createElement cria o nó. append() aceita string diretamente. appendChild exigiria createTextNode. Adicionar ao ul por último evita reflows desnecessários."},

// ══════════════════ EVENTOS ══════════════════
{topic:"Eventos",diff:"easy",type:"mc",
text:"Como registrar um handler de clique num botão de id 'ok' usando a forma recomendada?",
options:["ok.onclick = fn","ok.addEventListener('click', fn)","ok.click(fn)","ok.on('click', fn)"],
answer:1,
exp:"addEventListener é preferida: permite múltiplos listeners, tem opções (once, passive, capture) e pode ser removida com removeEventListener."},

{topic:"Eventos",diff:"medium",type:"mc",
text:"O que ocorre ao chamar removeEventListener com uma função diferente da usada no addEventListener?",
options:["Remove o listener","Lança TypeError","Não remove nada — requer a mesma referência de função","Remove todos os listeners"],
answer:2,
exp:"removeEventListener requer exatamente a mesma referência de função. Por isso, funções anônimas inline não podem ser removidas depois."},

{topic:"Eventos",diff:"medium",type:"mc",
text:"Qual evento é disparado quando o DOM está montado, mas antes de imagens e CSS externos carregarem?",
options:["load","DOMContentLoaded","ready","domloaded"],
answer:1,
exp:"DOMContentLoaded dispara quando o DOM está pronto. window 'load' dispara quando tudo (imagens, CSS, scripts) terminou de carregar."},

{topic:"Eventos",diff:"hard",type:"mc",
text:"Como parar um setInterval armazenado na variável t?",
options:["t.stop()","clearTimeout(t)","clearInterval(t)","t.preventDefault()"],
answer:2,
exp:"clearInterval(t) para um setInterval. clearTimeout() é para setTimeout. Na prova, o erro foi escrever preventTime(t) ou clearTimeout — não existe preventTime."},

{topic:"Eventos",diff:"medium",type:"tf",
text:"Assinale V ou F sobre eventos em JavaScript.",
statements:[
  {text:"É possível registrar múltiplos listeners para o mesmo evento no mesmo elemento via addEventListener.",answer:true},
  {text:"event.preventDefault() impede que o evento se propague para elementos pai.",answer:false},
  {text:"O evento 'DOMContentLoaded' dispara antes do evento 'load' do window.",answer:true},
  {text:"CustomEvent permite criar e disparar eventos personalizados no DOM.",answer:true}
],
exp:"preventDefault() cancela o comportamento padrão (ex: envio de form). stopPropagation() é que para a propagação. DOMContentLoaded < load em ordem de disparo."},

{topic:"Eventos",diff:"medium",type:"code",
text:"Escreva o código para exibir um diálogo modal HTML (<dialog id='d'>), bloqueando o acesso ao conteúdo atrás dele.",
answer:`const dialog = document.getElementById('d');
dialog.showModal();`,
keywords:["getElementById","showModal"],
exp:"showModal() exibe o dialog como modal — bloqueia interação com o resto da página. show() exibe sem bloquear. Na prova, o erro foi 'SHOW MODAL' com espaço ou falta do getElementById."},

// ══════════════════ CLASSES ══════════════════
{topic:"Classes",diff:"easy",type:"mc",
text:"Na sintaxe de classes ES6+, como se declara um atributo da classe (fora do constructor)?",
options:["Usando var, let ou const","Diretamente pelo nome, sem palavra-chave","Usando o prefixo attribute","Somente via this.x no constructor"],
answer:1,
exp:"Em classes ES6+, atributos são declarados pelo nome, SEM let/const/var. Ex: class Foo { meuAtributo; }. Isso é diferente de outras linguagens."},

{topic:"Classes",diff:"medium",type:"mc",
text:"O que é obrigatório ao usar super() no constructor de uma classe filha?",
options:["Deve ser chamado no final","Deve ser a primeira instrução do constructor","É opcional","Só é necessário se a pai tiver constructor"],
answer:1,
exp:"super() deve ser a PRIMEIRA chamada no constructor filha. Antes de acessar this, o super deve ter sido invocado. Caso contrário: ReferenceError."},

{topic:"Classes",diff:"medium",type:"mc",
text:"Como declarar um atributo PRIVADO em uma classe ES6+?",
options:["private atributo","_atributo","#atributo","__atributo"],
answer:2,
exp:"O prefixo # define atributos e métodos privados (ES2022+). Ex: #descricao; — inacessíveis fora da classe. _atributo é apenas convenção, não real privacidade."},

{topic:"Classes",diff:"hard",type:"mc",
text:"Atributos e métodos static em uma classe JavaScript são:",
options:["Alocados ao instanciar a classe","Alocados ao processar a declaração da classe e permanecem até o fim da aplicação","Destruídos quando o objeto é coletado pelo GC","Declarados obrigatoriamente no constructor"],
answer:1,
exp:"Estáticos são alocados quando a classe é processada pela primeira vez e permanecem até o fim da execução. Use com moderação para evitar vazamentos de memória."},

{topic:"Classes",diff:"medium",type:"tf",
text:"Assinale V ou F sobre classes em JavaScript ES6+.",
statements:[
  {text:"Métodos em classes ES6+ são declarados com a palavra-chave function.",answer:false},
  {text:"super() em um constructor filho deve ser chamado antes de qualquer acesso a this.",answer:true},
  {text:"Atributos privados com # podem ser acessados por subclasses.",answer:false},
  {text:"Uma classe pode ter no máximo um constructor.",answer:true}
],
exp:"Métodos não usam 'function'. Atributos # são privados mesmo para subclasses. Uma classe pode ter apenas 1 constructor."},

{topic:"Classes",diff:"hard",type:"code",
text:"Crie uma classe de exceção chamada Validacao que herde de Error, redefina o nome interno e seja exportada como default de um módulo ESM.",
answer:`export default class Validacao extends Error {
  constructor( message ) {
    super( message );
    this.name = 'Validacao';
  }
}`,
keywords:["export default","class Validacao","extends Error","super","this.name"],
exp:"export default para importar sem chaves. extends Error herda. super(message) PRIMEIRO. this.name = 'Validacao' redefine o nome que aparece no console. Esses 3 requisitos foram cobrados na prova."},

{topic:"Classes",diff:"medium",type:"code",
text:"Declare a classe Boomerang com três atributos privados (#descricao, #tamanho, #estoque) e apenas os getters públicos para cada um.",
answer:`class Boomerang {
  #descricao;
  #tamanho;
  #estoque;

  get descricao() { return this.#descricao; }
  get tamanho()   { return this.#tamanho; }
  get estoque()   { return this.#estoque; }
}`,
keywords:["#descricao","#tamanho","#estoque","get descricao","get tamanho","get estoque"],
exp:"Atributos privados com #. Getters são métodos especiais com 'get'. A questão pedia APENAS getters — setters seriam errado. Erro da prova: criar setters além dos getters."},

// ══════════════════ MÓDULOS ══════════════════
{topic:"Módulos",diff:"easy",type:"mc",
text:"Qual a diferença entre exportação nomeada e default em ESM?",
options:["Não há diferença","Default: apenas uma por módulo, importada sem chaves {}; Nomeada: múltiplas, importadas com {}","Default usa export {}; Nomeada usa export default","Nomeada: apenas uma; Default: múltiplas"],
answer:1,
exp:"export default: UMA por módulo, importada sem chaves. export nomeado: múltiplos, com chaves. Ex: import MinhaClasse from './arq.js' vs import { funcao } from './arq.js'"},

{topic:"Módulos",diff:"medium",type:"mc",
text:"O que ocorre ao tentar reatribuir uma variável importada: import { contador } from './mod.js'; contador = 20;?",
options:["Altera normalmente","Lança TypeError — bindings importados são somente leitura","Cria nova variável local","Altera apenas localmente"],
answer:1,
exp:"Variáveis importadas são read-only bindings. Para alterar, o módulo original deve exportar uma função modificadora. Esse comportamento é intencional para consistência entre módulos."},

{topic:"Módulos",diff:"medium",type:"mc",
text:"Como importar o default export E um export nomeado do mesmo arquivo em uma única instrução?",
options:["import { default, soma } from './arq.js'","import Calc, { soma } from './arq.js'","import * from './arq.js'","import default Calc, named { soma } from './arq.js'"],
answer:1,
exp:"import Default, { nomeado } from './arq.js' — o default vem sem chaves antes da vírgula, os nomeados com chaves depois."},

{topic:"Módulos",diff:"medium",type:"tf",
text:"Assinale V ou F sobre módulos ESM.",
statements:[
  {text:"Declarações em módulos ESM são adicionadas ao objeto global (window).",answer:false},
  {text:"Um módulo pode ter no máximo uma exportação default.",answer:true},
  {text:"import * as mat from './matematica.js' permite acessar todos os exports como mat.funcao().",answer:true},
  {text:"Módulos ESM são carregados com type='module' na tag script.",answer:true}
],
exp:"Módulos têm escopo próprio — nada vai para window. Um default por módulo. O namespace import (* as) agrupa todos os exports. script type='module' ativa o modo ESM."},

{topic:"Módulos",diff:"easy",type:"code",
text:"Escreva a instrução de importação para importar a classe Boomerang (export default) do arquivo './boomerang.js'.",
answer:"import Boomerang from './boomerang.js';",
keywords:["import","Boomerang","from","boomerang.js"],
exp:"Export default é importado sem chaves {}. O nome local pode ser qualquer um — não precisa ser Boomerang. Ex: import Bumerangue from './boomerang.js' também funcionaria."},

// ══════════════════ STORAGE ══════════════════
{topic:"Storage",diff:"easy",type:"mc",
text:"Qual a diferença entre sessionStorage e localStorage?",
options:["sessionStorage é mais rápido","sessionStorage é temporário (dura enquanto a aba está aberta); localStorage persiste por período longo","São idênticos","localStorage é específico de sessão"],
answer:1,
exp:"sessionStorage: temporário, específico da aba. localStorage: persiste, compartilhado entre todas as abas da mesma origem (mesmo protocolo, domínio e porta)."},

{topic:"Storage",diff:"medium",type:"mc",
text:"Qual o tipo dos valores armazenados no localStorage?",
options:["Qualquer tipo JavaScript","Apenas number","Apenas string","JSON"],
answer:2,
exp:"Chave e valor no localStorage são SEMPRE strings. Para objetos: JSON.stringify() ao salvar e JSON.parse() ao ler. Instâncias de classe devem virar objetos simples antes."},

{topic:"Storage",diff:"hard",type:"mc",
text:"Por que NÃO se deve salvar uma instância de classe diretamente no localStorage?",
options:["Por questões de segurança","O localStorage só aceita strings — e objetos de classe perdem prototype/métodos ao serializar; devem ser convertidos para objeto simples","O localStorage não suporta JSON","Por limitação de tamanho"],
answer:1,
exp:"localStorage aceita apenas strings. JSON.stringify em uma instância serializa os dados mas perde prototype e métodos. Ao fazer JSON.parse, retorna objeto simples — correto, mas a classe original não é restaurada automaticamente."},

{topic:"Storage",diff:"medium",type:"tf",
text:"Assinale V ou F sobre Web Storage.",
statements:[
  {text:"localStorage persiste os dados mesmo após fechar o navegador.",answer:true},
  {text:"sessionStorage é compartilhado entre todas as abas da mesma origem.",answer:false},
  {text:"localStorage.setItem('x', {a:1}) armazena o objeto como '[object Object]'.",answer:true},
  {text:"localStorage.getItem('chave') retorna null se a chave não existir.",answer:true}
],
exp:"sessionStorage é específico por aba/janela. setItem converte para string chamando toString() — objetos viram '[object Object]'; use JSON.stringify. getItem retorna null para chaves inexistentes."},

{topic:"Storage",diff:"medium",type:"code",
text:"Escreva o código para ler uma lista de boomerangs do localStorage (chave 'boomerangs'), retornando um array vazio caso a chave não exista.",
answer:"const boomList = JSON.parse(localStorage.getItem('boomerangs') || '[]');",
keywords:["JSON.parse","localStorage.getItem","boomerangs","||","[]"],
exp:"getItem retorna null se não existir. O || '[]' garante um fallback. JSON.parse('[]') retorna []. Esse padrão foi cobrado na questão 2b da prova."},

// ══════════════════ ARRAYS ══════════════════
{topic:"Arrays",diff:"easy",type:"mc",
text:"Qual método Array usar para transformar cada elemento e gerar um NOVO array?",
options:["forEach()","filter()","map()","find()"],
answer:2,
exp:"map() transforma e retorna novo array. forEach() executa mas não retorna. filter() filtra. find() retorna o primeiro que passa no teste."},

{topic:"Arrays",diff:"easy",type:"mc",
text:"O que retorna [1,2,3].filter(n => n > 5)?",
options:["undefined","null","[]","false"],
answer:2,
exp:"filter() retorna array vazio [] quando nenhum elemento passa no teste. Nunca retorna null ou undefined."},

{topic:"Arrays",diff:"medium",type:"mc",
text:"Quando usar map() em vez de forEach() e vice-versa?",
options:["São intercambiáveis","map() quando se quer gerar novo array; forEach() quando se quer apenas executar algo com cada elemento sem retorno","forEach() quando se quer novo array","map() apenas para transformações numéricas"],
answer:1,
exp:"map() gera novo array com os retornos. forEach() executa sem retornar array. Na questão 3 da prova, a solução usava map() para transformar e forEach() para criar os li's."},

{topic:"Arrays",diff:"medium",type:"tf",
text:"Assinale V ou F sobre utilitários de Array em JavaScript.",
statements:[
  {text:"map() modifica o array original.",answer:false},
  {text:"find() retorna o primeiro elemento que passa no teste, ou undefined caso nenhum passe.",answer:true},
  {text:"filter() sempre retorna um array, mesmo que vazio.",answer:true},
  {text:"[...new Set([1,1,2,3])] resulta em [1,2,3].",answer:true}
],
exp:"map(), filter(), find() não modificam o original. find() retorna undefined se não encontrar. Set remove duplicatas; spread converte de volta para array."},

{topic:"Arrays",diff:"hard",type:"code",
text:"Dado um array de objetos boomerangs [{descricao,tamanho,estoque}], filtre apenas os que incluem 'texto' na descricao e mapeie para strings no formato 'Boomerang X – Ycm – Z und'. Use arrow functions.",
answer:`boomList
  .filter( b => b.descricao.includes(pesquisa) )
  .map( b => \`Boomerang \${b.descricao} – \${b.tamanho}cm – \${b.estoque} und\` )`,
keywords:["filter","includes","map","Boomerang"],
exp:"Encadeamento de filter + map é o padrão para filtrar e transformar. A questão 3 da prova pedia exatamente isso. A dica do prof era filtrar APÓS o map, mas filtrar antes é mais eficiente."},

// ══════════════════ EXCEÇÕES ══════════════════
{topic:"Exceções",diff:"easy",type:"mc",
text:"Qual bloco SEMPRE executa em um try/catch/finally, mesmo com return no try?",
options:["try","catch","finally","Nenhum"],
answer:2,
exp:"finally sempre executa, independente de return, throw ou qualquer saída do try. Foi item V/F da prova (correto = V)."},

{topic:"Exceções",diff:"medium",type:"mc",
text:"Por que redefinir this.name em uma classe de exceção customizada?",
options:["É obrigatório pelo ECMAScript","Para o nome correto da classe aparecer no console ao imprimir o erro","Para melhorar performance","Para compatibilidade com catch"],
answer:1,
exp:"Sem this.name, ao imprimir o erro aparece 'Error: mensagem' (nome da classe pai). Com this.name = 'Validacao', aparece 'Validacao: mensagem'. Cobrado na questão 1 da prova."},

{topic:"Exceções",diff:"medium",type:"mc",
text:"No catch(e), como exibir a mensagem de texto de uma exceção?",
options:["e.texto","e.message","e.toString()","e.description"],
answer:1,
exp:"e.message contém a mensagem. e.name contém o nome da classe. e.stack contém o rastro. Na prova, o erro foi escrever 'Validacao.e' em vez de 'e.message'."},

{topic:"Exceções",diff:"medium",type:"tf",
text:"Assinale V ou F sobre exceções em JavaScript.",
statements:[
  {text:"É possível lançar qualquer valor com throw, não apenas instâncias de Error.",answer:true},
  {text:"O bloco catch captura apenas instâncias de Error, não strings ou números.",answer:false},
  {text:"finally executa mesmo que o bloco try contenha um return.",answer:true},
  {text:"Para criar uma exceção customizada, a classe deve herdar de Error.",answer:true}
],
exp:"throw pode lançar qualquer valor. catch captura tudo que for lançado. finally sempre executa. Herdar de Error não é obrigatório tecnicamente, mas é fortemente recomendado para ter message e stack."},

// ══════════════════ OPERADORES ══════════════════
{topic:"Operadores",diff:"medium",type:"mc",
text:"O que faz o operador ... (spread) em [...a, ...b]?",
options:["Cria referência para a e b","Espalha os elementos de a e b num novo array (concatenação eficiente)","Cria iterador dos arrays","Faz deep copy dos objetos"],
answer:1,
exp:"Spread espalha elementos de iteráveis. [...a, ...b] é como a.concat(b), mas spread é mais rápido. Também funciona em objetos: {...obj1, ...obj2}."},

{topic:"Operadores",diff:"hard",type:"mc",
text:"Dado function y([a, b, ...c]), ao chamar y([1,2,3,4,5]), qual é o valor de c?",
options:["[3]","[3,4,5]","3","undefined"],
answer:1,
exp:"Desestruturação com rest: a=1, b=2, c=[3,4,5]. O rest (...c) coleta o restante. Esse era o item 5a da prova — resposta correta era [3,4,5]."},

{topic:"Operadores",diff:"hard",type:"mc",
text:"Dado function z({a, d, ...n}), ao chamar z({a:1, b:2, c:3}), qual é o valor de d e n?",
options:["d=undefined, n={b:2,c:3}","d=2, n={c:3}","d=undefined, n={}","d=1, n={b:2,c:3}"],
answer:0,
exp:"d não existe no objeto, então d=undefined. n (rest) coleta as propriedades não desestruturadas: {b:2, c:3}. Esse era o item 5b da prova."},

{topic:"Operadores",diff:"medium",type:"tf",
text:"Assinale V ou F sobre operadores modernos de JavaScript.",
statements:[
  {text:"O operador ?. (optional chaining) retorna undefined se a propriedade não existir, em vez de lançar erro.",answer:true},
  {text:"O operador ?? (nullish coalescing) retorna o lado direito se o lado esquerdo for qualquer valor falsy.",answer:false},
  {text:"O operador ... pode ser usado tanto para spread quanto para rest, dependendo do contexto.",answer:true},
  {text:"super pode ser usado em métodos para invocar a implementação do método pai.",answer:true}
],
exp:"?? só considera null/undefined como 'nulo' (não 0 ou ''). || considera qualquer falsy. ... no parâmetro = rest (coleta), na chamada/literal = spread (espalha)."},

// ══════════════════ PROMISE / FETCH ══════════════════
{topic:"Promise/Fetch",diff:"easy",type:"mc",
text:"Qual método da Promise é executado quando ela é rejeitada?",
options:[".then()",".catch()",".reject()",".finally()"],
answer:1,
exp:".catch() captura rejeições. .then() pode receber onFulfilled e onRejected como argumentos. .finally() sempre executa."},

{topic:"Promise/Fetch",diff:"medium",type:"mc",
text:"O fetch() lança automaticamente um erro quando a resposta é 404 ou 500?",
options:["Sim, sempre","Não — só rejeita para falhas de rede; erros HTTP devem ser verificados manualmente via response.ok ou response.status","Sim, para 4xx mas não para 5xx","Somente se usado com async/await"],
answer:1,
exp:"fetch() rejeita a Promise apenas para falhas de rede. Para 4xx/5xx, a Promise resolve (!) com response.ok = false. Deve-se verificar: if(response.status >= 400) throw new Error(...)"},

{topic:"Promise/Fetch",diff:"medium",type:"mc",
text:"O que faz Promise.all([p1, p2, p3])?",
options:["Retorna a primeira que resolver","Resolve com array de resultados quando TODAS resolvem; rejeita se qualquer uma rejeitar","Retorna todas independente do resultado","Executa em sequência"],
answer:1,
exp:"Promise.all: resolve com array quando TODAS resolvem. Rejeita imediatamente se qualquer uma rejeitar. Promise.allSettled aguarda todas, independente do resultado."},

{topic:"Promise/Fetch",diff:"medium",type:"tf",
text:"Assinale V ou F sobre Promises e fetch.",
statements:[
  {text:"Uma Promise pode estar nos estados: pending, fulfilled ou rejected.",answer:true},
  {text:"Promise.race retorna a promise que resolver primeiro, ignorando as demais.",answer:true},
  {text:"response.json() retorna diretamente o objeto JavaScript parseado.",answer:false},
  {text:".finally() recebe o valor resolvido ou a razão da rejeição como argumento.",answer:false}
],
exp:"response.json() retorna uma Promise — precisa de await ou .then(). .finally() não recebe argumentos — não sabe se foi resolved ou rejected."},

{topic:"Promise/Fetch",diff:"hard",type:"code",
text:"Escreva uma função fetchJSON(url) usando fetch que: verifica se houve erro HTTP (status >= 400) e lança um Error; caso contrário, retorna o JSON.",
answer:`async function fetchJSON(url) {
  const response = await fetch(url);
  if (response.status >= 400) {
    throw new Error('Erro HTTP: ' + response.status);
  }
  return response.json();
}`,
keywords:["fetch","response.status","throw","response.json"],
exp:"O padrão correto: verificar status manualmente (fetch não lança para erros HTTP). response.json() no return não precisa de await (retorno implícito de Promise). Esse padrão foi cobrado nos slides."},

// ══════════════════ ASYNC / AWAIT ══════════════════
{topic:"Async/Await",diff:"easy",type:"mc",
text:"O que faz a palavra-chave async em uma função?",
options:["Executa em thread separada","Faz a função retornar implicitamente uma Promise","Permite setTimeout sem callback","Transforma loops em assíncronos"],
answer:1,
exp:"async envolve o retorno em uma Promise automaticamente. return 10 numa async function é equivalente a Promise.resolve(10). await pausa sem bloquear a thread."},

{topic:"Async/Await",diff:"medium",type:"mc",
text:"Como tratar erros em uma função async/await?",
options:["Usando .catch() na chain","Com try/catch ao redor do await","async functions nunca lançam erros","Com o segundo parâmetro do await"],
answer:1,
exp:"Em async/await, erros são tratados com try/catch — substitui o .catch() encadeado. Um throw dentro de async function é equivalente a Promise.reject()."},

{topic:"Async/Await",diff:"hard",type:"mc",
text:"Uma função async retorna 'return response.json()' sem await. Isso é correto?",
options:["Não — sempre precisa de await no return","Sim — no return de uma função async, o await é desnecessário pois o chamador fará o await do resultado","Causa erro de sintaxe","Só funciona com .then()"],
answer:1,
exp:"Retornar uma Promise de uma função async é válido — o chamador fará await do resultado. Adicionar await no return é redundante. Os slides mostram esse padrão."},

{topic:"Async/Await",diff:"medium",type:"tf",
text:"Assinale V ou F sobre async/await.",
statements:[
  {text:"Uma função declarada com async sempre retorna uma Promise, mesmo retornando um valor primitivo.",answer:true},
  {text:"await pode ser usado em qualquer função, não apenas em funções async.",answer:false},
  {text:"async/await substitui o uso de .then/.catch, tornando código assíncrono mais legível.",answer:true},
  {text:"Se uma função async lançar uma exceção, ela se comporta como Promise.reject().",answer:true}
],
exp:"await só pode ser usado dentro de funções async (ou no top-level de módulos). async/await é açúcar sintático sobre Promises — não as elimina."},

// ══════════════════ REST / HTTP ══════════════════
{topic:"REST/HTTP",diff:"easy",type:"mc",
text:"Qual método HTTP é usado para CRIAR um novo recurso?",
options:["GET","POST","PUT","PATCH"],
answer:1,
exp:"POST cria. GET obtém. PUT atualiza completamente. PATCH atualiza parcialmente. DELETE remove."},

{topic:"REST/HTTP",diff:"medium",type:"mc",
text:"Qual é o código de status esperado para uma requisição DELETE bem-sucedida em uma API RESTful?",
options:["200 OK","201 Created","204 No Content","404 Not Found"],
answer:2,
exp:"DELETE retorna 204 No Content. POST criação: 201 Created. GET: 200 OK. PUT/PATCH: 200 OK. Tabela completa nos slides de REST."},

{topic:"REST/HTTP",diff:"hard",type:"mc",
text:"O que significa REST ser 'sem estado' (stateless)?",
options:["O servidor não armazena dados permanentes","A mensagem deve conter tudo necessário para executar a tarefa; estado da sessão fica somente no cliente","O cliente não mantém estado","Cada requisição usa conexão diferente"],
answer:1,
exp:"REST stateless: a mensagem deve ser autossuficiente. Reduz performance de rede (dados repetidos) mas aumenta escalabilidade — o servidor não precisa guardar sessão."},

{topic:"REST/HTTP",diff:"medium",type:"mc",
text:"O que é HATEOS no contexto de REST?",
options:["Um protocolo de autenticação","Hypermedia As The Engine Of Application State — o servidor devolve links para próximas ações/dados","Um framework JavaScript","Um método HTTP especial"],
answer:1,
exp:"HATEOS: o servidor devolve links para próximas ações. Ex: retornar 'proxima': 'https://api.com/paises?pagina=2'. É uma das características do REST puro que raramente é implementada em APIs RESTful."},

{topic:"REST/HTTP",diff:"medium",type:"tf",
text:"Assinale V ou F sobre REST e HTTP.",
statements:[
  {text:"REST foi proposto por Roy Fielding em 2000 como um estilo arquitetural.",answer:true},
  {text:"RESTful e REST são termos equivalentes que descrevem a mesma coisa.",answer:false},
  {text:"O método HTTP GET é idempotente — múltiplas chamadas idênticas resultam no mesmo estado.",answer:true},
  {text:"O código 201 Created é o esperado para requisições POST que criam um recurso.",answer:true}
],
exp:"REST é estilo arquitetural geral. RESTful são convenções inspiradas no REST para APIs. REST puro inclui HATEOS — a maioria das APIs são RESTful, não REST. GET é idempotente e seguro (não muda estado)."},

{topic:"REST/HTTP",diff:"hard",type:"code",
text:"Escreva uma chamada fetch para deletar o recurso com id 5 da rota '/jogos', tratando o status 404 com uma mensagem específica.",
answer:`const response = await fetch('/jogos/5', { method: 'DELETE' });
if (response.status === 404) {
  throw new Error('Jogo não encontrado para remoção');
}
if (!response.ok) {
  throw new Error('Erro ao remover o jogo');
}`,
keywords:["fetch","DELETE","response.status","404","response.ok","throw"],
exp:"fetch com method: 'DELETE'. Verificar 404 primeiro (mensagem específica), depois !response.ok para outros erros. Esse padrão é do servico-jogos.js do projeto."},


// ══════════════════ ARROW FUNCTIONS ══════════════════
{topic:"Arrow Functions",diff:"easy",type:"mc",
text:"Qual versão do ECMAScript introduziu as arrow functions (funções de seta)?",
options:["ES3","ES5","ES6 (ES2015)","ES8"],
answer:2,
exp:"Arrow functions foram introduzidas no ES6 (ES2015). Elas permitem criar funções anônimas com sintaxe mais concisa."},

{topic:"Arrow Functions",diff:"easy",type:"mc",
text:"Qual das opções abaixo é a conversão correta da função: const soma = function(x, y) { return x + y; }",
options:["const soma = x, y => x + y","const soma = (x, y) => x + y","const soma = (x, y) -> x + y","const soma => (x, y) => x + y"],
answer:1,
exp:"Arrow function sem corpo: (params) => expressão. As chaves e return são removidos quando há uma única expressão de retorno."},

{topic:"Arrow Functions",diff:"medium",type:"mc",
text:"Por que NÃO se deve usar arrow function em um método de objeto que precise acessar this?",
options:["Arrow functions são mais lentas","Arrow functions não têm binding próprio de this — capturam o this do escopo externo, que geralmente é window","Arrow functions não aceitam parâmetros","Arrow functions não podem ser usadas em objetos"],
answer:1,
exp:"Arrow functions capturam o this do escopo léxico externo. Em um método de objeto, this deveria ser o próprio objeto — mas com arrow function seria o escopo externo (window em navegador)."},

{topic:"Arrow Functions",diff:"medium",type:"mc",
text:"Dado: const dobrar = valor => 2 * valor; — o que é especial sobre a sintaxe do parâmetro?",
options:["Parênteses são obrigatórios","Com único parâmetro, os parênteses são opcionais","O parâmetro deve ser sempre uma letra","Não pode ter parâmetros sem parênteses"],
answer:1,
exp:"Com um único parâmetro, os parênteses são opcionais. Com zero ou dois ou mais parâmetros, os parênteses são obrigatórios. Ex: () => 'oi' / (x,y) => x+y"},

{topic:"Arrow Functions",diff:"hard",type:"mc",
text:"Por que arrow functions NÃO podem ser usadas com o operador new?",
options:["Por questão de sintaxe","Arrow functions não possuem prototype e não têm constructor binding — logo não podem ser usadas como construtores","Por questão de performance","Apenas funções declaradas com function podem usar new"],
answer:1,
exp:"Arrow functions não têm prototype e não possuem o binding interno de [[Construct]]. Tentar usar new com arrow function lança TypeError."},

{topic:"Arrow Functions",diff:"medium",type:"tf",
text:"Assinale V ou F sobre arrow functions.",
statements:[
  {text:"Arrow functions têm seu próprio objeto arguments.",answer:false},
  {text:"bind() não funciona para alterar o this de uma arrow function.",answer:true},
  {text:"Arrow functions podem ser usadas com a palavra-chave new para criar objetos.",answer:false},
  {text:"Uma arrow function sem corpo retorna implicitamente o valor da expressão.",answer:true}
],
exp:"Arrow functions NÃO têm arguments — usam rest parameters (...args) se precisar. bind() não muda o this de arrows. new com arrow lança TypeError. Sem corpo => retorno implícito."},

{topic:"Arrow Functions",diff:"easy",type:"code",
text:"Converta a função abaixo para arrow function sem corpo:",
code:`const quadrado = function(n) { return n * n; }`,
answer:"const quadrado = n => n * n;",
keywords:["quadrado","=>","n * n"],
exp:"Com único parâmetro, sem parênteses. Sem corpo, sem return. n => n * n é a forma mais concisa."},

{topic:"Arrow Functions",diff:"medium",type:"code",
text:"Escreva uma arrow function chamada saudacao que não recebe parâmetros e retorna a string 'Olá!'.",
answer:"const saudacao = () => 'Olá!';",
keywords:["saudacao","=>","Olá"],
exp:"Zero parâmetros exige parênteses vazios (). Retorno implícito sem corpo (sem chaves e sem return)."},

// ══════════════════ JS BÁSICO ══════════════════
{topic:"JS Básico",diff:"easy",type:"mc",
text:"Qual a diferença entre declarar um array com [] versus new Array(3)?",
options:["São equivalentes sempre","new Array(3) cria um array com 3 posições vazias, não com o elemento 3","[] é mais lento","new Array() é a forma recomendada"],
answer:1,
exp:"new Array(3) com único argumento inteiro cria array de comprimento 3 (vazio), não [3]. Por isso, prefira sempre a notação de colchetes: const a = [3]."},

{topic:"JS Básico",diff:"easy",type:"mc",
text:"Qual método adiciona um elemento ao FINAL de um array e retorna o novo comprimento?",
options:["unshift()","shift()","push()","pop()"],
answer:2,
exp:"push() adiciona ao fim. unshift() adiciona ao início. pop() remove do fim. shift() remove do início. Todos retornam valores diferentes."},

{topic:"JS Básico",diff:"easy",type:"mc",
text:"O que faz o método join() em arrays?",
options:["Une dois arrays","Remove duplicatas","Une todos os elementos do array em uma string com um separador","Divide a string em array"],
answer:2,
exp:"join(sep) une todos os elementos do array em uma string usando o separador informado. Ex: ['a','b','c'].join('-') => 'a-b-c'."},

{topic:"JS Básico",diff:"medium",type:"mc",
text:"Dado: var frutas = ['uva','maçã','pêra']; delete frutas[1]; — qual é frutas.length?",
options:["2","3","undefined","1"],
answer:1,
exp:"delete indefine o elemento no índice (substitui por undefined/empty), mas NÃO altera o length nem reindexar. Length continua 3. Use splice() para remover de verdade."},

{topic:"JS Básico",diff:"medium",type:"mc",
text:"O que é um callback em JavaScript?",
options:["Uma função que retorna outra função","Uma variável que recebe uma função","Uma função passada como argumento para outra função, para ser chamada posteriormente","Um tipo especial de arrow function"],
answer:2,
exp:"Callback é uma função passada como argumento para outra função. Ela é chamada ('called back') quando necessário. É a base dos padrões assíncronos do JavaScript."},

{topic:"JS Básico",diff:"medium",type:"mc",
text:"O que faz prototype.call(obj, arg1) em JavaScript?",
options:["Cria uma cópia da função","Chama a função passando obj como this e arg1 como argumento","Vincula a função permanentemente ao objeto","Cria um novo objeto com base no prototype"],
answer:1,
exp:"call() invoca a função imediatamente, usando obj como this e os demais argumentos individualmente. bind() cria nova função. apply() passa argumentos como array."},

{topic:"JS Básico",diff:"hard",type:"mc",
text:"Qual é a diferença entre call(), apply() e bind()?",
options:["São sinônimos","call() e apply() invocam imediatamente (diferem na forma dos argumentos); bind() cria uma NOVA função com this fixo","bind() invoca imediatamente; call() e apply() criam novas funções","Apenas apply() pode mudar o this"],
answer:1,
exp:"call(obj, a, b): invoca agora, args individuais. apply(obj, [a,b]): invoca agora, args em array. bind(obj, a): retorna nova função com this fixo, não invoca imediatamente."},

{topic:"JS Básico",diff:"medium",type:"tf",
text:"Assinale V ou F sobre JavaScript básico (ES5).",
statements:[
  {text:"Uma função anônima atribuída a uma variável pode ser passada como callback.",answer:true},
  {text:"O objeto arguments está disponível em arrow functions.",answer:false},
  {text:"Ao usar o operador new com uma função, o this dentro da função referencia o novo objeto criado.",answer:true},
  {text:"push() e pop() operam no INÍCIO do array.",answer:false}
],
exp:"arguments não existe em arrows — use rest (...args). new cria objeto e this aponta para ele. push/pop operam no FIM. unshift/shift operam no início."},

{topic:"JS Básico",diff:"easy",type:"code",
text:"Escreva o código para adicionar 'manga' ao fim do array frutas e 'abacate' ao início.",
answer:`frutas.push('manga');
frutas.unshift('abacate');`,
keywords:["push","unshift"],
exp:"push() adiciona ao fim. unshift() adiciona ao início. Ambos retornam o novo comprimento do array."},

{topic:"JS Básico",diff:"medium",type:"code",
text:"Dado o objeto: const tel = { ddd: '22', numero: '99999' }; — escreva como acessar a propriedade 'ddd' de duas formas diferentes.",
answer:`tel.ddd
tel['ddd']`,
keywords:["tel.ddd","tel["],
exp:"Propriedades podem ser acessadas com notação de ponto (tel.ddd) ou como array (tel['ddd']). A notação de array permite usar variáveis como chave."},

// ══════════════════ TIPOS (extra) ══════════════════
{topic:"Tipos",diff:"hard",type:"mc",
text:"O que retorna: typeof class Foo {} ?",
options:['"class"','"object"','"function"','"undefined"'],
answer:2,
exp:'typeof class Foo {} retorna "function" — classes ES6+ são, internamente, funções. Isso é uma peculiaridade do JavaScript.'},

{topic:"Tipos",diff:"medium",type:"mc",
text:"Qual a diferença entre == (igualdade fraca) e === (igualdade estrita)?",
options:["São idênticos","== faz coerção de tipos antes de comparar; === compara sem coerção (tipo e valor)","=== é mais lento","== só funciona com números"],
answer:1,
exp:"== converte tipos (ex: 0 == false é true). === compara tipo E valor sem conversão (0 === false é false). Prefira sempre ===."},

{topic:"Tipos",diff:"hard",type:"tf",
text:"Assinale V ou F sobre comparações e tipos em JavaScript.",
statements:[
  {text:"0 === false retorna true.",answer:false},
  {text:"null == undefined retorna true.",answer:true},
  {text:"typeof [] retorna 'array'.",answer:false},
  {text:"NaN === NaN retorna false.",answer:true}
],
exp:"0 === false é false (tipos diferentes). null == undefined é true (coerção especial). typeof [] é 'object'. NaN nunca é igual a si mesmo — use Number.isNaN() para verificar."},

// ══════════════════ ESCOPO (extra) ══════════════════
{topic:"Escopo",diff:"hard",type:"mc",
text:"Qual é a Temporal Dead Zone (TDZ)?",
options:["Uma zona de memória para variáveis globais","O período entre o início do escopo e a declaração de let/const, onde acessar a variável lança ReferenceError","Um modo de depuração do JS","Uma feature exclusiva do strict mode"],
answer:1,
exp:"let e const são içados (hoisted) mas ficam na TDZ até sua declaração. Acessar antes lança ReferenceError, diferente de var que retorna undefined no mesmo caso."},

{topic:"Escopo",diff:"medium",type:"mc",
text:"O que é o objeto globalThis?",
options:["Uma variável criada pelo usuário","Uma referência ao objeto global que funciona consistentemente em navegadores (window), Node.js (global) e outros ambientes","Um método de depuração","Parte do strict mode"],
answer:1,
exp:"globalThis (ES2020) referencia o objeto global de forma uniforme em qualquer ambiente. No navegador é window/self, no Node.js é global."},

{topic:"Escopo",diff:"hard",type:"code",
text:"Dado o código abaixo, o que console.log(x) e console.log(y) produzem FORA do bloco if?",
code:`if (true) {
  var x = 1;
  let y = 2;
}`,
answer:`console.log(x); // 1
console.log(y); // ReferenceError: y is not defined`,
keywords:["1","ReferenceError"],
exp:"var tem escopo de função/global — x é acessível fora do bloco. let tem escopo de bloco — y lança ReferenceError fora do if."},

// ══════════════════ DOM (extra) ══════════════════
{topic:"DOM",diff:"medium",type:"mc",
text:"Qual método do DOM permite navegar até o ancestral mais próximo que corresponde a um seletor CSS?",
options:["parentElement","querySelector()","closest()","matches()"],
answer:2,
exp:"closest(selector) percorre os ancestrais e retorna o mais próximo que corresponde ao seletor. Muito útil em event delegation para encontrar o elemento relevante a partir de um evento."},

{topic:"DOM",diff:"medium",type:"mc",
text:"O que retorna document.querySelector('tbody tr td[data-id=5]')?.parentElement?",
options:["O td com data-id=5","O tr que contém o td com data-id=5","null se o td não existir e o tr se existir","Lança erro se o elemento não existir"],
answer:1,
exp:"querySelector retorna o td. .parentElement retorna o tr pai. O ?. (optional chaining) evita erro se querySelector retornar null — nesse caso retorna undefined em vez de lançar TypeError."},

{topic:"DOM",diff:"hard",type:"mc",
text:"Qual a diferença entre innerText e textContent?",
options:["São idênticos","textContent retorna todo o texto incluindo de elementos ocultos; innerText considera o CSS e retorna apenas o texto visível","innerText é mais rápido","textContent não funciona com elementos aninhados"],
answer:1,
exp:"textContent retorna tudo (incluindo elementos hidden). innerText considera renderização CSS — mais lento mas reflete o que o usuário vê. Para definir texto simples, prefira textContent."},

{topic:"DOM",diff:"easy",type:"mc",
text:"Qual propriedade CSS do DOM permite adicionar, remover e alternar classes de um elemento?",
options:["element.style","element.className","element.classList","element.class"],
answer:2,
exp:"classList expõe métodos add(), remove(), toggle(), contains() e replace(). É muito mais seguro que className (string bruta) porque não apaga outras classes existentes."},

{topic:"DOM",diff:"medium",type:"tf",
text:"Assinale V ou F sobre manipulação do DOM.",
statements:[
  {text:"querySelector() é invocável em document e também em um elemento qualquer.",answer:true},
  {text:"getElementById() é invocável em qualquer elemento do DOM.",answer:false},
  {text:"element.dataset.id acessa o atributo data-id do elemento.",answer:true},
  {text:"Chamar element.remove() remove apenas os filhos do elemento, não o elemento em si.",answer:false}
],
exp:"getElementById e getElementsByName são invocáveis apenas em document. querySelector pode ser chamado em qualquer elemento. dataset.id acessa data-id (camelCase). remove() remove o próprio elemento."},

{topic:"DOM",diff:"medium",type:"code",
text:"Escreva como selecionar um td com data-id=3 dentro de tbody e remover a tr pai desse td.",
answer:`const td = document.querySelector('tbody td[data-id=\"3\"]');
td?.parentElement?.remove();`,
keywords:["querySelector","data-id","parentElement","remove"],
exp:"Seletor CSS com atributo: [data-id='3']. Optional chaining (?.) evita erro se o elemento não existir. parentElement sobe para o tr, remove() o exclui do DOM."},

// ══════════════════ EVENTOS (extra) ══════════════════
{topic:"Eventos",diff:"medium",type:"mc",
text:"O que é event delegation (delegação de eventos)?",
options:["Remover eventos de um elemento","Registrar um evento no elemento pai para capturar eventos de filhos via event.target","Usar addEventListener com capture:true","Criar eventos personalizados com CustomEvent"],
answer:1,
exp:"Event delegation: registrar o listener no pai e verificar event.target para identificar qual filho disparou. Mais eficiente quando há muitos filhos ou filhos dinâmicos."},

{topic:"Eventos",diff:"medium",type:"mc",
text:"Qual opção de addEventListener garante que o listener seja chamado no máximo uma vez?",
options:["passive: true","capture: true","once: true","single: true"],
answer:2,
exp:"once: true faz o listener se auto-remover após a primeira execução. passive: true indica que preventDefault() não será chamado (melhora performance de scroll). capture: true usa fase de captura."},

{topic:"Eventos",diff:"hard",type:"mc",
text:"Qual é a ordem de execução dos eventos click em: document → body → div → button, quando capture é false (padrão)?",
options:["document → body → div → button (captura)","button → div → body → document (bubbling)","Aleatória","Apenas o elemento alvo"],
answer:1,
exp:"Com capture:false (padrão = bubbling), o evento sobe do elemento alvo (button) até a raiz: button → div → body → document. Com capture:true, desce da raiz até o alvo."},

{topic:"Eventos",diff:"medium",type:"tf",
text:"Assinale V ou F sobre eventos no DOM.",
statements:[
  {text:"event.preventDefault() impede a propagação do evento para elementos pai.",answer:false},
  {text:"event.stopPropagation() impede que o evento se propague para outros elementos.",answer:true},
  {text:"CustomEvent permite passar dados extras via a propriedade detail.",answer:true},
  {text:"O evento 'blur' dispara quando um elemento recebe foco.",answer:false}
],
exp:"preventDefault() cancela o comportamento padrão (ex: submit). stopPropagation() para a bolha. CustomEvent({ detail: {...} }) passa dados extras. blur dispara quando perde foco; focus quando recebe."},

{topic:"Eventos",diff:"medium",type:"code",
text:"Escreva o código para criar um CustomEvent chamado 'meuEvento' com detail {nome:'Ana'} e disparar no elemento div com id='alvo'.",
answer:`const evento = new CustomEvent('meuEvento', { detail: { nome: 'Ana' } });
document.getElementById('alvo').dispatchEvent(evento);`,
keywords:["CustomEvent","detail","dispatchEvent","getElementById"],
exp:"CustomEvent recebe nome e opções (com detail). dispatchEvent() dispara o evento no elemento. Listeners registrados com 'meuEvento' receberão o evento com event.detail.nome === 'Ana'."},

// ══════════════════ CLASSES (extra) ══════════════════
{topic:"Classes",diff:"easy",type:"mc",
text:"O que é uma propriedade em JavaScript (no contexto de classes)?",
options:["Um atributo simples","Um par de métodos get/set que se comporta como atributo ao acessar/definir valor","Um método estático","Um construtor secundário"],
answer:1,
exp:"Uma propriedade (property) usa get/set para interceptar leitura e escrita. Externamente parece um atributo (p.nome), mas internamente executa lógica. Muito útil para validação e encapsulamento."},

{topic:"Classes",diff:"medium",type:"mc",
text:"Dado o código: class Impressora { static #count = 0; } — como acessar #count dentro de um método da classe?",
options:["this.#count","Impressora.#count","this.count","Impressora.count"],
answer:1,
exp:"Atributos estáticos privados são acessados pelo nome da classe, não por this. Impressora.#count acessa o atributo estático privado. this.#count tentaria um atributo de instância."},

{topic:"Classes",diff:"hard",type:"mc",
text:"Por que a notação de classes ES6+ não suporta nativamente encapsulamento completo, interfaces ou classes abstratas?",
options:["Por limitação de hardware","Porque internamente as classes ES6 são apenas açúcar sintático sobre funções e prototype — a representação anterior continua","Por decisão de segurança","Porque foi descontinuado"],
answer:1,
exp:"Classes ES6 são açúcar sintático — internamente usam prototype como antes do ES6. Por isso herdam limitações: sem interfaces, sem abstract, sem modificadores de acesso além do # para privado."},

{topic:"Classes",diff:"medium",type:"tf",
text:"Assinale V ou F sobre classes e herança em JavaScript ES6+.",
statements:[
  {text:"Uma subclasse que define constructor pode acessar this antes de chamar super().",answer:false},
  {text:"O operador instanceof verifica se um objeto pertence a uma classe ou sua hierarquia.",answer:true},
  {text:"Atributos privados (#) são herdados pelas subclasses.",answer:false},
  {text:"super em um método (não constructor) chama o método de mesmo nome da classe pai.",answer:true}
],
exp:"Acessar this antes de super() em subclasse lança ReferenceError. instanceof verifica cadeia de prototype. Atributos # são privados e inacessíveis em subclasses. super.metodo() chama implementação do pai."},

{topic:"Classes",diff:"medium",type:"code",
text:"Crie uma classe Pessoa com getter e setter para o atributo privado #nome. O setter deve validar que o valor é uma string não vazia.",
answer:`class Pessoa {
  #nome = '';
  get nome() { return this.#nome; }
  set nome( valor ) {
    if ( typeof valor !== 'string' || valor.length === 0 ) {
      throw new Error('Nome inválido');
    }
    this.#nome = valor;
  }
}`,
keywords:["#nome","get nome","set nome","typeof","throw"],
exp:"Atributo privado #nome. Getter retorna o valor. Setter valida antes de atribuir — lança Error se inválido. Esse padrão combina encapsulamento com validação."},

{topic:"Classes",diff:"hard",type:"code",
text:"Implemente uma subclasse ClientePJ que herda de Cliente (que tem nome e email), adicionando o atributo cnpj e chamando o constructor pai corretamente.",
answer:`class ClientePJ extends Cliente {
  constructor( nome, email, cnpj ) {
    super( nome, email );
    this.cnpj = cnpj;
  }
}`,
keywords:["extends Cliente","constructor","super","cnpj"],
exp:"extends herda. super(args) chama constructor do pai — obrigatório primeiro. Depois this.cnpj. Esse padrão foi mostrado nos slides com o exemplo ClientePJ."},

// ══════════════════ MÓDULOS (extra) ══════════════════
{topic:"Módulos",diff:"medium",type:"mc",
text:"Como importar TODOS os exports de um módulo num único objeto namespace chamado 'mat'?",
options:["import mat from './matematica.js'","import { * } as mat from './matematica.js'","import * as mat from './matematica.js'","import all mat from './matematica.js'"],
answer:2,
exp:"import * as mat from './arquivo.js' agrupa todos os exports nomeados no objeto mat. Acesso: mat.funcao(), mat.CONSTANTE. Útil quando há muitos exports."},

{topic:"Módulos",diff:"hard",type:"mc",
text:"Em ESM, qual é o escopo das declarações feitas no nível do módulo?",
options:["Global — ficam em window","De módulo — não vão para o escopo global nem para window","De função — válidas apenas dentro de funções","De arquivo — compartilhado entre scripts do mesmo HTML"],
answer:1,
exp:"Em módulos ESM, declarações no nível do módulo ficam no escopo do módulo — não são adicionadas ao objeto global (window). Isso evita colisões de nomes."},

{topic:"Módulos",diff:"medium",type:"tf",
text:"Assinale V ou F sobre módulos ESM.",
statements:[
  {text:"Um módulo pode exportar múltiplas exportações nomeadas e uma default ao mesmo tempo.",answer:true},
  {text:"Ao importar um módulo com alias: import { soma as somar }, o nome original 'soma' fica acessível localmente.",answer:false},
  {text:"Módulos ESM são carregados de forma diferida (deferred) por padrão.",answer:true},
  {text:"CommonJS (require/module.exports) e ESM (import/export) podem ser misturados livremente no mesmo arquivo.",answer:false}
],
exp:"Com alias, apenas 'somar' fica acessível, não 'soma'. Módulos ESM têm defer implícito. CommonJS e ESM não se misturam facilmente — são sistemas diferentes."},

{topic:"Módulos",diff:"hard",type:"code",
text:"Escreva um módulo ESM 'matematica.js' que exporta uma constante PI e uma função multiplicar de forma NOMEADA, e exporta uma classe Calculadora como DEFAULT.",
answer:`export const PI = 3.14159;
export function multiplicar( a, b ) { return a * b; }
export default class Calculadora {}`,
keywords:["export const PI","export function multiplicar","export default class Calculadora"],
exp:"Exports nomeados: export const/function/class diretamente. Export default: uma por módulo, sem chaves na importação. Podem coexistir no mesmo módulo."},

// ══════════════════ STORAGE (extra) ══════════════════
{topic:"Storage",diff:"medium",type:"mc",
text:"O evento 'storage' do localStorage é disparado em qual contexto?",
options:["Na mesma aba que modificou o dado","Em OUTRAS abas/janelas da mesma origem, não na aba atual","Em qualquer aba do navegador","Apenas quando se usa sessionStorage"],
answer:1,
exp:"O evento storage é disparado em frames/abas/janelas DIFERENTES da que realizou a modificação. A aba atual não recebe o evento — use StorageEvent manualmente se precisar."},

{topic:"Storage",diff:"hard",type:"mc",
text:"O que contém event.oldValue no evento 'storage'?",
options:["O novo valor atribuído","O valor anterior à modificação; null em caso de inserção nova","O nome da chave modificada","A URL do storage"],
answer:1,
exp:"No StorageEvent: key=chave, oldValue=valor anterior (null em inserção), newValue=novo valor (null em remoção), url=URL onde ocorreu, storageArea=referência ao storage."},

{topic:"Storage",diff:"medium",type:"tf",
text:"Assinale V ou F sobre Web Storage.",
statements:[
  {text:"sessionStorage mantém os dados ao fazer refresh (F5) da página.",answer:true},
  {text:"localStorage e sessionStorage são acessíveis por Web Workers.",answer:false},
  {text:"O método clear() do Storage remove todos os itens e dispara o evento storage nas outras abas.",answer:true},
  {text:"localStorage.length retorna o número de chaves armazenadas.",answer:true}
],
exp:"sessionStorage sobrevive a refresh, mas não a fechar a aba. Web Workers não têm acesso a localStorage/sessionStorage (apenas IndexedDB). clear() dispara storage event com key=null."},

{topic:"Storage",diff:"easy",type:"code",
text:"Escreva como salvar o objeto {nome: 'Ana', idade: 30} no localStorage com a chave 'usuario'.",
answer:"localStorage.setItem('usuario', JSON.stringify({nome: 'Ana', idade: 30}));",
keywords:["localStorage.setItem","JSON.stringify","usuario"],
exp:"setItem(chave, valor). Valor deve ser string — JSON.stringify converte o objeto. Para recuperar: JSON.parse(localStorage.getItem('usuario'))."},

{topic:"Storage",diff:"medium",type:"code",
text:"Escreva como remover o item 'usuario' do localStorage e depois limpar TODO o localStorage.",
answer:`localStorage.removeItem('usuario');
localStorage.clear();`,
keywords:["removeItem","clear"],
exp:"removeItem(chave) remove apenas o item especificado. clear() remove TODOS os itens do storage. Use com cuidado — clear() afeta todos os dados do domínio."},

// ══════════════════ ARRAYS (extra) ══════════════════
{topic:"Arrays",diff:"medium",type:"mc",
text:"O que faz Array.from(new Set([1, 1, 2, 3]))?",
options:["Lança TypeError","Cria um array [1, 1, 2, 3]","Cria um array [1, 2, 3] sem duplicatas","Cria um Set de arrays"],
answer:2,
exp:"Set remove duplicatas. Array.from() converte o Set de volta para array. Equivalente a: [...new Set([1,1,2,3])]. Padrão para deduplicar arrays."},

{topic:"Arrays",diff:"medium",type:"mc",
text:"Qual é a diferença entre some() e every() em arrays?",
options:["São idênticos","some() retorna true se ALGUM elemento passar no teste; every() retorna true se TODOS passarem","some() modifica o array; every() não","every() é mais rápido"],
answer:1,
exp:"some() = lógica OR: para no primeiro true. every() = lógica AND: para no primeiro false. Ambos retornam boolean e não modificam o array."},

{topic:"Arrays",diff:"hard",type:"mc",
text:"Dado ['a','b','c'].findIndex(e => e === 'b'), qual é o retorno?",
options:["'b'","1","true","-1"],
answer:1,
exp:"findIndex() retorna o ÍNDICE do primeiro elemento que passa no teste (1, pois 'b' está na posição 1). Retorna -1 se não encontrar. find() retornaria o próprio elemento 'b'."},

{topic:"Arrays",diff:"medium",type:"tf",
text:"Assinale V ou F sobre utilitários de Array ES6+.",
statements:[
  {text:"some() e every() param a iteração assim que o resultado é determinado.",answer:true},
  {text:"findIndex() retorna o elemento encontrado, não o índice.",answer:false},
  {text:"[...new Set(['a','a','b'])] resulta em ['a','b'].",answer:true},
  {text:"forEach() retorna um novo array com os resultados.",answer:false}
],
exp:"some/every param cedo (short-circuit). findIndex retorna índice; find retorna elemento. Set + spread remove duplicatas. forEach retorna undefined — não retorna array."},

{topic:"Arrays",diff:"medium",type:"code",
text:"Dado o array nums = [1,2,3,4,5], use filter() e map() encadeados para obter um array com o dobro dos números pares.",
answer:"const result = nums.filter(n => n % 2 === 0).map(n => n * 2);",
keywords:["filter","n % 2","map","n * 2"],
exp:"filter(n => n%2===0) retorna [2,4]. .map(n => n*2) transforma para [4,8]. Encadear filter+map é um padrão muito comum — e era exatamente o que a prova pedia."},

// ══════════════════ EXCEÇÕES (extra) ══════════════════
{topic:"Exceções",diff:"medium",type:"mc",
text:"Como diferenciar o tipo de exceção capturada no catch(e)?",
options:["Pelo método e.type()","Usando instanceof para checar RangeError, TypeError etc., ou typeof e para outros tipos","Pelo número do erro","Exceções não podem ser diferenciadas"],
answer:1,
exp:"instanceof verifica se e é instância de uma classe de erro (e instanceof RangeError). typeof e verifica se é 'string', 'number' etc. Ambas as técnicas foram mostradas nos slides."},

{topic:"Exceções",diff:"hard",type:"mc",
text:"O que acontece com o fluxo quando uma exceção é lançada dentro de um bloco try que tem um bloco finally?",
options:["O finally não executa quando há exceção","finally executa, depois a exceção continua propagando (a menos que seja capturada pelo catch)","A exceção é automaticamente descartada","O programa encerra imediatamente"],
answer:1,
exp:"finally sempre executa. Se não houver catch para capturar a exceção, ela continua propagando após o finally. Se houver catch, a exceção é tratada e finally executa após o catch."},

{topic:"Exceções",diff:"medium",type:"tf",
text:"Assinale V ou F sobre exceções em JavaScript.",
statements:[
  {text:"Ao criar uma subclasse de Error, super(message) deve ser a primeira linha do constructor.",answer:true},
  {text:"O stack trace (pilha de execução) fica disponível em e.stack.",answer:true},
  {text:"É possível ter múltiplos blocos catch para diferentes tipos de exceção.",answer:false},
  {text:"throw pode lançar uma string simples, não apenas objetos Error.",answer:true}
],
exp:"JavaScript NÃO tem múltiplos catch por bloco (ao contrário de Java). Use instanceof dentro de um único catch para diferenciar. super() primeiro no constructor de Error. e.stack tem o rastro completo."},

{topic:"Exceções",diff:"hard",type:"code",
text:"Escreva um try/catch que chama a função processar(), trata diferente um RepositorioError de um Error genérico, e tem um finally que imprime 'finalizado'.",
answer:`try {
  processar();
} catch (e) {
  if (e instanceof RepositorioError) {
    console.error('Erro de repositório:', e.message);
  } else if (e instanceof Error) {
    console.error('Erro genérico:', e.message);
  }
} finally {
  console.log('finalizado');
}`,
keywords:["try","catch","instanceof RepositorioError","instanceof Error","finally"],
exp:"Um único catch com instanceof para diferenciar tipos. RepositorioError primeiro (mais específico), Error depois (mais genérico). finally sempre executa."},

// ══════════════════ OPERADORES (extra) ══════════════════
{topic:"Operadores",diff:"easy",type:"mc",
text:"O que faz o optional chaining operator ?. em: usuario?.endereco?.cidade ?",
options:["Lança erro se usuario for null","Retorna undefined se qualquer propriedade no caminho for null ou undefined, sem lançar erro","É uma sintaxe de ternário","Cria propriedade se não existir"],
answer:1,
exp:"?. para a avaliação e retorna undefined se o lado esquerdo for null/undefined, em vez de lançar TypeError. Equivale a: usuario && usuario.endereco && usuario.endereco.cidade."},

{topic:"Operadores",diff:"medium",type:"mc",
text:"O que faz o operador ?? (nullish coalescing): const x = valor ?? 'padrão' ?",
options:["Retorna 'padrão' se valor for qualquer falsy (0, '', false, null, undefined)","Retorna 'padrão' apenas se valor for null ou undefined","É equivalente ao operador ||","Verifica se valor é NaN"],
answer:1,
exp:"?? retorna o lado direito APENAS se o lado esquerdo for null ou undefined. Diferente de || que retorna o direito para qualquer falsy (0, '', false também). Útil para preservar 0 e strings vazias."},

{topic:"Operadores",diff:"hard",type:"mc",
text:"Dado: const { a, ...resto } = { a:1, b:2, c:3 } — qual é o valor de resto?",
options:["{b:2, c:3}","[2, 3]","{a:1, b:2, c:3}","undefined"],
answer:0,
exp:"Desestruturação de objeto com rest: a recebe 1, resto recebe as propriedades restantes {b:2, c:3}. Esse é o operador rest em desestruturação de objetos (ES2018)."},

{topic:"Operadores",diff:"medium",type:"tf",
text:"Assinale V ou F sobre operadores modernos do JavaScript.",
statements:[
  {text:"0 ?? 'padrão' retorna 'padrão' porque 0 é falsy.",answer:false},
  {text:"[] spread: [...[1,2], ...[3,4]] resulta em [1,2,3,4].",answer:true},
  {text:"O optional chaining (?.) pode ser usado para chamadas de funções: obj.metodo?.().",answer:true},
  {text:"O operador spread cria uma deep copy (cópia profunda) de objetos aninhados.",answer:false}
],
exp:"0 ?? 'padrão' retorna 0 (nullish só considera null/undefined). Spread de arrays funciona com literais. obj.metodo?.() chama se metodo existir. Spread é shallow copy — objetos aninhados são compartilhados."},

// ══════════════════ PROMISE/FETCH (extra) ══════════════════
{topic:"Promise/Fetch",diff:"medium",type:"mc",
text:"O que é o estado 'pending' de uma Promise?",
options:["A Promise foi rejeitada","A Promise foi resolvida com valor","A Promise ainda não foi resolvida nem rejeitada","A Promise foi cancelada"],
answer:2,
exp:"Estados de Promise: pending (inicial, aguardando), fulfilled (resolvida com valor), rejected (rejeitada com motivo). Uma vez saindo de pending, o estado é imutável."},

{topic:"Promise/Fetch",diff:"hard",type:"mc",
text:"Qual é a diferença entre Promise.all() e Promise.allSettled()?",
options:["São idênticos","all() rejeita se qualquer promise rejeitar; allSettled() aguarda TODAS e retorna resultados com status, independente de sucesso ou falha","allSettled() é mais rápido","all() retorna apenas valores; allSettled() retorna erros"],
answer:1,
exp:"Promise.all: fail-fast — rejeita imediatamente se qualquer promise rejeitar. Promise.allSettled (ES2020): aguarda todas e retorna [{status:'fulfilled',value:...} ou {status:'rejected',reason:...}]."},

{topic:"Promise/Fetch",diff:"medium",type:"mc",
text:"O que retorna response.json() em uma chamada fetch?",
options:["O objeto JavaScript diretamente","Uma Promise que resolve com o objeto JavaScript parseado","Uma string JSON","Um ReadableStream"],
answer:1,
exp:"response.json() retorna uma Promise — precisa de await ou .then(). Não é síncrono. Isso é uma pegadinha comum: confundir com JSON.parse() que é síncrono."},

{topic:"Promise/Fetch",diff:"medium",type:"tf",
text:"Assinale V ou F sobre Promises e fetch.",
statements:[
  {text:"Promise.race() retorna a promise que resolver ou rejeitar primeiro.",answer:true},
  {text:"fetch() rejeita a Promise para respostas com status 404.",answer:false},
  {text:"O método .finally() de uma Promise recebe o valor resolvido como argumento.",answer:false},
  {text:"Uma Promise no estado 'fulfilled' não pode mais mudar de estado.",answer:true}
],
exp:"fetch só rejeita para falha de rede (sem conexão). 404 é tratado como sucesso (response.ok=false). finally() não recebe argumentos. Estados fulfilled e rejected são finais (imutáveis)."},

{topic:"Promise/Fetch",diff:"hard",type:"code",
text:"Escreva como fazer uma requisição POST com fetch enviando JSON, com Content-Type correto e tratando erros.",
answer:`const response = await fetch('/api/usuarios', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome: 'Ana' })
});
if (!response.ok) {
  throw new Error('Erro: ' + response.status);
}
return response.json();`,
keywords:["fetch","POST","Content-Type","application/json","JSON.stringify","response.ok"],
exp:"POST precisa de method, headers com Content-Type, e body com JSON.stringify. response.ok verifica 200-299. response.json() retorna Promise com o objeto."},

// ══════════════════ ASYNC/AWAIT (extra) ══════════════════
{topic:"Async/Await",diff:"medium",type:"mc",
text:"O que acontece se uma função async não tiver await?",
options:["Erro de sintaxe","A função executa de forma síncrona e ainda retorna uma Promise","A função não executa","Torna-se uma função normal automaticamente"],
answer:1,
exp:"async sem await é válido — a função executa sincronamente (sem pausas) e ainda retorna uma Promise. Não é um erro, mas geralmente indica que o async é desnecessário."},

{topic:"Async/Await",diff:"hard",type:"mc",
text:"Como executar duas operações assíncronas em PARALELO com async/await (em vez de sequencialmente)?",
options:[
  "const a = await op1(); const b = await op2();",
  "const [a, b] = await Promise.all([op1(), op2()]);",
  "async const [a, b] = [op1(), op2()];",
  "await op1(); await op2();"
],
answer:1,
exp:"await op1(); await op2() executa sequencialmente. Para paralelo: iniciar ambas sem await, depois aguardar com Promise.all(). Isso reduz o tempo total para max(op1, op2) em vez de op1+op2."},

{topic:"Async/Await",diff:"medium",type:"tf",
text:"Assinale V ou F sobre async/await.",
statements:[
  {text:"Uma função async sempre retorna uma Promise, mesmo retornando void.",answer:true},
  {text:"await pode ser usado no top-level de módulos ESM (sem encapsular em função async).",answer:true},
  {text:"Erros em funções async sempre são capturados automaticamente pelo navegador.",answer:false},
  {text:"const p = funcaoAsync() sem await inicia a execução da função imediatamente.",answer:true}
],
exp:"Top-level await é suportado em módulos ESM. Erros não capturados em async geram UnhandledPromiseRejection — devem ser tratados com try/catch ou .catch(). p = funcaoAsync() sem await inicia mas não espera."},

{topic:"Async/Await",diff:"medium",type:"code",
text:"Reescreva o código abaixo usando async/await em vez de .then()/.catch():",
code:`fetch(url)
  .then(r => r.json())
  .then(dados => console.log(dados))
  .catch(e => console.error(e));`,
answer:`try {
  const r = await fetch(url);
  const dados = await r.json();
  console.log(dados);
} catch (e) {
  console.error(e);
}`,
keywords:["await fetch","await r.json","try","catch"],
exp:"async/await transforma chains de .then() em código sequencial. O .catch() vira o bloco catch do try/catch. Muito mais legível para operações encadeadas."},

// ══════════════════ REST/HTTP (extra) ══════════════════
{topic:"REST/HTTP",diff:"medium",type:"mc",
text:"Qual cabeçalho HTTP é usado para enviar credenciais de autenticação (como Bearer token)?",
options:["Content-Type","Accept","Authorization","Origin"],
answer:2,
exp:"Authorization: Bearer <token> envia credenciais. Content-Type indica o formato do corpo. Accept indica formatos aceitos. Origin indica a origem da requisição (CORS)."},

{topic:"REST/HTTP",diff:"medium",type:"mc",
text:"Qual cabeçalho de resposta configura a política de cache de um recurso?",
options:["Content-Type","Cache-Control","ETag","Location"],
answer:1,
exp:"Cache-Control define diretivas de cache (ex: no-cache, max-age=3600). ETag é um checksum para controle de cache condicional. Location redireciona o cliente. Set-Cookie define cookies."},

{topic:"REST/HTTP",diff:"hard",type:"mc",
text:"Qual das três abordagens de versionamento de API NÃO requer mudar a URL?",
options:["Na URL (/api/v1/produtos)","Como parâmetro (?v=1)","Por cabeçalho HTTP (X-Version: 1)","Todas requerem mudar a URL"],
answer:2,
exp:"Cabeçalho HTTP (X-Version: 1) não altera a URL. Na URL e como parâmetro ambos mudam a URL. O cabeçalho é mais limpo mas usar links GET para versões antigas requer JavaScript."},

{topic:"REST/HTTP",diff:"medium",type:"mc",
text:"O que significa 'mesma origem' (same-origin) em relação ao localStorage e requisições HTTP?",
options:["Mesmo arquivo HTML","Mesmo protocolo, domínio e porta","Mesmo servidor físico","Mesmo banco de dados"],
answer:1,
exp:"Mesma origem = mesmo protocolo (http/https) + mesmo domínio + mesma porta. https://site.com:443 e http://site.com:80 são origens DIFERENTES. Isso afeta localStorage, cookies e CORS."},

{topic:"REST/HTTP",diff:"medium",type:"tf",
text:"Assinale V ou F sobre HTTP e APIs RESTful.",
statements:[
  {text:"O método HTTP PATCH atualiza apenas parte de um recurso.",answer:true},
  {text:"O cabeçalho Content-Type: application/json indica que o servidor retorna JSON.",answer:false},
  {text:"Uma API RESTful organiza recursos em URLs hierárquicas como /usuarios/5/pedidos.",answer:true},
  {text:"O código 201 Created indica que a requisição foi bem-sucedida mas nenhum recurso foi criado.",answer:false}
],
exp:"Content-Type no request indica o formato do CORPO enviado; Accept indica o que o cliente aceita receber. 201 Created indica que um novo recurso foi criado (tipicamente após POST)."},

{topic:"REST/HTTP",diff:"medium",type:"code",
text:"Escreva uma chamada fetch para enviar dados JSON via POST para '/api/jogos' com o objeto {nome:'Zelda', nota:9.8}.",
answer:`await fetch('/api/jogos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome: 'Zelda', nota: 9.8 })
});`,
keywords:["fetch","POST","Content-Type","application/json","JSON.stringify"],
exp:"POST com JSON: method:'POST', header Content-Type:application/json, body com JSON.stringify. Sem isso o servidor receberá o corpo como texto plano."},


// ══════════════════════════════════════════════════════════
// QUESTÕES NO ESTILO DA PROVA — foco em escrita de código
// ══════════════════════════════════════════════════════════

// ── EXCEÇÃO DE VALIDAÇÃO (idêntico ao formato da Q1 da prova) ──

{topic:"Estilo Prova",diff:"easy",type:"code",
text:"[Q1-fácil] Em um ESM, crie a declaração completa de uma classe de exceção chamada EntradaInvalida que: herde de Error, redefina this.name e seja exportável como default.",
answer:`export default class EntradaInvalida extends Error {
  constructor( message ) {
    super( message );
    this.name = 'EntradaInvalida';
  }
}`,
keywords:["export default","class EntradaInvalida","extends Error","super","this.name"],
exp:"Mesma estrutura da Q1 da prova. export default = importação sem chaves. extends Error = herda da exceção padrão. super(message) primeiro. this.name redefine o nome que aparece no console."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Q1-variação] Em um ESM 'erros.js', crie uma classe NotFound que herde de Error, exporte-a como DEFAULT, e redefina o nome interno. Outro módulo deve conseguir fazer: import MeuErro from './erros.js'.",
answer:`export default class NotFound extends Error {
  constructor( message ) {
    super( message );
    this.name = 'NotFound';
  }
}`,
keywords:["export default","extends Error","super","this.name","NotFound"],
exp:"export default permite que o importador escolha qualquer nome: import MeuErro from './erros.js'. this.name = 'NotFound' garante que o console mostre 'NotFound: mensagem' em vez de 'Error: mensagem'."},

// ── CLASSE COM ATRIBUTOS PRIVADOS + VALIDAÇÃO (Q2a da prova) ──

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Q2a-parte 1] No ESM 'produto.js', declare a classe Produto com três atributos PRIVADOS: #nome, #preco e #quantidade. Adicione apenas getters públicos para cada um.",
answer:`export class Produto {
  #nome;
  #preco;
  #quantidade;

  get nome()       { return this.#nome; }
  get preco()      { return this.#preco; }
  get quantidade() { return this.#quantidade; }
}`,
keywords:["#nome","#preco","#quantidade","get nome","get preco","get quantidade"],
exp:"Atributos privados com # — inacessíveis fora da classe. Getters públicos sem o #. A questão da prova pedia APENAS getters (sem setters). Export nomeado (com chaves na importação)."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Considere a classe Produto abaixo, que importa a exceção EntradaInvalida (uma subclasse de Error). Escreva, DENTRO dessa classe, o MÉTODO PRIVADO #validar() — um método sem parâmetros e sem retorno que valida os atributos e lança 'new EntradaInvalida(mensagem)' quando: #nome não for string ou tiver menos de 2 caracteres; #preco não for número (use isNaN) ou for menor que 0; #quantidade não for número (use isNaN) ou for menor que 0. (Escreva apenas o método, com as chaves.)",
code:`import EntradaInvalida from './entrada-invalida.js';

export class Produto {
  #nome;
  #preco;
  #quantidade;
  // getters já existem...

  // 👉 escreva aqui o método #validar()
}`,
answer:`#validar() {
  if ( typeof this.#nome !== 'string' || this.#nome.length < 2 ) {
    throw new EntradaInvalida( 'Nome deve ter pelo menos 2 caracteres' );
  }
  if ( isNaN( this.#preco ) || Number( this.#preco ) < 0 ) {
    throw new EntradaInvalida( 'Preço deve ser número não negativo' );
  }
  if ( isNaN( this.#quantidade ) || Number( this.#quantidade ) < 0 ) {
    throw new EntradaInvalida( 'Quantidade deve ser número inteiro não negativo' );
  }
}`,
keywords:["#validar","typeof","this.#nome","isNaN","this.#preco","this.#quantidade","throw new EntradaInvalida"],
exp:"Método privado com #. Validação de tipo com typeof para strings. isNaN para números (não !Number). throw new EntradaInvalida (a classe criada na Q1). Mesma estrutura da correção da Q2a da prova."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Considere a classe Produto abaixo (com os atributos privados #nome, #preco, #quantidade e o método privado #validar() já definidos). Escreva, DENTRO dela, o CONSTRUCTOR que: recebe UM objeto e o desestrutura no parâmetro em {nome, preco, quantidade}; atribui cada valor ao atributo privado correspondente; e, por último, chama o método de validação com this.#validar(). (Escreva apenas o constructor.)",
code:`export class Produto {
  #nome;
  #preco;
  #quantidade;
  // getters e #validar() já existem...

  // 👉 escreva aqui o constructor
}`,
answer:`constructor( { nome, preco, quantidade } ) {
  this.#nome       = nome;
  this.#preco      = preco;
  this.#quantidade = quantidade;
  this.#validar();
}`,
keywords:["constructor","{ nome, preco, quantidade }","this.#nome","this.#preco","this.#quantidade","this.#validar"],
exp:"Desestruturação no parâmetro do constructor. Atribuição aos atributos privados. Chamada do método privado this.#validar() — não validar() sem this.#. Esse foi exatamente o erro mais comum na prova."},

// ── CADASTRO COM LOCALSTORAGE (Q2b da prova) ──

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"Escreva as PRIMEIRAS linhas de um módulo ESM de cadastro: (1) importe a classe Produto (exportada de forma nomeada) do arquivo './produto.js'; (2) registre a função salvar (que será definida mais abaixo no mesmo arquivo) como listener de clique do único <button> da página; (3) guarde o elemento <output> da página na constante output.",
answer:`import { Produto } from './produto.js';

document.querySelector('button').addEventListener('click', salvar);
const output = document.querySelector('output');`,
keywords:["import","Produto","./produto.js","addEventListener","click","salvar","querySelector","output"],
exp:"Import nomeado (com chaves) porque Produto foi exportado como 'export class'. Registrar o event listener antes de definir a função salvar é OK (hoisting). querySelector('output') para o elemento de saída."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Escreva a FUNÇÃO salvar(event) de um cadastro de produtos. Suponha que a classe Produto já foi importada e que a constante output referencia o <output> da página. A função deve: prevenir o comportamento padrão do formulário; ler os valores dos inputs de ids 'descricao', 'preco' e 'quantidade'; ler o array da chave 'produtos' do localStorage (use [] como padrão); dentro de um try, criar 'new Produto({ nome: descricao, preco, quantidade })', dar push de um OBJETO SIMPLES (não a instância) no array e salvar de volta no localStorage; no catch, exibir a mensagem do erro em output.innerText.",
answer:`function salvar( event ) {
  event.preventDefault();
  const descricao  = document.getElementById('descricao').value;
  const preco      = document.getElementById('preco').value;
  const quantidade = document.getElementById('quantidade').value;
  const lista = JSON.parse( localStorage.getItem('produtos') || '[]' );
  try {
    const p = new Produto( { nome: descricao, preco, quantidade } );
    lista.push( { nome: p.nome, preco: p.preco, quantidade: p.quantidade } );
    localStorage.setItem( 'produtos', JSON.stringify( lista ) );
  } catch ( e ) {
    output.innerText = e.message;
  }
}`,
keywords:["event.preventDefault","getElementById","JSON.parse","localStorage.getItem","new Produto","lista.push","JSON.stringify","localStorage.setItem","e.message"],
exp:"preventDefault() impede submit. JSON.parse + || '[]' protege contra chave inexistente. push de objeto simples (sem instância de classe). JSON.stringify para salvar. catch com e.message — não o objeto e inteiro."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Dentro da função salvar(event) de um cadastro (a constante output referencia o <output> da página), escreva o trecho do bloco de SUCESSO — logo após salvar no localStorage — que: exibe 'Salvo com sucesso' em output.innerText; e, após 2 segundos (setTimeout), limpa o output e os três campos do formulário (inputs de ids 'descricao', 'preco' e 'quantidade', zerando o .value de cada um).",
answer:`output.innerText = 'Salvo com sucesso';
setTimeout( () => {
  output.innerText = '';
  document.getElementById('descricao').value  = '';
  document.getElementById('preco').value      = '';
  document.getElementById('quantidade').value = '';
}, 2000 );`,
keywords:["output.innerText","Salvo com sucesso","setTimeout","2000","value = ''"],
exp:"Mensagem de sucesso imediata. setTimeout com 2000ms (2 segundos) para limpar. Limpar output.innerText E os campos do formulário — erro comum na prova foi não limpar os campos."},

// ── LISTAGEM COM MAP/FILTER/DOM (Q3 da prova) ──

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"Escreva o trecho de inicialização de um módulo de listagem. Suponha que existem as funções listar(texto) (redesenha a lista) e pesquisar(event) (definidas no mesmo arquivo). No evento DOMContentLoaded do documento, chame listar('') para mostrar todos os itens e registre pesquisar como listener de clique do <button> da página.",
answer:`document.addEventListener( 'DOMContentLoaded', () => {
  listar( '' );
  document.querySelector( 'button' ).addEventListener( 'click', pesquisar );
} );`,
keywords:["DOMContentLoaded","listar","addEventListener","click","pesquisar"],
exp:"DOMContentLoaded garante que o DOM está pronto. Chamar listar('') ao carregar mostra todos os itens. Registrar o click no botão. Erro da prova: não chamar listar() ao carregar — lista ficava vazia."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Escreva a FUNÇÃO pesquisar(event). Suponha que existe a função listar(texto), que redesenha a lista filtrando pelo texto recebido. pesquisar deve: prevenir o comportamento padrão do formulário; ler o valor do <input> de pesquisa da página; e chamar listar(valor) com esse texto.",
answer:`function pesquisar( event ) {
  event.preventDefault();
  const texto = document.querySelector( 'input' ).value;
  listar( texto );
}`,
keywords:["event.preventDefault","querySelector","input","value","listar"],
exp:"Simples mas essencial: preventDefault() no botão dentro de form. Ler o valor do input. Delegar para listar(texto). Mantém separação de responsabilidades."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Escreva a FUNÇÃO listar(pesquisa), onde 'pesquisa' é o texto de filtro (string). Cada item salvo é um objeto { nome, preco, quantidade }. A função deve: ler o array da chave 'produtos' do localStorage (padrão []); limpar o <ul> da página (replaceChildren); filtrar os itens cujo nome contém a pesquisa (includes); mapear cada item para a string 'nome – R$ preco – quantidade un'; e, para cada string, criar um <li> (SEM innerHTML) e anexá-lo ao <ul>. Use filter(), map() e arrow functions.",
answer:`function listar( pesquisa ) {
  const lista = JSON.parse( localStorage.getItem('produtos') || '[]' );
  const ul = document.querySelector( 'ul' );
  ul.replaceChildren();
  lista
    .filter( p => p.nome.includes( pesquisa ) )
    .map( p => \`\${p.nome} – R$ \${p.preco} – \${p.quantidade} un\` )
    .forEach( texto => {
      const li = document.createElement( 'li' );
      li.append( texto );
      ul.append( li );
    } );
}`,
keywords:["JSON.parse","localStorage.getItem","replaceChildren","filter","includes","map","forEach","createElement","li","append"],
exp:"replaceChildren() limpa o ul — erro comum na prova foi não limpar. filter().map().forEach() encadeados. createElement('li') + li.append(texto) — append aceita string. li.appendChild(texto) erraria pois appendChild só aceita Node."},

// ── VERDADEIRO/FALSO (Q4 da prova) ──

{topic:"Estilo Prova",diff:"medium",type:"tf",
text:"[Q4 — no estilo da prova] Assinale V para Verdadeiro e F para Falso.",
statements:[
  {text:"getElementsByTagName('div') retorna apenas o primeiro elemento div da página.",answer:false},
  {text:"createDocumentFragment() cria um fragmento fora do DOM — invisível — para melhorar performance de inserção.",answer:true},
  {text:"O finally de um try/catch/finally executa mesmo que o try contenha um return.",answer:true},
  {text:"append() aceita strings de texto como argumento, diferente de appendChild() que só aceita Node.",answer:true}
],
exp:"getElementsByTagName retorna TODOS (HTMLCollection). createDocumentFragment cria nó fora do DOM — invisível, não visível. finally sempre executa. append() aceita Node e DOMString — era a diferença crucial na Q3 da prova."},

// ── COMPLETAR LACUNAS (Q5 da prova — estilo) ──

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Q5a — rest em array] Ao chamar g([10, 20, 30, 40]) para a função g([a, b, ...c]), escreva os valores de a, b e c.",
answer:`a = 10
b = 20
c = [30, 40]`,
keywords:["a = 10","b = 20","c = [30, 40]"],
exp:"Desestruturação de array com rest: a recebe o 1º elemento, b o 2º, ...c coleta o restante em array. Esse é o mesmo padrão do item 5a da prova com [1,2,3,4,5]."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Q5b — rest em objeto] Ao chamar h({x:1, y:2, z:3}) para a função h({x, w, ...resto}), escreva os valores de x, w e resto.",
answer:`x = 1
w = undefined
resto = { y: 2, z: 3 }`,
keywords:["x = 1","w = undefined","resto = { y: 2, z: 3 }"],
exp:"Desestruturação de objeto com rest: x recebe 1. w não existe no objeto → undefined. ...resto coleta as propriedades restantes: {y:2, z:3}. Mesmo padrão do item 5b da prova."},

{topic:"Estilo Prova",diff:"easy",type:"code",
text:"[Q5c — clearInterval] Para parar o timer: const t = setInterval(() => console.log('tick'), 500); — escreva a instrução correta.",
answer:"clearInterval(t);",
keywords:["clearInterval","t"],
exp:"clearInterval(t) para um setInterval. clearTimeout é para setTimeout. Na prova o erro foi escrever preventTime(t) — função inexistente."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Q5d — classList.toggle] Dado um <div class='ativo'> entre outros divs, escreva o código para alternar (adicionar/remover) a classe 'ativo' nessa div específica.",
answer:`document.querySelector('div.ativo').classList.toggle('ativo');`,
keywords:["querySelector","div.ativo","classList.toggle","ativo"],
exp:"querySelector('div.ativo') seleciona o div que JÁ tem a classe ativo. classList.toggle() adiciona se ausente, remove se presente. Na prova: seletor genérico 'div' não funciona — precisava ser específico 'div.ativo'."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Q5e — dialog.showModal()] Dado <dialog id='modal'>Conteúdo</dialog>, escreva o código para exibir esse diálogo de forma MODAL (bloqueando o fundo).",
answer:`const dialog = document.getElementById('modal');
dialog.showModal();`,
keywords:["getElementById","modal","showModal"],
exp:"showModal() exibe o dialog como modal — bloqueia interação com o restante da página. show() exibe sem bloquear. Na prova o erro foi escrever 'SHOW MODAL' com espaço (não é um método) ou esquecer o getElementById."},

// ── QUESTÕES MISTAS ADICIONAIS NO ESTILO PROVA ──

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Variação Q2a] Crie a classe Tarefa em um ESM com atributos privados #titulo (string, 3-50 chars) e #concluida (boolean). Adicione getters e um constructor desestruturado que chama #validar().",
answer:`export class Tarefa {
  #titulo;
  #concluida;

  get titulo()    { return this.#titulo; }
  get concluida() { return this.#concluida; }

  constructor( { titulo, concluida } ) {
    this.#titulo    = titulo;
    this.#concluida = concluida;
    this.#validar();
  }

  #validar() {
    if ( typeof this.#titulo !== 'string' ||
         this.#titulo.length < 3 || this.#titulo.length > 50 ) {
      throw new Error( 'Título deve ter entre 3 e 50 caracteres' );
    }
    if ( typeof this.#concluida !== 'boolean' ) {
      throw new Error( 'Concluída deve ser boolean' );
    }
  }
}`,
keywords:["export class Tarefa","#titulo","#concluida","get titulo","get concluida","constructor","{ titulo, concluida }","this.#validar","#validar","typeof","throw new Error"],
exp:"Estrutura completa no estilo da Q2a. Export nomeado. Privados com #. Apenas getters. Constructor desestruturado. this.#validar() com # — erro comum é chamar sem o #. Validações com typeof."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Crie um módulo ESM completo de cadastro de tarefas. A classe Tarefa (export nomeado) está em './tarefa.js' e recebe { titulo, concluida }. O formulário tem um input de texto id 'titulo' e um checkbox id 'concluida' (use .checked para o booleano). O módulo deve: importar Tarefa; guardar o <output> em output; registrar a função salvar no clique do <button>. Em salvar(event): prevenir o padrão; ler titulo e concluida do DOM; ler o array da chave 'tarefas' (padrão []); dentro de um try, criar new Tarefa, dar push de um OBJETO SIMPLES, salvar no localStorage, mostrar 'Salvo!' em output e limpá-lo após 2s; no catch, mostrar a mensagem do erro em output.",
answer:`import { Tarefa } from './tarefa.js';

const output = document.querySelector('output');
document.querySelector('button').addEventListener('click', salvar);

function salvar( event ) {
  event.preventDefault();
  const titulo    = document.getElementById('titulo').value;
  const concluida = document.getElementById('concluida').checked;
  const lista = JSON.parse( localStorage.getItem('tarefas') || '[]' );
  try {
    const t = new Tarefa( { titulo, concluida } );
    lista.push( { titulo: t.titulo, concluida: t.concluida } );
    localStorage.setItem( 'tarefas', JSON.stringify( lista ) );
    output.innerText = 'Salvo!';
    setTimeout( () => { output.innerText = ''; }, 2000 );
  } catch ( e ) {
    output.innerText = e.message;
  }
}`,
keywords:["import","Tarefa","addEventListener","event.preventDefault","getElementById","JSON.parse","localStorage.getItem","new Tarefa","lista.push","JSON.stringify","localStorage.setItem","output.innerText","e.message","setTimeout"],
exp:"Padrão completo da Q2b. Import nomeado. Ler DOM. JSON.parse+||'[]'. new + push de objeto simples (nunca a instância). setItem com stringify. Sucesso com setTimeout. Catch com e.message."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Crie um módulo ESM completo de listagem de tarefas. Cada tarefa salva é um objeto { titulo, concluida }, na chave 'tarefas' do localStorage. O módulo deve ter: no DOMContentLoaded, chamar listar('') e registrar pesquisar no clique do <button>; a função pesquisar(event) que previne o padrão e chama listar com o valor do <input>; e a função listar(pesquisa) que lê o array (padrão []), limpa o <ul> (replaceChildren), filtra por título que contém a pesquisa, mapeia cada um para o texto 'titulo — concluída: sim/não' e cria um <li> por item (SEM innerHTML). Use filter(), map(), forEach() e arrow functions.",
answer:`document.addEventListener( 'DOMContentLoaded', () => {
  listar( '' );
  document.querySelector('button').addEventListener('click', pesquisar);
} );

function pesquisar( event ) {
  event.preventDefault();
  listar( document.querySelector('input').value );
}

function listar( pesquisa ) {
  const lista = JSON.parse( localStorage.getItem('tarefas') || '[]' );
  const ul = document.querySelector('ul');
  ul.replaceChildren();
  lista
    .filter( t => t.titulo.includes( pesquisa ) )
    .map( t => \`\${t.titulo} — concluída: \${t.concluida ? 'sim' : 'não'}\` )
    .forEach( texto => {
      const li = document.createElement('li');
      li.append( texto );
      ul.append( li );
    } );
}`,
keywords:["DOMContentLoaded","listar","pesquisar","event.preventDefault","JSON.parse","replaceChildren","filter","includes","map","forEach","createElement","li","append"],
exp:"Padrão completo Q3. DOMContentLoaded + listar('') inicial. Separar pesquisar() e listar(). replaceChildren() para limpar. filter+map+forEach encadeados. li.append(texto) — texto é string, append aceita isso, appendChild não."},

// ── QUESTÕES DE CÓDIGO ADICIONAIS (análise de comportamento) ──

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"Dado o código, qual o output? Explique:",
code:`const arr = [1,2,3,4,5];
const r = arr.filter(n => n % 2 === 0).map(n => n * 10);
console.log(r);`,
answer:"[20, 40]",
keywords:["20","40"],
exp:"filter(n => n%2===0) retorna [2,4]. map(n => n*10) transforma para [20,40]. arr original não é modificado. Encadeamento de filter+map é padrão recorrente na disciplina e na prova."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"Dado o código, qual o output?",
code:`const obj = { a:1, b:2, c:3 };
const { a, ...resto } = obj;
console.log(a);
console.log(resto);`,
answer:`1
{ b: 2, c: 3 }`,
keywords:["1","b: 2","c: 3"],
exp:"Desestruturação de objeto com rest: a=1, resto={b:2, c:3}. O operador ... no lado esquerdo de uma desestruturação é rest (coleta o que sobrar), não spread."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Dado o código, qual o output? Explique cada linha:",
code:`const x = 0 ?? 'padrão';
const y = 0 || 'padrão';
const z = null ?? 'padrão';
console.log(x, y, z);`,
answer:`0 'padrão' 'padrão'`,
keywords:["0","padrão"],
exp:"?? só considera null/undefined como nulo: 0 ?? 'padrão' = 0 (0 não é null/undefined). || considera qualquer falsy: 0 || 'padrão' = 'padrão' (0 é falsy). null ?? 'padrão' = 'padrão' (null é nullish)."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Dado o código, o que acontece e por quê?",
code:`class Produto {
  #preco;
  constructor(preco) { this.#preco = preco; }
  get preco() { return this.#preco; }
}
const p = new Produto(10);
console.log(p.preco);
p.#preco = 20;`,
answer:`10
SyntaxError (ou TypeError): atributo privado não pode ser acessado fora da classe`,
keywords:["10","privado","erro"],
exp:"p.preco via getter funciona (retorna this.#preco = 10). p.#preco = 20 fora da classe lança SyntaxError em tempo de compilação — atributos # são estritamente privados, inacessíveis externamente."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"Escreva o código para registrar um evento que execute a função iniciar() apenas UMA VEZ no clique do botão com id 'btn'.",
answer:`document.getElementById('btn').addEventListener('click', iniciar, { once: true });`,
keywords:["addEventListener","click","iniciar","once","true"],
exp:"A opção { once: true } faz o listener se auto-remover após a primeira execução. Alternativa seria chamar removeEventListener dentro de iniciar(), mas { once: true } é mais limpo."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"Escreva o código para criar um <tr> com duas células contendo 'João' e '30', sem usar innerHTML, e adicionar ao <tbody> da página.",
answer:`const tr = document.createElement('tr');
const td1 = document.createElement('td');
td1.append('João');
const td2 = document.createElement('td');
td2.append('30');
tr.append(td1, td2);
document.querySelector('tbody').append(tr);`,
keywords:["createElement","tr","td","append","tbody"],
exp:"createElement cria os nós. append() aceita string diretamente (sem createTextNode). tr.append(td1, td2) adiciona múltiplos filhos de uma vez. Adicionar ao DOM por último (uma operação = um reflow)."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Crie uma função async obterProdutos(url) que: faz fetch GET na url; lança Error se status >= 400; retorna o JSON. Trate erros com try/catch e relance.",
answer:`async function obterProdutos( url ) {
  try {
    const response = await fetch( url );
    if ( response.status >= 400 ) {
      throw new Error( 'Erro ao obter produtos: ' + response.status );
    }
    return response.json();
  } catch ( erro ) {
    console.error( erro.message );
    throw erro;
  }
}`,
keywords:["async function","await fetch","response.status","throw new Error","return response.json","catch","throw erro"],
exp:"async + await. fetch não lança para erros HTTP — checar status manualmente. return response.json() sem await no return (Promise é retornada implicitamente). Relançar o erro com 'throw erro' para o chamador tratar."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Crie a função async removerItem(id) que: faz DELETE em '/api/itens/{id}'; trata 404 com mensagem 'Item não encontrado'; trata outros erros com 'Erro ao remover'. Após sucesso, remove do DOM o <tr> cujo td tem data-id igual ao id.",
answer:`async function removerItem( id ) {
  const response = await fetch( \`/api/itens/\${id}\`, { method: 'DELETE' } );
  if ( response.status === 404 ) {
    throw new Error( 'Item não encontrado' );
  }
  if ( !response.ok ) {
    throw new Error( 'Erro ao remover' );
  }
  const tr = document.querySelector( \`tbody tr td[data-id="\${id}"]\` )?.parentElement;
  tr?.remove();
}`,
keywords:["fetch","DELETE","response.status","404","response.ok","throw new Error","querySelector","data-id","parentElement","remove"],
exp:"Template literal na URL. method:'DELETE'. 404 específico primeiro. !response.ok para erros genéricos. Seletor com atributo: td[data-id='X']. Optional chaining para não errar se não encontrar. parentElement sobe ao tr. remove() exclui do DOM."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"Escreva um módulo ESM 'servico.js' que exporta uma classe ServicoItens com um método async obterTodos() que faz fetch GET em 'http://localhost:3000/itens' e retorna o JSON (trate erros HTTP).",
answer:`const API = 'http://localhost:3000';

export class ServicoItens {
  async obterTodos() {
    const response = await fetch( \`\${API}/itens\` );
    if ( !response.ok ) {
      throw new Error( 'Erro ao obter itens.' );
    }
    return response.json();
  }
}`,
keywords:["export class ServicoItens","async obterTodos","await fetch","response.ok","throw new Error","return response.json"],
exp:"Export nomeado da classe. Método async. fetch com URL construída por template literal. !response.ok para detectar erros. return response.json() retorna Promise (o chamador faz await). Padrão do servico-jogos.js do projeto."},

// ══════════════════════════════════════════════════════════
// MVC / MVP  (conteúdo da P2 — baseado em aula11: calculadora e jogos)
// ══════════════════════════════════════════════════════════

{topic:"MVC/MVP",diff:"easy",type:"mc",
text:"No padrão MVC, o que significam as três letras?",
options:["Model, View, Controller (Modelo, Visão, Controladora)","Module, Variable, Class","Main, Visual, Core","Method, Value, Component"],
answer:0,
exp:"MVC = Model (Modelo: regras de negócio/dados), View (Visão: interface/DOM) e Controller (Controladora: orquestra a interação). Separa responsabilidades para facilitar manutenção e testes."},

{topic:"MVC/MVP",diff:"medium",type:"mc",
text:"Qual a principal diferença entre MVC e MVP nos projetos da disciplina?",
options:[
  "Não há diferença prática",
  "No MVC a Controladora cria a Visão (Visão passiva, recebe callbacks); no MVP a Visão cria a Controladora/Apresentador passando 'this' e o chama diretamente",
  "MVP não usa Modelo",
  "MVC só funciona com fetch e MVP só com localStorage"
],
answer:1,
exp:"No MVC a Controladora é o centro: instancia a Visão e registra callbacks nela (aoDispararSomar(cb)). No MVP a Visão é o ponto de entrada: cria 'new ControladoraCalculo(this)' e chama 'this.controladora.somar()'. O Apresentador guarda a referência da Visão."},

{topic:"MVC/MVP",diff:"medium",type:"tf",
text:"Assinale V ou F sobre MVC/MVP nos projetos da disciplina.",
statements:[
  {text:"No MVP, a Visão chama métodos da Controladora diretamente (ex.: this.controladora.somar()).",answer:true},
  {text:"O Modelo (ex.: Calculadora) deve manipular o DOM diretamente.",answer:false},
  {text:"No MVC do projeto, a Visão expõe métodos de entrada/saída (obterNumero1, mostrarResultado) e não conhece a Controladora.",answer:true},
  {text:"O Serviço (ServicoJogos) é responsável por acessar a API via fetch.",answer:true}
],
exp:"O Modelo contém regras de negócio e NÃO acessa o DOM — quem faz isso é a Visão. No MVC a Visão é passiva (recebe callbacks). No MVP a Visão conhece e chama a Controladora. O Serviço isola o acesso a dados."},

{topic:"MVC/MVP",diff:"medium",type:"code",
text:"[Modelo MVP] Crie a classe Calculadora (export nomeado) com o método somar(n1, n2) que converte ambos com Number, lança Error se algum não for número (use isNaN) e retorna a soma.",
answer:`export class Calculadora {
  somar( n1, n2 ) {
    const numero1 = Number( n1 );
    if ( isNaN( numero1 ) ) {
      throw new Error( 'Por favor informe um numero em n1.' );
    }
    const numero2 = Number( n2 );
    if ( isNaN( numero2 ) ) {
      throw new Error( 'Por favor informe um numero em n2.' );
    }
    return numero1 + numero2;
  }
}`,
keywords:["export class Calculadora","somar","Number","isNaN","throw new Error","return"],
exp:"O Modelo concentra a regra de negócio (validar e somar) e NÃO toca no DOM. Number() converte; isNaN() detecta entrada inválida; throw delega o tratamento à Controladora via try/catch."},

{topic:"MVC/MVP",diff:"hard",type:"code",
text:"Crie a classe ControladoraCalculo (Apresentador do MVP). Use a classe Calculadora (de './calculadora.js'), cujo método somar(n1, n2) devolve a soma ou lança Error. Ela recebe no constructor o objeto 'visao', que tem os métodos obterNumero1(), obterNumero2(), mostrarResultado(valor) e mostrarErro(erro). A classe deve: importar Calculadora; no constructor, guardar a visao e criar 'this.modelo = new Calculadora()'; ter o método somar (como ARROW function, para fixar o this) que lê n1 e n2 da visao e, num try, chama this.modelo.somar(n1, n2) e passa o resultado a this.visao.mostrarResultado(); no catch, chama this.visao.mostrarErro(erro).",
answer:`import { Calculadora } from './calculadora.js';

export class ControladoraCalculo {
  constructor( visao ) {
    this.modelo = new Calculadora();
    this.visao = visao;
  }

  somar = () => {
    const n1 = this.visao.obterNumero1();
    const n2 = this.visao.obterNumero2();
    try {
      const resultado = this.modelo.somar( n1, n2 );
      this.visao.mostrarResultado( resultado );
    } catch ( erro ) {
      this.visao.mostrarErro( erro );
    }
  }
}`,
keywords:["import","Calculadora","constructor","visao","this.modelo","new Calculadora","somar","obterNumero1","obterNumero2","try","this.modelo.somar","mostrarResultado","catch","mostrarErro"],
exp:"No MVP o Apresentador guarda a referência da Visão (recebida no constructor). somar como arrow function mantém o this léxico. try/catch encaminha o resultado ou o erro de volta à Visão."},

{topic:"MVC/MVP",diff:"hard",type:"code",
text:"Crie a classe VisaoCalculadora (a Visão do MVP). Use a classe ControladoraCalculo (de './controladora-calculo.js'), que tem o método somar(). A Visão deve: importar a Controladora; no constructor, criar 'this.controladora = new ControladoraCalculo(this)' passando a si mesma; ter um método iniciar() que registra um listener de clique no <button> da página, prevenindo o padrão e chamando this.controladora.somar() (use arrow function para preservar o this).",
answer:`import { ControladoraCalculo } from './controladora-calculo.js';

export class VisaoCalculadora {
  constructor() {
    this.controladora = new ControladoraCalculo( this );
  }

  iniciar() {
    document.querySelector('button').addEventListener('click', event => {
      event.preventDefault();
      this.controladora.somar();
    });
  }
}`,
keywords:["import","ControladoraCalculo","constructor","this.controladora","new ControladoraCalculo( this )","iniciar","addEventListener","click","event.preventDefault","this.controladora.somar"],
exp:"No MVP a Visão é o ponto de entrada e cria o Apresentador passando 'this'. Assim o Apresentador pode chamar de volta os métodos da Visão (mostrarResultado/mostrarErro). A arrow no listener preserva o this da Visão."},

// ══════════════════════════════════════════════════════════
// QUESTÕES DE ESCRITA — baseadas nos projetos e provas reais
// ══════════════════════════════════════════════════════════

// ── Serviço com #privados + get/set + paraObjeto + problemas (prova 2025-2) ──
{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Prova 2025-2 Q2] Crie a classe Servico (ESM) com atributos privados #descricao e #valor; constructor recebe objeto {descricao, valor}; getters e setters para ambos; e um método paraObjeto() que retorna um objeto simples com valor e descricao.",
answer:`export class Servico {
  #descricao;
  #valor;
  constructor( cadastro ) {
    this.#descricao = cadastro.descricao;
    this.#valor = cadastro.valor;
  }
  get valor() { return this.#valor; }
  set valor( valorNovo ) { this.#valor = valorNovo; }
  get descricao() { return this.#descricao; }
  set descricao( descricaoNova ) { this.#descricao = descricaoNova; }
  paraObjeto() {
    return { valor: this.#valor, descricao: this.#descricao };
  }
}`,
keywords:["export class Servico","#descricao","#valor","constructor","cadastro.descricao","cadastro.valor","get valor","set valor","get descricao","set descricao","paraObjeto","return"],
exp:"Atributos privados com #. Constructor recebe o objeto e atribui. paraObjeto() é essencial: converte a INSTÂNCIA em objeto simples antes de salvar no localStorage (a instância perderia métodos/privados ao serializar)."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Considere a classe Servico abaixo, com os atributos privados #descricao e #valor (e seus getters). Escreva, DENTRO dela, o MÉTODO problemas() — um método público, sem parâmetros, que NÃO lança exceção: ele monta e RETORNA um array de mensagens de erro (vazio se estiver tudo certo). Adicione uma mensagem quando: #descricao tiver menos de 2 ou mais de 50 caracteres; #valor não for número (use isNaN(Number(...))) ou for menor que 50 ou maior que 5000.",
code:`export class Servico {
  #descricao;
  #valor;
  // constructor e getters já existem...

  // 👉 escreva aqui o método problemas()
}`,
answer:`problemas() {
  let problema = [];
  if ( this.#descricao.length < 2 ) {
    problema.push( \`A descricao: \${this.#descricao} apresenta menos que 2 caracteres;\` );
  } else if ( this.#descricao.length > 50 ) {
    problema.push( \`A descricao: \${this.#descricao} apresenta mais que 50 caracteres;\` );
  }
  if ( isNaN( Number( this.#valor ) ) ) {
    problema.push( \`Valor: \${this.#valor} precisa ser um numero\` );
  } else if ( this.#valor < 50 ) {
    problema.push( \`Valor: \${this.#valor} precisa ser maior que 50 reais\` );
  } else if ( this.#valor > 5000 ) {
    problema.push( \`Valor: \${this.#valor} precisa ser menor que 5.000 Reais\` );
  }
  return problema;
}`,
keywords:["problemas","problema","this.#descricao.length","push","isNaN","Number","this.#valor","return problema"],
exp:"Padrão de validação que RETORNA uma lista de erros (em vez de lançar exceção). Quem chama verifica problemas.length > 0. isNaN(Number(valor)) é a forma correta de checar se a string é numérica."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Escreva a FUNÇÃO salvar(event) de um cadastro de serviços. Suponha que a classe Servico já foi importada — ela recebe { descricao, valor }, tem o método problemas() (retorna um array de mensagens de erro, vazio se ok) e paraObjeto() (retorna um objeto simples). A função deve: prevenir o padrão; ler os inputs de ids 'descricao' e 'valor'; criar new Servico; pegar o <output>; SE cadastro.problemas() tiver itens, montar uma string com cada erro em <p>, jogá-la em output.innerHTML e dar return; SENÃO, ler o array da chave 'Servicos' (padrão []), dar push de cadastro.paraObjeto(), salvar no localStorage, mostrar 'Cadastro realizado com sucesso' em output e chamar form.reset().",
answer:`function salvar( event ) {
  event.preventDefault();
  const descricao = document.getElementById('descricao').value;
  const valor = document.getElementById('valor').value;
  const cadastro = new Servico( { descricao, valor } );
  const problemas = cadastro.problemas();
  const output = document.querySelector('output');
  if ( problemas.length > 0 ) {
    let texto = '';
    for ( const p of problemas ) {
      texto += \`<p>\${p}</p>\`;
    }
    output.innerHTML = texto;
    return;
  }
  const servicos = JSON.parse( localStorage.getItem('Servicos') ) || [];
  servicos.push( cadastro.paraObjeto() );
  localStorage.setItem( 'Servicos', JSON.stringify( servicos ) );
  output.innerText = 'Cadastro realizado com sucesso';
  document.querySelector('form').reset();
}`,
keywords:["function salvar","event.preventDefault","getElementById","new Servico","problemas","problemas.length","for","innerHTML","JSON.parse","localStorage.getItem","push","paraObjeto","localStorage.setItem","JSON.stringify","form","reset"],
exp:"Fluxo completo da Q3: validar primeiro (problemas.length), exibir erros e retornar cedo. No sucesso: push de paraObjeto() (objeto simples, nunca a instância), stringify e setItem. form.reset() limpa o formulário."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Prova 2025-2] Escreva a função buscarCadastro() que lê a chave 'Servicos' do localStorage e retorna a lista, ou um array vazio se a chave não existir (valor null).",
answer:`export function buscarCadastro() {
  const cadastroLista = JSON.parse( localStorage.getItem('Servicos') );
  if ( cadastroLista == null ) {
    return [];
  }
  return cadastroLista;
}`,
keywords:["buscarCadastro","JSON.parse","localStorage.getItem","Servicos","== null","return []","return cadastroLista"],
exp:"getItem retorna null se a chave não existir; JSON.parse(null) é null. Verificar '== null' e retornar [] evita erro ao iterar. Alternativa comum: JSON.parse(localStorage.getItem('Servicos')) || []."},

// ── Listagem com filter + tabela + tfoot min/max (prova 2025-2) ──
{topic:"Estilo Prova",diff:"hard",type:"code",
text:"Escreva a FUNÇÃO listar() de uma listagem de serviços. Suponha que existe a função buscarCadastro(), que devolve um array de objetos { descricao, valor }. A função deve: obter os cadastros com buscarCadastro(); filtrar apenas os que têm Number(valor) >= 100; e, para cada um, criar um <tr> com dois <td> (descricao e valor, via textContent — sem innerHTML) e anexá-lo ao <tbody>. Use createElement.",
answer:`function listar() {
  const cadastro = buscarCadastro();
  const cadastroFiltrado = cadastro.filter( c => Number( c.valor ) >= 100 );
  const tbody = document.querySelector('tbody');
  for ( const c of cadastroFiltrado ) {
    const tr = document.createElement('tr');
    const tdDescricao = document.createElement('td');
    tdDescricao.textContent = c.descricao;
    const tdValor = document.createElement('td');
    tdValor.textContent = c.valor;
    tr.append( tdDescricao, tdValor );
    tbody.append( tr );
  }
}`,
keywords:["function listar","buscarCadastro","filter","Number","c.valor","querySelector","tbody","createElement","tr","td","textContent","tr.append","tbody.append"],
exp:"filter(c => Number(c.valor) >= 100) seleciona. createElement + textContent monta a linha com segurança (sem XSS de innerHTML). tr.append(td1, td2) adiciona as duas células; tbody.append(tr) insere a linha."},

// ── Classe de exceção + atleta (prova 2024-2) ──
{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Prova 2024-2] Escreva a função validar(cadastro) que recebe {nome, peso, altura} e retorna um array de mensagens: nome entre 2 e 100 caracteres; peso entre 40 e 300.",
answer:`export function validar( cadastro ) {
  const nome = cadastro.nome;
  const peso = cadastro.peso;
  let validacao = [];
  if ( nome.length < 2 || nome.length > 100 ) {
    validacao.push( 'O nome tem que ter entre 2 e 100 caracteres' );
  }
  if ( Number( peso ) < 40 || Number( peso ) > 300 ) {
    validacao.push( 'O peso deve ser entre 40 e 300 kg' );
  }
  return validacao;
}`,
keywords:["export function validar","cadastro.nome","nome.length","validacao","push","Number","peso","return validacao"],
exp:"Validação que retorna lista de erros. Atenção: Number(peso) converte a string do input antes de comparar — comparar a string direto pode dar resultado errado. Retornar [] vazio significa 'sem problemas'."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Prova 2024-2] Crie uma listagem que lê 'cadastro' do localStorage (padrão []), usa map() para gerar <li> com 'nome possui X kg e mede Y m', junta com join('') e coloca em um ul anexado ao body.",
answer:`const cadastros = JSON.parse( localStorage.getItem('cadastro') ) || [];
const ul = document.createElement('ul');
const text = cadastros.map( c => \`<li>\${c.nome} possui \${c.peso} kg e mede \${c.altura} m</li>\` );
ul.innerHTML = text.join('');
document.querySelector('body').append( ul );`,
keywords:["JSON.parse","localStorage.getItem","cadastro","|| []","createElement","ul","map","join","append"],
exp:"JSON.parse(...) || [] protege contra null. map() transforma cada objeto numa string <li>. join('') concatena o array em uma única string. ul.innerHTML recebe o HTML; append insere no body."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Prova 2024-2] Escreva um listener de 'dblclick' no documento que remove o <li> clicado: descobre o índice do li entre os irmãos, remove esse índice do array cadastros com splice, atualiza o localStorage e remove o elemento do DOM.",
answer:`document.addEventListener( 'dblclick', remover );

function remover( event ) {
  const liEscolhida = event.target;
  const index = Array.from( liEscolhida.parentNode.children ).indexOf( liEscolhida );
  cadastros.splice( index, 1 );
  localStorage.setItem( 'cadastro', JSON.stringify( cadastros ) );
  liEscolhida.remove();
}`,
keywords:["addEventListener","dblclick","remover","event.target","Array.from","parentNode.children","indexOf","splice","localStorage.setItem","JSON.stringify","remove"],
exp:"event.target é o li clicado. Array.from(parentNode.children).indexOf(li) acha a posição. splice(index, 1) remove do array. Atualiza o localStorage e remove do DOM com .remove(). Mantém dados e tela sincronizados."},

{topic:"JS Básico",diff:"medium",type:"code",
text:"[Prova 2025-2 Q1] Crie a função mediaDosNomes(nomes) que recebe um array de nomes e retorna a média do comprimento deles. Use obrigatoriamente o laço for..of.",
answer:`function mediaDosNomes( nomes ) {
  let soma = 0;
  for ( const nome of nomes ) {
    soma += nome.length;
  }
  return soma / nomes.length;
}`,
keywords:["function mediaDosNomes","let soma","for","of nomes","soma","nome.length","return","nomes.length"],
exp:"for..of percorre os valores do array (não os índices, como for..in). Acumula nome.length em soma e divide pelo total. A questão exigia for..of especificamente — usar map/reduce não pontuaria."},

// ── CRUD com fetch + Promise (.then) — aula09 (json-server) ──
{topic:"Promise/Fetch",diff:"hard",type:"code",
text:"[CRUD json-server] Escreva salvarConta(conta) que decide entre POST (novo, id=='0') e PUT (edição), envia JSON com o header correto, e retorna a Promise da resposta tratando erro com response.ok. Use .then (sem async/await).",
answer:`function salvarConta( conta ) {
  const ehNovo = conta.id == '0';
  const opcoes = {
    method: ehNovo ? 'POST' : 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( conta )
  };
  const url = ehNovo
    ? 'http://localhost:3000/contas'
    : \`http://localhost:3000/contas/\${conta.id}\`;
  return fetch( url, opcoes )
    .then( response => {
      if ( !response.ok ) {
        throw new Error( 'Erro ao salvar a conta. Status: ' + response.status );
      }
      return response.json();
    } );
}`,
keywords:["salvarConta","method","POST","PUT","Content-Type","application/json","JSON.stringify","fetch","then","response.ok","throw","response.json"],
exp:"POST cria, PUT atualiza (id na URL). headers Content-Type avisa que o corpo é JSON; body com JSON.stringify. Retornar a Promise do fetch encadeado permite ao chamador usar .then(nova => ...) com o objeto criado pelo servidor."},

{topic:"Promise/Fetch",diff:"medium",type:"code",
text:"[CRUD json-server] Escreva consultarContas() que faz fetch GET em 'http://localhost:3000/contas', lança Error se !response.ok e retorna a Promise com o JSON. Use .then.",
answer:`export function consultarContas() {
  return fetch( 'http://localhost:3000/contas' )
    .then( response => {
      if ( !response.ok ) {
        throw new Error( 'Erro ao consultar as contas.' );
      }
      return response.json();
    } );
}`,
keywords:["consultarContas","return fetch","contas","then","response.ok","throw new Error","return response.json"],
exp:"Todo método de uma Promise retorna outra Promise — por isso 'return fetch(...).then(...)' devolve uma Promise encadeada. O chamador faz .then(desenharContas).catch(...). fetch só rejeita por erro de rede; o 404/500 exige checar response.ok."},

{topic:"DOM",diff:"hard",type:"code",
text:"Escreva a FUNÇÃO desenharContas(contas), onde 'contas' é um array de objetos { tipo, valor } (tipo 'P' = pagamento). Suponha que já existe a função auxiliar criarLinha(conta), que devolve um <tr> pronto para cada conta. A função deve: criar um DocumentFragment; para cada conta, anexar criarLinha(conta) ao fragmento e acumular o saldo (se tipo === 'P' subtrai o valor, senão soma); anexar o fragmento ao <tbody> (1 só inserção); e exibir 'R$ ' + saldo (2 casas decimais, toFixed) no elemento de id 'saldo'.",
answer:`function desenharContas( contas ) {
  const fragmento = document.createDocumentFragment();
  let saldo = 0;
  for ( const conta of contas ) {
    const linha = criarLinha( conta );
    fragmento.append( linha );
    saldo += conta.tipo === 'P' ? ( conta.valor * -1 ) : conta.valor;
  }
  document.querySelector('tbody').append( fragmento );
  document.getElementById('saldo').textContent = 'R$ ' + saldo.toFixed( 2 );
}`,
keywords:["desenharContas","createDocumentFragment","let saldo","for","of contas","criarLinha","fragmento.append","conta.tipo","'P'","saldo","tbody","append","getElementById","saldo","toFixed"],
exp:"DocumentFragment acumula as linhas FORA do DOM e insere tudo de uma vez — apenas 1 reflow (mais eficiente). O operador ternário ajusta o sinal pelo tipo. toFixed(2) formata com 2 casas decimais."},

// ── Cards + dialog + fábrica de elementos — aula06 ──
{topic:"DOM",diff:"medium",type:"code",
text:"[Cards] Escreva uma função utilitária tag(nome, classe, filhos) que cria um elemento, adiciona a classe; se filhos for string usa textContent, se for array faz append de cada filho. Retorna o elemento.",
answer:`function tag( nome, classe, filhos = [] ) {
  const elemento = document.createElement( nome );
  if ( classe ) {
    elemento.classList.add( classe );
  }
  if ( typeof filhos === 'string' ) {
    elemento.textContent = filhos;
  } else if ( Array.isArray( filhos ) ) {
    for ( const f of filhos ) {
      elemento.append( f );
    }
  }
  return elemento;
}`,
keywords:["function tag","createElement","classList.add","typeof filhos","string","textContent","Array.isArray","for","append","return elemento"],
exp:"Fábrica de elementos: createElement cria o nó, classList.add aplica a classe. typeof distingue texto (textContent, seguro) de filhos (append). Padrão útil para montar componentes sem innerHTML."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Cards] Escreva o código para abrir um <dialog> como modal ao clicar no botão de id 'adicionar'.",
answer:`document.getElementById('adicionar').addEventListener('click', () => {
  document.querySelector('dialog').showModal();
});`,
keywords:["getElementById","adicionar","addEventListener","click","querySelector","dialog","showModal"],
exp:"showModal() abre o <dialog> bloqueando o restante da página (overlay). Para fechar usa-se dialog.close(). show() abriria sem bloquear o fundo."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"Dentro de uma função salvar() de cadastro, escreva o trecho que evita nomes duplicados. Suponha que existe a função obterContas(), que devolve o array de contas já cadastradas (cada conta é um objeto { nome, ... }), e que 'conta' é o novo objeto a cadastrar. O trecho deve: obter as contas; percorrê-las (for..of) e, se alguma tiver o mesmo nome de conta.nome, exibir alert('Usuário <nome> já cadastrado') e interromper a função com return; se nenhuma repetir, dar push da nova conta no array.",
answer:`const contas = obterContas();
for ( const c of contas ) {
  if ( c.nome === conta.nome ) {
    alert( \`Usuário \${c.nome} já cadastrado\` );
    return;
  }
}
contas.push( conta );`,
keywords:["obterContas","for","of contas","if","c.nome === conta.nome","alert","return","contas.push"],
exp:"Loop for..of verifica duplicidade por nome. O 'return' interrompe a função salvar antes do push, evitando cadastros repetidos. Alternativa: contas.some(c => c.nome === conta.nome)."},

{topic:"DOM",diff:"medium",type:"code",
text:"[Formulário] Escreva o início de salvar(event) que previne o padrão e usa reportValidity() do formulário dentro do dialog para abortar (return) se os campos forem inválidos.",
answer:`function salvar( event ) {
  event.preventDefault();
  const form = document.querySelector('dialog form');
  const ok = form.reportValidity();
  if ( !ok ) {
    return;
  }
}`,
keywords:["function salvar","event.preventDefault","querySelector","dialog form","reportValidity","if","!ok","return"],
exp:"reportValidity() dispara a validação nativa do HTML5 (required, min, max, pattern...) e mostra os balões de erro do navegador, retornando false se algo for inválido. Evita escrever validação manual para regras simples."},

// ══════════════════════════════════════════════════════════
// LOTE ADICIONAL — reforço de fundamentos
// ══════════════════════════════════════════════════════════

// ── DOM / TIPOS ──
{topic:"DOM",diff:"easy",type:"mc",
text:"O que significa a sigla DOM?",
options:["Document Object Model","Data Object Manager","Dynamic Output Module","Document Oriented Markup"],
answer:0,
exp:"DOM = Document Object Model. É a representação em árvore do documento HTML que o JavaScript manipula (criar, alterar e remover nós/elementos)."},

{topic:"Tipos",diff:"easy",type:"mc",
text:"O que retorna typeof undefined?",
options:['"null"','"undefined"','"object"','"void"'],
answer:1,
exp:'typeof undefined retorna "undefined". Diferente de typeof null, que retorna "object" (bug histórico).'},

{topic:"Tipos",diff:"medium",type:"mc",
text:"Qual o resultado de Number('12px')?",
options:["12","'12px'","NaN","undefined"],
answer:2,
exp:"Number('12px') retorna NaN — a string inteira deve ser numérica. parseInt('12px') retornaria 12, pois lê os dígitos iniciais e ignora o resto."},

{topic:"Tipos",diff:"medium",type:"code",
text:"Escreva DUAS formas diferentes de converter a string '42' para o número 42.",
answer:`Number('42')
parseInt('42')`,
keywords:["Number","parseInt"],
exp:"Number('42') converte a string inteira (retorna NaN se houver não-dígitos). parseInt('42') lê os dígitos iniciais. Também valeria o operador unário: +'42'."},

// ── ESCOPO ──
{topic:"Escopo",diff:"easy",type:"mc",
text:"O que ocorre ao declarar const x; sem inicializar o valor?",
options:["x recebe undefined","SyntaxError — const exige inicialização na declaração","x recebe null","Funciona apenas fora do strict mode"],
answer:1,
exp:"const exige um valor na própria declaração — const x; lança SyntaxError ('Missing initializer in const declaration'). let e var podem ser declaradas sem inicializar."},

// ── OPERADORES ──
{topic:"Operadores",diff:"medium",type:"mc",
text:"Qual é a sintaxe do operador ternário (condicional)?",
options:["if condicao then a else b","condicao ? a : b","condicao => a : b","condicao && a || b apenas"],
answer:1,
exp:"condicao ? valorSeVerdadeiro : valorSeFalso. É a única estrutura condicional do JavaScript que é uma expressão (retorna valor), por isso pode ser atribuída a uma variável."},

{topic:"Operadores",diff:"easy",type:"code",
text:"Usando o operador ternário, atribua à variável status o valor 'maior' se idade >= 18, senão 'menor'.",
answer:"const status = idade >= 18 ? 'maior' : 'menor';",
keywords:["idade >= 18","?","'maior'","'menor'"],
exp:"O ternário é uma expressão: condicao ? a : b. Mais conciso que if/else para atribuições simples de um valor entre dois."},

// ── JS BÁSICO / TEMPLATE LITERALS / LOOPS ──
{topic:"JS Básico",diff:"easy",type:"mc",
text:"O que delimita um template literal (template string) em JavaScript?",
options:["Aspas duplas","Aspas simples","Crases (backticks)","Barras (/ /)"],
answer:2,
exp:"Template literals usam crases (backticks). Permitem interpolação com ${expressao} e strings de múltiplas linhas sem concatenação."},

{topic:"JS Básico",diff:"easy",type:"code",
text:"Usando um template literal, crie a constante mensagem com o conteúdo: Olá, <nome>! — interpolando a variável nome.",
answer:`const mensagem = \`Olá, \${nome}!\`;`,
keywords:["const mensagem","${nome}","Olá"],
exp:"Template literals usam crases e ${...} para interpolar variáveis/expressões. Equivale a 'Olá, ' + nome + '!' mas é mais legível."},

{topic:"JS Básico",diff:"medium",type:"mc",
text:"Qual a diferença entre for..of e for..in?",
options:["São idênticos","for..of percorre os VALORES de um iterável; for..in percorre as CHAVES/índices enumeráveis","for..in é mais rápido","for..of só funciona com objetos"],
answer:1,
exp:"for..of itera valores de iteráveis (arrays, strings, Set...). for..in itera as chaves/índices enumeráveis — em arrays retorna os índices como string, por isso evite for..in com arrays."},

{topic:"JS Básico",diff:"easy",type:"code",
text:"Percorra o array cores usando for..of, imprimindo cada cor no console.",
answer:`for ( const cor of cores ) {
  console.log( cor );
}`,
keywords:["for","const cor of cores","console.log"],
exp:"for..of percorre os valores diretamente (sem índice). É o laço pedido nas provas para iterar arrays — for..in retornaria os índices, não os valores."},

// ── ARRAYS ──
{topic:"Arrays",diff:"medium",type:"mc",
text:"O que faz o método reduce() de um array?",
options:["Filtra elementos","Reduz o array a um único valor acumulando os elementos","Remove o último elemento","Inverte a ordem dos elementos"],
answer:1,
exp:"reduce((acc, item) => ..., valorInicial) acumula os elementos em um único valor (soma, produto, objeto etc.). acc é o acumulador; o segundo argumento é o valor inicial."},

{topic:"Arrays",diff:"medium",type:"code",
text:"Some todos os números do array nums usando reduce, começando do zero.",
answer:"const total = nums.reduce((acc, n) => acc + n, 0);",
keywords:["reduce","=>","acc","0"],
exp:"reduce recebe o reducer (acc, n) => acc + n e o valor inicial 0. O acumulador acc carrega a soma parcial a cada iteração. Para [1,2,3] resulta em 6."},

{topic:"Arrays",diff:"easy",type:"code",
text:"Remova as duplicatas do array nums usando Set e spread, gerando o array unicos.",
answer:"const unicos = [...new Set(nums)];",
keywords:["new Set","...","nums"],
exp:"new Set(nums) descarta duplicatas (valores únicos). O spread [...] converte o Set de volta para array. Padrão consagrado para deduplicar."},

// ── DOM / EVENTOS ──
{topic:"DOM",diff:"easy",type:"mc",
text:"Como definir o atributo data-id com valor 5 em um elemento el?",
options:["el.data-id = 5","el.setAttribute('data-id', 5) ou el.dataset.id = 5","el.attr('data-id', 5)","el.dataset('data-id', 5)"],
answer:1,
exp:"Use setAttribute('data-id', 5) ou a API dataset: el.dataset.id = 5 (note o camelCase: data-id vira dataset.id). el.data-id não é sintaxe válida."},

{topic:"Eventos",diff:"easy",type:"mc",
text:"Qual propriedade do objeto de evento referencia o elemento que originou o evento?",
options:["event.this","event.target","event.element","event.node"],
answer:1,
exp:"event.target é o elemento que disparou o evento — essencial em event delegation. event.currentTarget é o elemento onde o listener está registrado (pode diferir do target)."},

// ── CLASSES ──
{topic:"Classes",diff:"medium",type:"mc",
text:"Como invocar um método static chamado criar() da classe Usuario?",
options:["new Usuario().criar()","Usuario.criar()","this.criar()","Usuario.prototype.criar()"],
answer:1,
exp:"Métodos static pertencem à classe, não às instâncias: chamam-se por Usuario.criar(). Tentar acessá-los por uma instância (new Usuario().criar()) resulta em erro."},

// ── STORAGE ──
{topic:"Storage",diff:"easy",type:"mc",
text:"Qual método remove TODOS os pares chave-valor do localStorage de uma vez?",
options:["removeItem()","delete()","clear()","reset()"],
answer:2,
exp:"clear() esvazia todo o storage da origem. removeItem(chave) remove apenas um item específico. Use clear() com cuidado — afeta todos os dados do domínio."},

// ── PROMISE / ASYNC ──
{topic:"Promise/Fetch",diff:"medium",type:"mc",
text:"O que o método .then() de uma Promise retorna?",
options:["O valor resolvido diretamente","Uma NOVA Promise, permitindo encadeamento","undefined","A mesma Promise original"],
answer:1,
exp:".then() (assim como .catch() e .finally()) retorna uma NOVA Promise — por isso é possível encadear: fetch().then().then().catch(). O valor retornado dentro do then vira a resolução da próxima."},

{topic:"Async/Await",diff:"easy",type:"code",
text:"Declare uma função assíncrona chamada carregar que não recebe parâmetros (corpo vazio).",
answer:"async function carregar() {}",
keywords:["async function carregar"],
exp:"A palavra-chave async antes de function torna a função assíncrona — ela passa a retornar uma Promise e permite o uso de await em seu corpo."},

// ── REST / HTTP ──
{topic:"REST/HTTP",diff:"medium",type:"mc",
text:"Qual código de status HTTP indica que o cliente NÃO está autenticado/autorizado?",
options:["400 Bad Request","401 Unauthorized","404 Not Found","500 Internal Server Error"],
answer:1,
exp:"401 Unauthorized indica falta de autenticação válida. 403 Forbidden é autenticado mas sem permissão. 400 é requisição malformada. 404 recurso inexistente."},

// ── EXCEÇÕES ──
{topic:"Exceções",diff:"easy",type:"code",
text:"Escreva uma instrução que lance (throw) uma exceção genérica com a mensagem 'Falhou'.",
answer:"throw new Error('Falhou');",
keywords:["throw new Error","Falhou"],
exp:"throw new Error('mensagem') lança uma exceção do tipo Error. A mensagem fica acessível em e.message no bloco catch."},

// ── MVC / MVP ──
{topic:"MVC/MVP",diff:"easy",type:"mc",
text:"No padrão MVC, qual camada NÃO deve acessar o DOM diretamente?",
options:["A Visão (View)","A Controladora (Controller)","O Modelo (Model)","Nenhuma delas acessa o DOM"],
answer:2,
exp:"O Modelo concentra regras de negócio e dados — não conhece a interface. Quem manipula o DOM é a Visão. Misturar regra de negócio com DOM no Modelo quebra a separação de responsabilidades."},

// ══════════════════════════════════════════════════════════
// HTML / CSS — revisão e exercícios (formulários, tabela, dialog)
// ══════════════════════════════════════════════════════════

{topic:"HTML/CSS",diff:"easy",type:"mc",
text:"Qual elemento HTML5 nativo cria uma janela de diálogo / modal?",
options:["<dialog>","<modal>","<popup>","<window>"],
answer:0,
exp:"<dialog> é o elemento nativo de diálogo. Abre como modal com dialog.showModal() (bloqueia o fundo) ou simples com dialog.show(); fecha com dialog.close()."},

{topic:"HTML/CSS",diff:"easy",type:"mc",
text:"Em uma tabela, qual elemento agrupa as linhas de dados (o corpo da tabela)?",
options:["<thead>","<tbody>","<tfoot>","<caption>"],
answer:1,
exp:"<tbody> agrupa as linhas de dados. <thead> contém o cabeçalho (th) e <tfoot> o rodapé (ex.: totais). É no <tbody> que normalmente inserimos/limpamos as <tr> via JavaScript."},

{topic:"HTML/CSS",diff:"easy",type:"mc",
text:"Qual atributo limita a quantidade MÁXIMA de caracteres digitáveis em um campo de texto?",
options:["max","maxlength","size","limit"],
answer:1,
exp:"maxlength define o máximo de caracteres; minlength define o mínimo. Já max/min servem para valores de <input type=\"number\"> ou date, não para contagem de caracteres."},

{topic:"HTML/CSS",diff:"easy",type:"mc",
text:"Qual atributo torna o preenchimento de um campo de formulário obrigatório?",
options:["mandatory","obligatory","required","needed"],
answer:2,
exp:"required impede o envio do formulário enquanto o campo estiver vazio e dispara a validação nativa do navegador (mostrada por reportValidity())."},

{topic:"HTML/CSS",diff:"medium",type:"mc",
text:"Para associar um <label> a um campo, qual atributo do label deve apontar para o id do input?",
options:["name","for","ref","target"],
answer:1,
exp:"<label for=\"nome\"> associa-se ao <input id=\"nome\">. Clicar no rótulo foca o campo e melhora a acessibilidade para leitores de tela."},

{topic:"HTML/CSS",diff:"medium",type:"mc",
text:"Em um <input type=\"number\">, quais atributos definem o menor e o maior valor aceitos?",
options:["minlength e maxlength","min e max","start e end","low e high"],
answer:1,
exp:"min e max delimitam o intervalo de valores em campos numéricos/date. minlength/maxlength contam caracteres (texto). step define o incremento permitido."},

{topic:"HTML/CSS",diff:"easy",type:"mc",
text:"Qual combinação de elementos cria uma lista suspensa (dropdown) de opções?",
options:["<select> com <option>","<dropdown> com <item>","<ul> com <li>","<input type=\"list\">"],
answer:0,
exp:"<select> cria a lista e cada <option value=\"...\"> é uma alternativa. O atributo multiple permite seleção múltipla e required torna a escolha obrigatória."},

{topic:"HTML/CSS",diff:"medium",type:"mc",
text:"Para que serve o elemento <output> em um formulário?",
options:["Enviar o formulário","Exibir ao usuário o resultado de um cálculo ou de uma ação","Criar um botão de download","Definir a saída de áudio"],
answer:1,
exp:"<output> é o local semântico para mostrar resultados/mensagens (ex.: 'Salvo com sucesso' ou erros de validação). Nas provas era preenchido com output.innerText."},

{topic:"HTML/CSS",diff:"medium",type:"mc",
text:"Qual a diferença entre dialog.show() e dialog.showModal()?",
options:["Não há diferença","show() abre sem bloquear a página; showModal() abre como modal, bloqueando a interação com o fundo","showModal() é uma API mais antiga","show() exige um <form>"],
answer:1,
exp:"showModal() exibe o <dialog> como modal com overlay, bloqueando o resto da página e permitindo fechar com Esc. show() apenas exibe, sem bloquear. Fecha-se com dialog.close()."},

{topic:"HTML/CSS",diff:"easy",type:"mc",
text:"No CSS, qual seletor seleciona um elemento pelo seu id?",
options:[".nome","#nome","nome","*nome"],
answer:1,
exp:"# seleciona por id (#nome); . seleciona por classe (.nome); o nome puro seleciona pela tag (div, p). O id deve ser único na página."},

{topic:"HTML/CSS",diff:"medium",type:"mc",
text:"Qual propriedade CSS faz inputs e selects ocuparem uma linha cada (empilhados verticalmente)?",
options:["position: block","display: block","float: vertical","align: column"],
answer:1,
exp:"display: block faz o elemento ocupar a largura da linha, empilhando os campos. Foi usado nos formulários da disciplina: input, select, span { display: block; }."},

{topic:"HTML/CSS",diff:"easy",type:"code",
text:"Escreva o HTML de um campo de texto obrigatório, de id 'nome', que aceite entre 2 e 60 caracteres (limitação de caracteres).",
answer:`<input type="text" id="nome" minlength="2" maxlength="60" required>`,
keywords:['<input','type="text"','id="nome"','minlength','maxlength','required'],
exp:"minlength e maxlength limitam o número de caracteres; required torna o campo obrigatório. Esse foi o padrão dos formulários de cadastro (contas, jogos, serviços)."},

{topic:"HTML/CSS",diff:"medium",type:"code",
text:"Escreva o HTML de uma tabela com cabeçalho de duas colunas (Descrição e Valor) e um corpo (tbody) vazio para ser preenchido via JavaScript.",
answer:`<table>
  <thead>
    <tr><th>Descrição</th><th>Valor</th></tr>
  </thead>
  <tbody></tbody>
</table>`,
keywords:['<table>','<thead>','<tr>','<th>','<tbody>'],
exp:"thead com tr/th forma o cabeçalho; o tbody vazio recebe as linhas via JS (createElement + append ou replaceChildren). Estrutura usada nas listagens de serviços, jogos e contas."},

{topic:"HTML/CSS",diff:"medium",type:"code",
text:"Escreva o HTML de um <dialog> contendo um formulário com method 'dialog', um campo de texto de id 'nome' e um botão Salvar.",
answer:`<dialog>
  <form method="dialog">
    <input type="text" id="nome">
    <button>Salvar</button>
  </form>
</dialog>`,
keywords:['<dialog>','<form','method="dialog"','<input','id="nome"','<button'],
exp:"O <dialog> é aberto com showModal(). O <form method=\"dialog\"> fecha o diálogo ao enviar e expõe o valor em dialog.returnValue. Padrão das aulas de jogos e contas."},

{topic:"HTML/CSS",diff:"medium",type:"code",
text:"Escreva o HTML de um formulário com um input de texto de id 'descricao', um botão (type button) com o texto Salvar e um <output> para mensagens.",
answer:`<form>
  <input type="text" id="descricao">
  <button type="button">Salvar</button>
  <output></output>
</form>`,
keywords:['<form>','<input','id="descricao"','<button','type="button"','<output>'],
exp:"button type=\"button\" evita o submit padrão (o salvar é tratado via addEventListener). <output> exibe sucesso/erro. Estrutura idêntica à questao2.html da prova 2025-2."},

// ══════════════════════════════════════════════════════════
// JSON — serialização e desserialização
// ══════════════════════════════════════════════════════════

{topic:"JSON",diff:"easy",type:"mc",
text:"O que faz JSON.stringify(valor)?",
options:["Converte uma string JSON em objeto JavaScript","Converte um valor JavaScript em uma string no formato JSON","Valida se uma string é um JSON","Clona um objeto profundamente"],
answer:1,
exp:"JSON.stringify converte um valor JS (objeto, array...) em texto JSON — necessário para salvar no localStorage, que só aceita strings. O inverso é JSON.parse."},

{topic:"JSON",diff:"easy",type:"mc",
text:"O que faz JSON.parse(texto)?",
options:["Converte um valor JS em string JSON","Converte uma string JSON em um valor JavaScript","Remove os espaços de um JSON","Formata o JSON com indentação"],
answer:1,
exp:"JSON.parse transforma texto JSON em valor JS (objeto/array). Lança SyntaxError se o texto for inválido. Usado ao ler dados do localStorage."},

{topic:"JSON",diff:"medium",type:"mc",
text:"O que JSON.parse(localStorage.getItem('x')) retorna quando a chave 'x' nunca foi gravada?",
options:["Um array vazio []","Uma string vazia","null","Lança um erro"],
answer:2,
exp:"getItem retorna null para chave inexistente; JSON.parse(null) retorna null (não erro). Por isso o padrão JSON.parse(localStorage.getItem('x')) || [] garante um array de fallback."},

{topic:"JSON",diff:"medium",type:"tf",
text:"Assinale V ou F sobre JSON.",
statements:[
  {text:"Em JSON, as chaves (nomes das propriedades) devem ficar entre aspas duplas.",answer:true},
  {text:"Funções e métodos de um objeto são preservados ao usar JSON.stringify.",answer:false},
  {text:"JSON.stringify(obj, null, 2) gera o JSON identado com 2 espaços.",answer:true},
  {text:"Ao salvar uma instância de classe com JSON.stringify e depois ler com JSON.parse, o objeto recuperado mantém os métodos da classe original.",answer:false}
],
exp:"Chaves em JSON usam aspas duplas. Funções não são serializadas (são ignoradas). O 3º argumento de stringify controla a indentação. JSON.parse devolve um objeto simples — sem prototype nem métodos da classe."},

{topic:"JSON",diff:"medium",type:"code",
text:"Escreva o código para salvar o array lista no localStorage na chave 'itens' (lembre que o storage só aceita strings).",
answer:"localStorage.setItem('itens', JSON.stringify(lista));",
keywords:["localStorage.setItem","JSON.stringify","itens","lista"],
exp:"setItem só grava strings — JSON.stringify(lista) serializa o array. Para reler com segurança: JSON.parse(localStorage.getItem('itens') || '[]')."},

// ══════════════════════════════════════════════════════════
// P2 — MVC / MVP e CRUD com fetch (aula11-29_05 e aula10_22_05)
// ══════════════════════════════════════════════════════════

// ── aula11: mvp_2_jogos — Serviço (acesso à API) ──
{topic:"MVC/MVP",diff:"hard",type:"code",
text:"[aula11 — Serviço] Crie a classe ServicoJogos (ESM) com o método async obterJogos(pesquisa): faz GET na rota /jogos usando o filtro do json-server nome:contains com a pesquisa (ou '' se vazia); lança Error se !response.ok; retorna o JSON.",
answer:`const API = 'http://localhost:3000';

export class ServicoJogos {
  async obterJogos( pesquisa ) {
    const response = await fetch( \`\${API}/jogos?nome:contains=\${pesquisa || ''}\` );
    if ( !response.ok ) {
      throw new Error( 'Erro ao obter os jogos.' );
    }
    return await response.json();
  }
}`,
keywords:["export class ServicoJogos","async obterJogos","await fetch","${API}","nome:contains","pesquisa || ''","response.ok","throw new Error","return await response.json"],
exp:"O Serviço (Presenter de dados) isola o acesso à API. fetch só rejeita por erro de rede — por isso o if(!response.ok). A query nome:contains é do json-server. pesquisa || '' evita 'undefined' na URL."},

{topic:"MVC/MVP",diff:"hard",type:"code",
text:"Considere a classe ServicoJogos abaixo, onde a constante API guarda a URL base do servidor. Escreva, DENTRO dela, o MÉTODO assíncrono removerJogoPeloId(id) — recebe o id (número/string) do jogo. O método deve: fazer fetch DELETE na rota `${API}/jogos/{id}`; se o status for 404, lançar new Error('Jogo não encontrado para remoção'); se !response.ok (qualquer outro erro), lançar new Error('Erro ao remover o jogo'). Não há retorno.",
code:`const API = 'http://localhost:3000';

export class ServicoJogos {
  // async obterJogos(pesquisa) já existe...

  // 👉 escreva aqui o método async removerJogoPeloId(id)
}`,
answer:`async removerJogoPeloId( id ) {
  const response = await fetch( \`\${API}/jogos/\${id}\`, { method: 'DELETE' } );
  if ( response.status == 404 ) {
    throw new Error( 'Jogo não encontrado para remoção' );
  }
  if ( !response.ok ) {
    throw new Error( 'Erro ao remover o jogo' );
  }
}`,
keywords:["async removerJogoPeloId","await fetch","method: 'DELETE'","response.status","404","response.ok","throw new Error"],
exp:"DELETE recebe o id na URL via template literal. Verifica-se 404 primeiro (mensagem específica) e depois !response.ok para os demais erros. Não há retorno de corpo em uma remoção."},

// ── aula11: mvp_2_jogos — Controladora (Apresentador) ──
{topic:"MVC/MVP",diff:"hard",type:"code",
text:"Crie a classe ControladoraListagemJogos (Apresentador do MVP). Ela recebe no constructor o objeto 'visao', que possui os métodos desenharJogos(jogos) e mostrarErro(erro). Use também a classe ServicoJogos (de './servico-jogos.js'), cujo método async obterJogos() devolve os jogos da API. A classe deve: importar ServicoJogos; no constructor, guardar a visao e criar 'this.servico = new ServicoJogos()'; ter um método async listar() que, num try, faz await this.servico.obterJogos() e passa o resultado para this.visao.desenharJogos(); no catch, chama this.visao.mostrarErro(erro).",
answer:`import { ServicoJogos } from './servico-jogos.js';

export class ControladoraListagemJogos {
  constructor( visao ) {
    this.servico = new ServicoJogos();
    this.visao = visao;
  }

  async listar() {
    try {
      const jogos = await this.servico.obterJogos();
      this.visao.desenharJogos( jogos );
    } catch ( erro ) {
      this.visao.mostrarErro( erro );
    }
  }
}`,
keywords:["import","ServicoJogos","export class ControladoraListagemJogos","this.servico","new ServicoJogos","this.visao = visao","async listar","try","await this.servico.obterJogos","this.visao.desenharJogos","catch","this.visao.mostrarErro"],
exp:"O Apresentador orquestra: pede dados ao Serviço e manda a Visão desenhar. O try/catch encaminha o sucesso (desenharJogos) ou o erro (mostrarErro) de volta à Visão, sem o Modelo/Serviço tocar no DOM."},

// ── aula11: mvp_2_jogos — Visão ──
{topic:"MVC/MVP",diff:"hard",type:"code",
text:"Crie a classe VisaoListagemJogos (a Visão do MVP). Use a classe ControladoraListagemJogos (de './controladora-listagem-jogos.js'), que possui os métodos listar() e pesquisar(). A Visão deve: importar a Controladora; no constructor, criar 'this.controladora = new ControladoraListagemJogos(this)' passando a si mesma; ter um método iniciar() que chama this.controladora.listar() e registra um listener de clique no <button> de id 'pesquisar' que previne o padrão e chama this.controladora.pesquisar() (use arrow function para preservar o this).",
answer:`import { ControladoraListagemJogos } from './controladora-listagem-jogos.js';

export class VisaoListagemJogos {
  constructor() {
    this.controladora = new ControladoraListagemJogos( this );
  }

  iniciar() {
    this.controladora.listar();
    document.getElementById('pesquisar').addEventListener('click', event => {
      event.preventDefault();
      this.controladora.pesquisar();
    });
  }
}`,
keywords:["import","ControladoraListagemJogos","export class VisaoListagemJogos","this.controladora","new ControladoraListagemJogos( this )","iniciar","this.controladora.listar","getElementById","addEventListener","event.preventDefault","this.controladora.pesquisar"],
exp:"No MVP a Visão é o ponto de entrada e cria o Apresentador passando 'this'. A arrow no listener preserva o this da Visão, permitindo chamar this.controladora.pesquisar()."},

{topic:"MVC/MVP",diff:"hard",type:"code",
text:"Dentro da classe Visão, escreva o MÉTODO desenharJogos(jogos), onde 'jogos' é um array de objetos. Suponha que a própria classe tem o método criarLinha(jogo), que devolve um <tr>. O método deve: selecionar o <tbody>; limpá-lo com replaceChildren(); e anexar de uma só vez todas as linhas, gerando-as com jogos.map(this.criarLinha.bind(this)) e espalhando o resultado com spread no tbody.append(...). (bind(this) é necessário para o this não se perder ao passar o método como callback.)",
answer:`desenharJogos( jogos ) {
  const tbody = document.querySelector('tbody');
  tbody.replaceChildren();
  tbody.append( ...jogos.map( this.criarLinha.bind(this) ) );
}`,
keywords:["desenharJogos","querySelector","tbody","replaceChildren","jogos.map","this.criarLinha.bind(this)","tbody.append"],
exp:"replaceChildren() limpa o tbody. map gera as <tr> e o spread (...) as adiciona de uma só vez (um reflow). bind(this) é obrigatório ao passar this.criarLinha como callback, senão this se perde."},

{topic:"MVC/MVP",diff:"medium",type:"code",
text:"Dentro de uma classe Visão, escreva DOIS MÉTODOS que montam uma linha de tabela:\n\n1) criarCelula(valor) — método auxiliar que recebe 'valor' (o conteúdo de texto a exibir na célula). Ele cria um elemento <td>, coloca o valor em td.textContent (sem innerHTML) e RETORNA o <td>.\n\n2) criarLinha(jogo) — recebe um objeto 'jogo' que você deve desestruturar no parâmetro em { id, nome, nota, genero }. Ele cria um <tr>, anexa a ele quatro células chamando this.criarCelula(...) para id, nome, nota e genero (nessa ordem), e RETORNA o <tr>.",
answer:`criarLinha( { id, nome, nota, genero } ) {
  const tr = document.createElement('tr');
  tr.append(
    this.criarCelula( id ),
    this.criarCelula( nome ),
    this.criarCelula( nota ),
    this.criarCelula( genero )
  );
  return tr;
}

criarCelula( valor ) {
  const td = document.createElement('td');
  td.textContent = valor;
  return td;
}`,
keywords:["criarLinha","{ id, nome, nota, genero }","createElement","tr.append","this.criarCelula","criarCelula","td.textContent"],
exp:"Desestruturação no parâmetro extrai as propriedades do jogo. criarCelula usa textContent (seguro, sem XSS) em vez de innerHTML. tr.append aceita vários nós de uma vez."},

{topic:"MVC/MVP",diff:"hard",type:"code",
text:"Dentro de uma classe Visão, escreva o MÉTODO removerLinhaComId(id), onde 'id' é o identificador do jogo. Cada linha da tabela tem uma célula <td data-id=\"...\"> com o id. O método deve encontrar o <tr> cuja célula tem aquele data-id e removê-lo do DOM, SEM lançar erro caso a linha não exista (use optional chaining ?.).",
answer:`removerLinhaComId( id ) {
  const tr = document.querySelector( \`tbody tr td[data-id=\${id}]\` )?.parentElement;
  tr?.remove();
}`,
keywords:["removerLinhaComId","querySelector","data-id","?.parentElement","tr?.remove"],
exp:"Seletor de atributo td[data-id=...] localiza a célula; ?.parentElement sobe para o <tr>. O optional chaining (?.) evita TypeError se nada for encontrado. tr?.remove() exclui a linha."},

// ── aula11: MVC x MVP (conceito) ──
{topic:"MVC/MVP",diff:"medium",type:"tf",
text:"[aula11] Assinale V ou F sobre os projetos MVC/MVP.",
statements:[
  {text:"No MVC, a Controladora registra o callback na Visão com this.visao.aoDispararSomar(this.somar.bind(this)).",answer:true},
  {text:"No MVP, a Visão cria a Controladora no constructor, passando this.",answer:true},
  {text:"A classe ServicoJogos usa fetch e isola o acesso à API, separando-o da Visão.",answer:true},
  {text:"O Modelo Calculadora deve ler os valores n1 e n2 direto do DOM com document.getElementById.",answer:false}
],
exp:"No MVC a Visão é passiva e expõe aoDispararSomar(cb). No MVP a Visão conhece e chama a Controladora. O Serviço encapsula o fetch. O Modelo nunca toca o DOM — quem lê n1/n2 é a Visão."},

// ── aula10: jogos com fetch + template (CRUD) ──
{topic:"Async/Await",diff:"medium",type:"code",
text:"Escreva a FUNÇÃO async listarJogos(). Suponha que existem: consultarJogos() — retorna uma Promise com o array de jogos; e desenharJogos(jogos) — exibe os jogos na tela. A função deve, dentro de um try, fazer 'const jogos = await consultarJogos()' e chamar desenharJogos(jogos); no catch, exibir alert(erro.message).",
answer:`export async function listarJogos() {
  try {
    const jogos = await consultarJogos();
    desenharJogos( jogos );
  } catch ( erro ) {
    alert( erro.message );
  }
}`,
keywords:["async function listarJogos","try","await consultarJogos","desenharJogos","catch","alert","erro.message"],
exp:"await pausa até a consulta resolver. O try/catch trata erros de rede/HTTP relançados por consultarJogos, exibindo a mensagem com alert(erro.message)."},

{topic:"Promise/Fetch",diff:"hard",type:"code",
text:"[aula10 — Cadastro] Escreva async cadastrarJogo(jogo) que envia POST para 'http://localhost:3000/jogos' com header Content-Type application/json e o corpo em JSON; lança Error se !response.ok e retorna o JSON criado.",
answer:`async function cadastrarJogo( jogo ) {
  const headers = new Headers();
  headers.append( 'Content-Type', 'application/json' );
  const options = {
    headers,
    method: 'POST',
    body: JSON.stringify( jogo )
  };
  const response = await fetch( 'http://localhost:3000/jogos', options );
  if ( !response.ok ) {
    throw new Error( 'Erro ao cadastrar o jogo' );
  }
  return await response.json();
}`,
keywords:["async function cadastrarJogo","new Headers","Content-Type","application/json","method: 'POST'","JSON.stringify","await fetch","response.ok","throw new Error","return await response.json"],
exp:"POST cria o recurso. O header Content-Type: application/json avisa o formato do corpo (JSON.stringify). O json-server retorna o jogo criado já com o id gerado — por isso o return await response.json()."},

{topic:"Async/Await",diff:"medium",type:"code",
text:"Escreva a FUNÇÃO async novo() que prepara e abre o formulário de novo jogo. Suponha que existem: obterGeneros() — retorna uma Promise com a lista de gêneros; e preencherSelectGeneros(generos) — preenche o <select> da tela. A função deve, dentro de um try, fazer 'const generos = await obterGeneros()' e chamar preencherSelectGeneros(generos); no catch, fazer alert(erro.message) e return; e, ao final (fora do catch), abrir o <dialog> da página com showModal().",
answer:`export async function novo() {
  try {
    const generos = await obterGeneros();
    preencherSelectGeneros( generos );
  } catch ( erro ) {
    alert( erro.message );
    return;
  }
  document.querySelector('dialog').showModal();
}`,
keywords:["async function novo","try","await obterGeneros","preencherSelectGeneros","catch","alert","return","querySelector","dialog","showModal"],
exp:"Primeiro busca os gêneros da API e preenche o <select>; só então abre o modal com showModal(). O return no catch impede abrir o dialog quando a busca falha."},

{topic:"Async/Await",diff:"hard",type:"code",
text:"Escreva a FUNÇÃO async salvar(event) do cadastro de jogo. Suponha que existe cadastrarJogo(jogo) — envia o jogo à API (Promise). A função deve: prevenir o padrão; pegar o <form> e abortar com return se form.reportValidity() for false; montar o objeto jogo a partir dos inputs de ids 'nome', 'nota' (convertido com Number) e 'genero'; e, dentro de um try, fazer await cadastrarJogo(jogo); no catch, alert(erro.message).",
answer:`export async function salvar( event ) {
  event.preventDefault();
  const form = document.querySelector('form');
  if ( !form.reportValidity() ) {
    return;
  }
  const jogo = {
    nome: document.getElementById('nome').value,
    nota: Number( document.getElementById('nota').value ),
    genero: document.getElementById('genero').value
  };
  try {
    await cadastrarJogo( jogo );
  } catch ( erro ) {
    alert( erro.message );
  }
}`,
keywords:["async function salvar","event.preventDefault","reportValidity","return","const jogo","getElementById","Number","try","await cadastrarJogo","catch","alert"],
exp:"reportValidity() roda a validação nativa do HTML5 e aborta se inválido. Number() converte a nota (o input devolve string). O try/catch trata falhas do cadastro com alert."},

{topic:"Async/Await",diff:"hard",type:"code",
text:"Escreva a FUNÇÃO async remover(event), chamada ao clicar no botão de remover de uma linha. O botão fica dentro de um <td data-id=\"...\"> (a célula de ações). Suponha que existe removerJogoComId(id) — remove o jogo na API (Promise). A função deve: obter a célula de ações com event.target.parentElement e ler o id em dataset.id; pedir confirmação com confirm(); se confirmado, num try, fazer await removerJogoComId(id) e remover a linha com tdAcoes.parentElement.remove(); no catch, alert(erro.message).",
answer:`export async function remover( event ) {
  const tdAcoes = event.target.parentElement;
  const id = tdAcoes.dataset.id;
  if ( !confirm( \`Deseja mesmo remover o jogo \${id}\` ) ) {
    return;
  }
  try {
    await removerJogoComId( id );
    tdAcoes.parentElement.remove();
  } catch ( erro ) {
    alert( erro.message );
  }
}`,
keywords:["async function remover","event.target.parentElement","dataset.id","confirm","return","try","await removerJogoComId","parentElement.remove","catch","alert"],
exp:"event.target é o botão; parentElement é o <td data-id>. confirm() pede confirmação. Após a remoção na API, tdAcoes.parentElement (o <tr>) é removido do DOM — mantendo tela e dados sincronizados."},

// ── REST / fetch (conceito, contexto json-server) ──
{topic:"REST/HTTP",diff:"medium",type:"mc",
text:"[REST] Na requisição DELETE para 'http://localhost:3000/jogos/5', o que é o 5 e qual o método?",
options:[
  "É o corpo enviado; método GET",
  "É o id do recurso a ser removido; método DELETE",
  "É a porta do servidor; método POST",
  "É a versão da API; método PUT"
],
answer:1,
exp:"A URL /jogos/5 identifica o recurso pelo id (5) e o método DELETE o remove. O json-server responde 200/204 em sucesso e 404 se o id não existir."},

{topic:"Promise/Fetch",diff:"medium",type:"mc",
text:"[fetch] Por que praticamente toda chamada fetch da disciplina verifica if(!response.ok) e lança um Error?",
options:[
  "fetch nunca falha sozinho",
  "Porque fetch só rejeita por falha de rede; status de erro (404, 500) resolvem com response.ok = false e precisam ser checados manualmente",
  "Porque o json-server exige isso",
  "Apenas por questão de estilo"
],
answer:1,
exp:"fetch só rejeita a Promise em falha de rede. Respostas 4xx/5xx resolvem normalmente, porém com response.ok = false — por isso o padrão if(!response.ok) throw new Error(...)."},

// ══════════════════════════════════════════════════════════
// LOTE DISCURSIVO AMPLIADO — questões "escreva o código"
// fácil / médio / difícil para cada tópico
// ══════════════════════════════════════════════════════════

// ── TIPOS ──
{topic:"Tipos",diff:"easy",type:"code",
text:"Escreva uma expressão que verifique se a variável valor é estritamente igual (mesmo tipo E valor) ao número 0.",
answer:"valor === 0",
keywords:["valor === 0"],
exp:"=== compara tipo e valor sem coerção. valor == 0 seria true também para false, '' e '0' (coerção). Prefira sempre ==="},

{topic:"Tipos",diff:"easy",type:"code",
text:"Escreva DUAS formas de converter a string '3.14' para o número 3.14 (uma com Number, outra com o operador unário +).",
answer:`Number('3.14')
+'3.14'`,
keywords:["Number('3.14')","+'3.14'"],
exp:"Number('3.14') converte a string inteira. O operador unário + faz o mesmo de forma mais curta. Ambos retornam NaN se houver caracteres não numéricos."},

{topic:"Tipos",diff:"medium",type:"code",
text:"Escreva uma expressão booleana que seja true quando a variável x for null OU undefined (use apenas um operador de comparação).",
answer:"x == null",
keywords:["x == null"],
exp:"x == null é true tanto para null quanto para undefined, graças à coerção especial do ==. É o único caso em que == é preferível a ===."},

{topic:"Tipos",diff:"hard",type:"code",
text:"Escreva uma função ehNumeroValido(x) que retorna true apenas se x for do tipo number e NÃO for NaN.",
answer:`function ehNumeroValido( x ) {
  return typeof x === 'number' && !isNaN( x );
}`,
keywords:["function ehNumeroValido","typeof x === 'number'","!isNaN( x )"],
exp:"typeof x === 'number' garante o tipo (NaN também é 'number'!). Por isso a segunda checagem !isNaN(x) descarta o NaN. Number.isNaN(x) seria a alternativa moderna."},

// ── ESCOPO ──
{topic:"Escopo",diff:"easy",type:"code",
text:"Declare uma constante PI com valor 3.14 e uma variável de bloco contador iniciada em 0 (use const e let).",
answer:`const PI = 3.14;
let contador = 0;`,
keywords:["const PI = 3.14","let contador = 0"],
exp:"const para valores que não serão reatribuídos; let para variáveis que mudam. Ambos têm escopo de bloco (diferente de var, que tem escopo de função)."},

{topic:"Escopo",diff:"medium",type:"code",
text:"Reescreva o laço a seguir trocando var por let para corrigir o vazamento de escopo: for (var i = 0; i < 3; i++) { }",
answer:"for ( let i = 0; i < 3; i++ ) { }",
keywords:["for","let i = 0","i < 3","i++"],
exp:"Com let, cada iteração do for tem seu próprio i (escopo de bloco). Com var, i vaza para o escopo da função e é compartilhado — causa bugs em callbacks dentro do laço."},

{topic:"Escopo",diff:"hard",type:"code",
text:"Escreva uma IIFE (função imediatamente invocada) que declara uma variável privada segredo com valor 42 e a imprime no console.",
answer:`(function() {
  const segredo = 42;
  console.log( segredo );
})();`,
keywords:["(function()","const segredo = 42","console.log( segredo )","})();"],
exp:"A IIFE cria um escopo isolado: segredo não vaza para o escopo global. Era o padrão clássico (pré-módulos) para encapsular variáveis e evitar poluir window."},

// ── DOM ──
{topic:"DOM",diff:"easy",type:"code",
text:"Selecione o elemento de id 'titulo' e altere seu texto para 'Olá' usando textContent.",
answer:"document.getElementById('titulo').textContent = 'Olá';",
keywords:["getElementById('titulo')","textContent","'Olá'"],
exp:"textContent define texto puro com segurança (sem interpretar HTML, sem risco de XSS). Para HTML formatado usaríamos innerHTML — mas evite com conteúdo de usuário."},

{topic:"DOM",diff:"medium",type:"code",
text:"Selecione todos os <li> dentro de uma <ul id='lista'> e imprima o texto de cada um no console (use querySelectorAll e forEach).",
answer:"document.querySelectorAll('#lista li').forEach( li => console.log( li.textContent ) );",
keywords:["querySelectorAll('#lista li')","forEach","li.textContent","console.log"],
exp:"querySelectorAll retorna um NodeList, que possui forEach nativo. O seletor '#lista li' pega todos os li descendentes da ul de id 'lista'."},

{topic:"DOM",diff:"hard",type:"code",
text:"Escreva uma função adicionarItem(texto) que cria um <li> com o texto recebido (sem innerHTML) e o anexa à <ul id='lista'>.",
answer:`function adicionarItem( texto ) {
  const li = document.createElement('li');
  li.append( texto );
  document.getElementById('lista').append( li );
}`,
keywords:["function adicionarItem","createElement('li')","li.append( texto )","getElementById('lista').append"],
exp:"createElement cria o nó; append() aceita string diretamente (appendChild exigiria createTextNode). Anexar ao DOM por último evita reflows desnecessários."},

// ── EVENTOS ──
{topic:"Eventos",diff:"easy",type:"code",
text:"Registre um listener de clique no botão de id 'salvar' que chama a função salvar.",
answer:"document.getElementById('salvar').addEventListener('click', salvar);",
keywords:["getElementById('salvar')","addEventListener('click'","salvar"],
exp:"addEventListener('click', salvar) — passa a referência da função (sem parênteses). Usar salvar() chamaria a função imediatamente, registrando o retorno dela como listener."},

{topic:"Eventos",diff:"medium",type:"code",
text:"A função handler foi registrada com btn.addEventListener('click', handler). Escreva o código que a remove.",
answer:"btn.removeEventListener('click', handler);",
keywords:["removeEventListener('click', handler)"],
exp:"removeEventListener exige a MESMA referência de função usada no addEventListener. Por isso funções anônimas inline não podem ser removidas depois."},

{topic:"Eventos",diff:"hard",type:"code",
text:"Implemente delegação de eventos: registre um ÚNICO clique na <ul id='lista'> que, ao clicar num <li>, imprime o texto do item (use event.target).",
answer:`document.getElementById('lista').addEventListener('click', event => {
  if ( event.target.tagName === 'LI' ) {
    console.log( event.target.textContent );
  }
});`,
keywords:["getElementById('lista')","addEventListener('click'","event.target","tagName === 'LI'","textContent"],
exp:"Delegação: um listener no pai atende a todos os filhos, inclusive os criados depois. event.target é o elemento clicado; checa-se tagName para reagir só aos <li>."},

// ── CLASSES ──
{topic:"Classes",diff:"easy",type:"code",
text:"Declare a classe Animal com um constructor que recebe nome e o armazena em this.nome.",
answer:`class Animal {
  constructor( nome ) {
    this.nome = nome;
  }
}`,
keywords:["class Animal","constructor( nome )","this.nome = nome"],
exp:"O constructor é o método especial chamado ao usar new Animal('Rex'). this.nome cria/atribui o atributo público da instância."},

{topic:"Classes",diff:"medium",type:"code",
text:"Crie a classe Retangulo com atributos privados #largura e #altura (recebidos no constructor) e um método area() que retorna largura × altura.",
answer:`class Retangulo {
  #largura;
  #altura;
  constructor( largura, altura ) {
    this.#largura = largura;
    this.#altura = altura;
  }
  area() {
    return this.#largura * this.#altura;
  }
}`,
keywords:["class Retangulo","#largura","#altura","constructor( largura, altura )","this.#largura","this.#altura","area()","return this.#largura * this.#altura"],
exp:"Atributos com # são privados (inacessíveis fora da classe). O método area() usa os privados via this.#. Encapsula os dados e expõe só o comportamento."},

{topic:"Classes",diff:"hard",type:"code",
text:"Crie a classe Quadrado que herda de Retangulo (constructor recebe lado), chamando o constructor pai com super(lado, lado).",
answer:`class Quadrado extends Retangulo {
  constructor( lado ) {
    super( lado, lado );
  }
}`,
keywords:["class Quadrado extends Retangulo","constructor( lado )","super( lado, lado )"],
exp:"extends estabelece a herança. super(lado, lado) chama o constructor de Retangulo passando o mesmo valor para largura e altura. super() deve ser a primeira instrução do constructor filho."},

// ── MÓDULOS ──
{topic:"Módulos",diff:"easy",type:"code",
text:"Em um módulo ESM, exporte de forma NOMEADA uma constante TAXA com valor 0.1 e uma função aplicar(v).",
answer:`export const TAXA = 0.1;
export function aplicar( v ) { return v * TAXA; }`,
keywords:["export const TAXA = 0.1","export function aplicar( v )"],
exp:"export na frente de const/function cria exportações nomeadas. Importam-se com chaves: import { TAXA, aplicar } from './arquivo.js'."},

{topic:"Módulos",diff:"medium",type:"code",
text:"Escreva uma instrução de import que traga o default export como Calc e o export nomeado soma do arquivo './calc.js'.",
answer:"import Calc, { soma } from './calc.js';",
keywords:["import Calc, { soma } from './calc.js'"],
exp:"O default vem sem chaves antes da vírgula; os nomeados, com chaves depois. Uma única instrução combina ambos."},

{topic:"Módulos",diff:"hard",type:"code",
text:"Escreva um módulo 'geometria.js' que exporta PI e a função areaCirculo de forma NOMEADA, e exporta a classe Circulo como DEFAULT.",
answer:`export const PI = 3.14159;
export function areaCirculo( r ) { return PI * r * r; }
export default class Circulo {}`,
keywords:["export const PI","export function areaCirculo","export default class Circulo"],
exp:"Um módulo pode ter vários exports nomeados e UM default. O default é importado sem chaves e com nome livre; os nomeados, com chaves e nome fixo."},

// ── STORAGE ──
{topic:"Storage",diff:"easy",type:"code",
text:"Salve o número 5 no localStorage na chave 'contador' (lembre que o storage só aceita strings).",
answer:"localStorage.setItem('contador', '5');",
keywords:["localStorage.setItem('contador'","'5'"],
exp:"setItem grava strings. O número 5 vira '5'. Ao ler com getItem você recupera a string '5' — converta com Number() se precisar do número."},

{topic:"Storage",diff:"medium",type:"code",
text:"Leia a chave 'tema' do localStorage; se não existir, use 'claro' como valor padrão (use o operador ||).",
answer:"const tema = localStorage.getItem('tema') || 'claro';",
keywords:["localStorage.getItem('tema')","|| 'claro'"],
exp:"getItem retorna null para chave inexistente; null é falsy, então || 'claro' fornece o padrão. Padrão idêntico ao usado com JSON.parse(...) || '[]'."},

{topic:"Storage",diff:"hard",type:"code",
text:"Escreva uma função adicionarFavorito(item) que lê o array da chave 'favoritos' (padrão []), faz push do item e salva novamente serializado.",
answer:`function adicionarFavorito( item ) {
  const favoritos = JSON.parse( localStorage.getItem('favoritos') || '[]' );
  favoritos.push( item );
  localStorage.setItem( 'favoritos', JSON.stringify( favoritos ) );
}`,
keywords:["function adicionarFavorito","JSON.parse","localStorage.getItem('favoritos') || '[]'","favoritos.push( item )","localStorage.setItem( 'favoritos'","JSON.stringify( favoritos )"],
exp:"Ler (parse + fallback '[]'), modificar (push) e regravar (stringify) é o ciclo padrão para coleções no localStorage, que só guarda strings."},

// ── ARRAYS ──
{topic:"Arrays",diff:"easy",type:"code",
text:"Crie um novo array dobros multiplicando por 2 cada elemento de nums (use map).",
answer:"const dobros = nums.map( n => n * 2 );",
keywords:["nums.map","n => n * 2"],
exp:"map() aplica a função a cada elemento e devolve um NOVO array, sem alterar nums. Use forEach apenas quando NÃO precisar do array resultante."},

{topic:"Arrays",diff:"medium",type:"code",
text:"A partir de nums, gere um array apenas com os números maiores que 10, já multiplicados por 100 (use filter e map encadeados).",
answer:"const result = nums.filter( n => n > 10 ).map( n => n * 100 );",
keywords:["nums.filter","n > 10","map","n * 100"],
exp:"filter() seleciona, map() transforma. Encadear filter().map() é o padrão recorrente da disciplina para filtrar e formatar listas."},

{topic:"Arrays",diff:"hard",type:"code",
text:"Escreva uma função totalEstoque(produtos) que soma o campo estoque de um array de objetos {nome, estoque} usando reduce a partir de 0.",
answer:`function totalEstoque( produtos ) {
  return produtos.reduce( ( acc, p ) => acc + p.estoque, 0 );
}`,
keywords:["function totalEstoque","produtos.reduce","( acc, p ) => acc + p.estoque","0"],
exp:"reduce(reducer, valorInicial) acumula em acc. p.estoque é somado a cada iteração; o 0 é o valor inicial do acumulador. Resultado: a soma total."},

// ── EXCEÇÕES ──
{topic:"Exceções",diff:"easy",type:"code",
text:"Escreva uma instrução que lance um Error com a mensagem 'Dados inválidos'.",
answer:"throw new Error('Dados inválidos');",
keywords:["throw new Error('Dados inválidos')"],
exp:"throw new Error('msg') lança uma exceção. A mensagem fica disponível em e.message dentro do catch que a capturar."},

{topic:"Exceções",diff:"medium",type:"code",
text:"Envolva a chamada processar() em um try/catch que imprime a mensagem do erro no console e um finally que imprime 'fim'.",
answer:`try {
  processar();
} catch ( e ) {
  console.error( e.message );
} finally {
  console.log( 'fim' );
}`,
keywords:["try","processar()","catch ( e )","console.error( e.message )","finally","console.log( 'fim' )"],
exp:"catch recebe o erro em e; e.message tem o texto. finally SEMPRE executa — mesmo com return ou erro no try. Use-o para liberar recursos."},

{topic:"Exceções",diff:"hard",type:"code",
text:"Crie uma classe SaldoInsuficiente que herda de Error e redefine this.name; depois lance-a com a mensagem 'Saldo baixo'.",
answer:`class SaldoInsuficiente extends Error {
  constructor( message ) {
    super( message );
    this.name = 'SaldoInsuficiente';
  }
}
throw new SaldoInsuficiente('Saldo baixo');`,
keywords:["class SaldoInsuficiente extends Error","constructor( message )","super( message )","this.name = 'SaldoInsuficiente'","throw new SaldoInsuficiente('Saldo baixo')"],
exp:"extends Error herda message e stack. super(message) primeiro. this.name faz o console mostrar 'SaldoInsuficiente: Saldo baixo' em vez de 'Error: ...'."},

// ── OPERADORES ──
{topic:"Operadores",diff:"easy",type:"code",
text:"Usando o operador ternário, atribua a status o valor 'ativo' se logado for true, senão 'inativo'.",
answer:"const status = logado ? 'ativo' : 'inativo';",
keywords:["logado ? 'ativo' : 'inativo'"],
exp:"condicao ? valorSeVerdadeiro : valorSeFalso. O ternário é uma expressão (retorna valor), por isso pode ser atribuído a uma variável."},

{topic:"Operadores",diff:"medium",type:"code",
text:"Desestruture o objeto pessoa = {nome, idade} extraindo nome e idade em duas constantes.",
answer:"const { nome, idade } = pessoa;",
keywords:["const { nome, idade } = pessoa"],
exp:"Desestruturação de objeto: as constantes recebem os valores das propriedades de mesmo nome. Equivale a const nome = pessoa.nome; const idade = pessoa.idade."},

{topic:"Operadores",diff:"hard",type:"code",
text:"Escreva uma função juntar(...itens) que recebe qualquer quantidade de argumentos (rest) e retorna todos concatenados num único array junto com os elementos de base (spread).",
answer:`function juntar( ...itens ) {
  return [ ...base, ...itens ];
}`,
keywords:["function juntar( ...itens )","return [ ...base, ...itens ]"],
exp:"...itens no parâmetro é REST (agrupa argumentos num array). ...base e ...itens dentro do literal são SPREAD (espalham elementos). Mesmo símbolo, contextos opostos."},

// ── PROMISE / FETCH ──
{topic:"Promise/Fetch",diff:"easy",type:"code",
text:"Crie uma Promise resolvida imediatamente com o valor 42 (use Promise.resolve).",
answer:"const p = Promise.resolve( 42 );",
keywords:["Promise.resolve( 42 )"],
exp:"Promise.resolve(valor) devolve uma Promise já cumprida (fulfilled). Útil para padronizar retornos e em testes. O inverso é Promise.reject(motivo)."},

{topic:"Promise/Fetch",diff:"medium",type:"code",
text:"Usando .then/.catch, faça fetch em '/api/itens', converta a resposta em JSON e imprima os dados; trate erros com console.error.",
answer:`fetch('/api/itens')
  .then( r => r.json() )
  .then( dados => console.log( dados ) )
  .catch( e => console.error( e ) );`,
keywords:["fetch('/api/itens')","then( r => r.json() )","then( dados => console.log( dados ) )","catch( e => console.error( e ) )"],
exp:"Cada .then encadeia: o primeiro converte a resposta (r.json() retorna Promise), o segundo usa os dados. .catch captura qualquer rejeição da cadeia."},

{topic:"Promise/Fetch",diff:"hard",type:"code",
text:"Dispare duas requisições em PARALELO (op1() e op2()) e aguarde ambas com Promise.all, desestruturando os resultados em a e b.",
answer:"const [ a, b ] = await Promise.all( [ op1(), op2() ] );",
keywords:["const [ a, b ] = await Promise.all","[ op1(), op2() ]"],
exp:"Iniciar as duas Promises e passá-las a Promise.all executa em paralelo. O tempo total cai para max(op1, op2) em vez de op1 + op2 (sequencial)."},

// ── ASYNC / AWAIT ──
{topic:"Async/Await",diff:"easy",type:"code",
text:"Declare uma função assíncrona carregar() que faz await de buscar() e retorna o resultado.",
answer:`async function carregar() {
  const dados = await buscar();
  return dados;
}`,
keywords:["async function carregar()","await buscar()","return dados"],
exp:"async permite usar await dentro da função. await pausa até a Promise de buscar() resolver. A função async sempre retorna uma Promise."},

{topic:"Async/Await",diff:"medium",type:"code",
text:"Reescreva usando async/await: buscar().then(d => console.log(d)).catch(e => console.error(e))",
answer:`try {
  const d = await buscar();
  console.log( d );
} catch ( e ) {
  console.error( e );
}`,
keywords:["try","await buscar()","console.log( d )","catch ( e )","console.error( e )"],
exp:"async/await transforma a cadeia .then em código sequencial. O .catch vira o bloco catch. Mais legível para várias operações encadeadas."},

{topic:"Async/Await",diff:"hard",type:"code",
text:"Escreva async carregarUsuario(id) que: faz await fetch em '/usuarios/{id}'; lança Error se !response.ok; retorna o JSON. Use template literal na URL.",
answer:`async function carregarUsuario( id ) {
  const response = await fetch( \`/usuarios/\${id}\` );
  if ( !response.ok ) {
    throw new Error( 'Erro ao carregar usuário' );
  }
  return response.json();
}`,
keywords:["async function carregarUsuario( id )","await fetch","/usuarios/","!response.ok","throw new Error","return response.json()"],
exp:"Template literal `/usuarios/${id}` injeta o id na URL. fetch não lança para 404/500 — checa-se response.ok. return response.json() devolve a Promise (sem await redundante)."},

// ── REST / HTTP ──
{topic:"REST/HTTP",diff:"easy",type:"code",
text:"Escreva uma chamada fetch que faz uma requisição GET simples para 'http://localhost:3000/jogos'.",
answer:"const response = await fetch('http://localhost:3000/jogos');",
keywords:["await fetch('http://localhost:3000/jogos')"],
exp:"GET é o método padrão do fetch — não precisa especificar options. Lembre de checar response.ok antes de usar response.json()."},

{topic:"REST/HTTP",diff:"medium",type:"code",
text:"Escreva uma chamada fetch que ATUALIZA (PUT) o jogo de id 7 em '/jogos/7', enviando JSON com header Content-Type.",
answer:`await fetch('/jogos/7', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify( jogo )
});`,
keywords:["fetch('/jogos/7'","method: 'PUT'","'Content-Type': 'application/json'","body: JSON.stringify( jogo )"],
exp:"PUT atualiza um recurso existente (id na URL). O header Content-Type avisa que o corpo é JSON e o body envia o objeto serializado com JSON.stringify."},

{topic:"REST/HTTP",diff:"hard",type:"code",
text:"Escreva async criarRecurso(url, dados) que faz POST enviando dados como JSON; lança Error com o status se !response.ok; retorna o recurso criado (JSON).",
answer:`async function criarRecurso( url, dados ) {
  const response = await fetch( url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( dados )
  });
  if ( !response.ok ) {
    throw new Error( 'Erro ' + response.status );
  }
  return response.json();
}`,
keywords:["async function criarRecurso( url, dados )","method: 'POST'","'Content-Type': 'application/json'","JSON.stringify( dados )","!response.ok","throw new Error","response.status","return response.json()"],
exp:"POST cria recurso. O servidor (json-server) devolve o objeto criado já com id — por isso return response.json(). response.status entra na mensagem de erro para diagnóstico."},

// ── ARROW FUNCTIONS ──
{topic:"Arrow Functions",diff:"easy",type:"code",
text:"Converta para arrow function sem corpo: const triplo = function(n) { return n * 3; }",
answer:"const triplo = n => n * 3;",
keywords:["const triplo = n => n * 3"],
exp:"Único parâmetro dispensa parênteses; corpo de uma expressão dispensa chaves e return. n => n * 3 é a forma mais concisa."},

{topic:"Arrow Functions",diff:"medium",type:"code",
text:"Escreva uma arrow function ehPar que recebe um número e retorna true se for par (resto da divisão por 2 igual a 0).",
answer:"const ehPar = n => n % 2 === 0;",
keywords:["const ehPar = n => n % 2 === 0"],
exp:"n % 2 === 0 é true para pares. A arrow sem corpo retorna a expressão diretamente. Ideal como callback de filter: nums.filter(ehPar)."},

{topic:"Arrow Functions",diff:"hard",type:"code",
text:"Escreva uma arrow function criarContador que retorna OUTRA arrow function; cada chamada da interna incrementa e retorna um contador interno (closure).",
answer:`const criarContador = () => {
  let n = 0;
  return () => ++n;
};`,
keywords:["const criarContador = () =>","let n = 0","return () => ++n"],
exp:"A arrow interna forma uma closure sobre n: lembra o valor entre chamadas. const c = criarContador(); c() → 1, c() → 2. Zero parâmetros exige parênteses ()."},

// ── JS BÁSICO ──
{topic:"JS Básico",diff:"easy",type:"code",
text:"Escreva uma função saudar(nome) que retorna a string 'Olá, <nome>!' usando template literal.",
answer:"function saudar( nome ) { return \`Olá, \${nome}!\`; }",
keywords:["function saudar( nome )","Olá, ","${nome}"],
exp:"Template literals (crases) permitem interpolar com ${...}. Equivale a 'Olá, ' + nome + '!', porém mais legível."},

{topic:"JS Básico",diff:"medium",type:"code",
text:"Percorra o array notas com for..of e acumule a soma em uma variável total.",
answer:`let total = 0;
for ( const nota of notas ) {
  total += nota;
}`,
keywords:["let total = 0","for ( const nota of notas )","total += nota"],
exp:"for..of percorre os VALORES do array (não os índices, como for..in). Acumula em total. Para arrays simples, for..of é o laço pedido nas provas."},

{topic:"JS Básico",diff:"hard",type:"code",
text:"Escreva uma função multiplicador(fator) que retorna uma função; a função retornada multiplica seu argumento pelo fator capturado (closure).",
answer:`function multiplicador( fator ) {
  return function( x ) {
    return x * fator;
  };
}`,
keywords:["function multiplicador( fator )","return function( x )","return x * fator"],
exp:"A função interna 'lembra' fator mesmo após multiplicador retornar — isso é uma closure. const dobro = multiplicador(2); dobro(5) → 10."},

// ── JSON ──
{topic:"JSON",diff:"easy",type:"code",
text:"Converta o objeto { nome: 'Ana', idade: 30 } em uma string JSON.",
answer:"const json = JSON.stringify( { nome: 'Ana', idade: 30 } );",
keywords:["JSON.stringify( { nome: 'Ana', idade: 30 } )"],
exp:"JSON.stringify converte valor JS em texto JSON. Necessário para salvar objetos no localStorage (que só aceita strings) ou enviá-los no body de um fetch."},

{topic:"JSON",diff:"medium",type:"code",
text:"Faça o parse seguro da chave 'lista' do localStorage, retornando [] caso a chave não exista.",
answer:"const lista = JSON.parse( localStorage.getItem('lista') || '[]' );",
keywords:["JSON.parse","localStorage.getItem('lista') || '[]'"],
exp:"getItem retorna null se a chave não existir; || '[]' garante uma string JSON válida. JSON.parse('[]') devolve um array vazio, evitando erros ao iterar."},

{topic:"JSON",diff:"hard",type:"code",
text:"Escreva JSON.stringify do objeto config com indentação de 2 espaços (formato legível).",
answer:"const texto = JSON.stringify( config, null, 2 );",
keywords:["JSON.stringify( config, null, 2 )"],
exp:"O 2º argumento (replacer) é null; o 3º (space) define a indentação. JSON.stringify(config, null, 2) gera um JSON identado com 2 espaços, fácil de ler."},

// ── HTML / CSS ──
{topic:"HTML/CSS",diff:"easy",type:"code",
text:"Escreva o HTML de um <label> 'Nome' associado a um <input> de id 'nome' (use o atributo for).",
answer:`<label for="nome">Nome</label>
<input type="text" id="nome">`,
keywords:['<label for="nome">','<input','id="nome"'],
exp:"O for do label aponta para o id do input. Clicar no rótulo foca o campo e melhora a acessibilidade para leitores de tela."},

{topic:"HTML/CSS",diff:"medium",type:"code",
text:"Escreva o HTML de um <input type='number'> de id 'idade' que aceite valores entre 0 e 120 e seja obrigatório.",
answer:`<input type="number" id="idade" min="0" max="120" required>`,
keywords:['<input','type="number"','id="idade"','min="0"','max="120"','required'],
exp:"min e max delimitam o intervalo de valores numéricos (diferente de minlength/maxlength, que contam caracteres). required torna o campo obrigatório."},

{topic:"HTML/CSS",diff:"hard",type:"code",
text:"Escreva o JavaScript para abrir como modal um <dialog id='cadastro'> ao clicar no botão id 'abrir', e fechá-lo ao clicar no botão id 'fechar'.",
answer:`const dialog = document.getElementById('cadastro');
document.getElementById('abrir').addEventListener('click', () => dialog.showModal());
document.getElementById('fechar').addEventListener('click', () => dialog.close());`,
keywords:["getElementById('cadastro')","getElementById('abrir')","showModal()","getElementById('fechar')","dialog.close()"],
exp:"showModal() abre o <dialog> como modal (bloqueia o fundo, fecha com Esc); close() o fecha programaticamente. show() abriria sem bloquear a página."},

// ── MVC / MVP ──
{topic:"MVC/MVP",diff:"medium",type:"code",
text:"[Visão] Escreva os métodos de entrada/saída da Visão: obterNumero1() lê o input de id 'n1'; mostrarResultado(r) escreve r no elemento de id 'resultado'.",
answer:`obterNumero1() {
  return document.getElementById('n1').value;
}
mostrarResultado( r ) {
  document.getElementById('resultado').textContent = r;
}`,
keywords:["obterNumero1()","getElementById('n1').value","mostrarResultado( r )","getElementById('resultado').textContent"],
exp:"A Visão concentra o acesso ao DOM: lê entradas (value) e escreve saídas (textContent). O Modelo e a Controladora nunca tocam no DOM — chamam esses métodos."},

{topic:"MVC/MVP",diff:"hard",type:"code",
text:"[Controladora MVC] No constructor, crie o Modelo e a Visão e registre o callback: this.visao.aoDispararSomar(this.somar.bind(this)).",
answer:`constructor() {
  this.modelo = new Calculadora();
  this.visao = new VisaoCalculadora();
  this.visao.aoDispararSomar( this.somar.bind( this ) );
}`,
keywords:["constructor()","this.modelo = new Calculadora()","this.visao = new VisaoCalculadora()","this.visao.aoDispararSomar( this.somar.bind( this ) )"],
exp:"No MVC a Controladora orquestra: instancia Modelo e Visão e registra seu método como callback. bind(this) é obrigatório, senão 'this' dentro de somar perderia a referência da Controladora."},

// ══════════════════════════════════════════════════════════
// LOTE DISCURSIVO 2 — MUITAS questões no estilo da prova
// Ênfase em FÁCEIS (blocos atômicos p/ aprender) → médio → difícil
// ══════════════════════════════════════════════════════════

// ───────────────────── FÁCEIS (blocos da prova) ─────────────────────

{topic:"Eventos",diff:"easy",type:"code",
text:"[Prova] Dentro de salvar(event), escreva a primeira linha que impede o comportamento padrão do formulário.",
answer:"event.preventDefault();",
keywords:["event.preventDefault()"],
exp:"event.preventDefault() impede o envio (submit) padrão do formulário, permitindo tratar o salvamento por JavaScript. É sempre a 1ª linha de salvar(event) nas provas."},

{topic:"Eventos",diff:"easy",type:"code",
text:"[Prova] Registre o clique do único <button> da página para chamar a função salvar.",
answer:"document.querySelector('button').addEventListener('click', salvar);",
keywords:["querySelector('button')","addEventListener('click', salvar)"],
exp:"Passe a REFERÊNCIA salvar (sem parênteses). salvar() chamaria a função na hora. Esse registro aparece em quase toda questão de cadastro."},

{topic:"Eventos",diff:"easy",type:"code",
text:"[Prova] Execute a função listar somente após o DOM ser carregado (use DOMContentLoaded).",
answer:"document.addEventListener('DOMContentLoaded', listar);",
keywords:["addEventListener('DOMContentLoaded', listar)"],
exp:"DOMContentLoaded dispara quando o HTML está pronto (antes de imagens/CSS). Garante que os elementos já existem quando listar() roda."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Leia o texto digitado no input de id 'nome' e guarde na constante nome.",
answer:"const nome = document.getElementById('nome').value;",
keywords:["const nome = document.getElementById('nome').value"],
exp:".value lê o conteúdo digitado em um input. getElementById('nome') seleciona o campo pelo id. Padrão de leitura de formulários."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Leia o valor do input de id 'valor' e guarde na constante valor.",
answer:"const valor = document.getElementById('valor').value;",
keywords:["const valor = document.getElementById('valor').value"],
exp:"input.value sempre devolve uma STRING — converta com Number() quando precisar comparar ou calcular."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Leia o valor do input de id 'idade' já convertendo para número (use Number).",
answer:"const idade = Number( document.getElementById('idade').value );",
keywords:["Number(","getElementById('idade').value"],
exp:"input.value é string; Number(...) converte para número. Sem a conversão, comparações como valor < 50 podem dar resultado errado."},

{topic:"Storage",diff:"easy",type:"code",
text:"[Prova] Leia o array da chave 'cadastro' do localStorage; use [] se a chave não existir.",
answer:"const cadastros = JSON.parse( localStorage.getItem('cadastro') ) || [];",
keywords:["JSON.parse","localStorage.getItem('cadastro')","|| []"],
exp:"getItem devolve null se a chave não existe; JSON.parse(null) é null; o || [] garante um array para dar push/iterar sem erro."},

{topic:"Storage",diff:"easy",type:"code",
text:"[Prova] Salve o array cadastros na chave 'cadastro' do localStorage (serializado).",
answer:"localStorage.setItem( 'cadastro', JSON.stringify( cadastros ) );",
keywords:["localStorage.setItem( 'cadastro'","JSON.stringify( cadastros )"],
exp:"O storage só guarda strings — JSON.stringify converte o array. Para reler: JSON.parse(localStorage.getItem('cadastro'))."},

{topic:"Storage",diff:"easy",type:"code",
text:"[Prova] Leia a string da chave 'tema' do localStorage e guarde em tema.",
answer:"const tema = localStorage.getItem('tema');",
keywords:["const tema = localStorage.getItem('tema')"],
exp:"getItem(chave) devolve a string salva, ou null se a chave nunca foi gravada."},

{topic:"Arrays",diff:"easy",type:"code",
text:"[Prova] Adicione o objeto cadastro ao fim do array cadastros.",
answer:"cadastros.push( cadastro );",
keywords:["cadastros.push( cadastro )"],
exp:"push() acrescenta ao fim do array e devolve o novo comprimento. É o passo entre criar o objeto e salvar no localStorage."},

{topic:"HTML/CSS",diff:"easy",type:"code",
text:"[Prova] Limpe todos os campos do formulário da página após salvar (use reset).",
answer:"document.querySelector('form').reset();",
keywords:["querySelector('form').reset()"],
exp:"form.reset() restaura os campos aos valores iniciais (vazios). Costuma vir no fim de salvar(), após o cadastro dar certo."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Selecione o elemento <output> da página e guarde na constante output.",
answer:"const output = document.querySelector('output');",
keywords:["const output = document.querySelector('output')"],
exp:"<output> é o local semântico para mensagens de sucesso/erro. Preenche-se com output.innerText (texto) ou output.innerHTML (HTML)."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Exiba a mensagem 'Cadastro realizado com sucesso' no elemento output (texto puro).",
answer:"output.innerText = 'Cadastro realizado com sucesso';",
keywords:["output.innerText = 'Cadastro realizado com sucesso'"],
exp:"innerText insere texto simples, sem interpretar HTML. Para várias linhas de erro com <p>, usa-se innerHTML."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Crie um elemento <tr> e guarde na constante tr.",
answer:"const tr = document.createElement('tr');",
keywords:["const tr = document.createElement('tr')"],
exp:"createElement('tr') cria a linha da tabela na memória. Ela só aparece na tela após ser anexada (append) ao tbody."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Crie um <td>, defina seu textContent como c.nome e guarde em tdNome.",
answer:`const tdNome = document.createElement('td');
tdNome.textContent = c.nome;`,
keywords:["createElement('td')","tdNome.textContent = c.nome"],
exp:"textContent insere texto com segurança (sem XSS, diferente de innerHTML). Cada <td> é uma célula da linha."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Anexe as células tdNome e tdValor ao tr (de uma só vez).",
answer:"tr.append( tdNome, tdValor );",
keywords:["tr.append( tdNome, tdValor )"],
exp:"append() aceita vários nós de uma vez. Anexar as duas células à linha antes de inserir a linha no tbody reduz reflows."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Selecione o <tbody> e anexe a linha tr a ele.",
answer:"document.querySelector('tbody').append( tr );",
keywords:["querySelector('tbody').append( tr )"],
exp:"O <tbody> recebe as linhas de dados. append(tr) insere a linha já montada — é quando ela aparece na tabela."},

{topic:"Arrays",diff:"easy",type:"code",
text:"[Prova] Filtre cadastros mantendo apenas os com valor numérico maior ou igual a 100.",
answer:"const filtrados = cadastros.filter( c => Number( c.valor ) >= 100 );",
keywords:["cadastros.filter","Number( c.valor ) >= 100"],
exp:"filter devolve um novo array só com os que passam no teste. Number(c.valor) converte a string antes de comparar — passo essencial."},

{topic:"Tipos",diff:"easy",type:"code",
text:"[Prova] Escreva a condição que é verdadeira quando valor NÃO é um número (use isNaN e Number).",
answer:"isNaN( Number( valor ) )",
keywords:["isNaN( Number( valor ) )"],
exp:"Number(valor) converte a string; isNaN(...) é true quando o resultado não é número. Padrão de validação numérica das provas (não use !Number(valor))."},

{topic:"JS Básico",diff:"easy",type:"code",
text:"[Prova] Some o comprimento (length) de cada nome do array nomes na variável soma usando for..of.",
answer:`for ( const nome of nomes ) {
  soma += nome.length;
}`,
keywords:["for ( const nome of nomes )","soma += nome.length"],
exp:"for..of percorre os VALORES do array. nome.length é o nº de caracteres. Era exatamente a base da questão mediaDosNomes da prova."},

{topic:"Arrays",diff:"easy",type:"code",
text:"[Prova] Transforme cadastros num array de <li> com c.nome (use map e template literal).",
answer:`const itens = cadastros.map( c => \`<li>\${c.nome}</li>\` );`,
keywords:["cadastros.map","<li>","${c.nome}"],
exp:"map devolve um novo array — aqui, de strings <li>. O template literal (crases) interpola ${c.nome}. Depois junta-se com join('')."},

{topic:"Arrays",diff:"easy",type:"code",
text:"[Prova] Junte o array itens (strings) numa única string sem separador.",
answer:"const texto = itens.join('');",
keywords:["itens.join('')"],
exp:"join('') concatena todos os elementos sem nada entre eles. Resultado: uma string de HTML pronta para innerHTML."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Coloque a string texto dentro da <ul id='lista'> usando innerHTML.",
answer:"document.getElementById('lista').innerHTML = texto;",
keywords:["getElementById('lista').innerHTML = texto"],
exp:"innerHTML interpreta a string como HTML (cria os <li>). Útil para listas montadas com map().join('') — mas evite com dados do usuário (XSS)."},

{topic:"Classes",diff:"easy",type:"code",
text:"[Prova] Declare dois atributos privados #descricao e #valor dentro de uma classe.",
answer:`#descricao;
#valor;`,
keywords:["#descricao;","#valor;"],
exp:"O # torna o atributo privado (inacessível fora da classe). Declaram-se pelo nome, sem let/const. Base da classe Servico da prova."},

{topic:"Classes",diff:"easy",type:"code",
text:"[Prova] Escreva um getter público valor que retorna o atributo privado #valor.",
answer:`get valor() {
  return this.#valor;
}`,
keywords:["get valor()","return this.#valor"],
exp:"O getter expõe o valor de um atributo privado para leitura externa (obj.valor), sem permitir acesso direto ao #valor."},

{topic:"Classes",diff:"easy",type:"code",
text:"[Prova] Escreva um setter valor que atribui valorNovo ao atributo privado #valor.",
answer:`set valor( valorNovo ) {
  this.#valor = valorNovo;
}`,
keywords:["set valor( valorNovo )","this.#valor = valorNovo"],
exp:"O setter intercepta a atribuição obj.valor = x. É o ponto onde se costuma validar antes de gravar no atributo privado."},

{topic:"Classes",diff:"easy",type:"code",
text:"[Prova] Escreva o método paraObjeto() que retorna um objeto simples com descricao e valor (a partir dos privados).",
answer:`paraObjeto() {
  return { descricao: this.#descricao, valor: this.#valor };
}`,
keywords:["paraObjeto()","return { descricao: this.#descricao, valor: this.#valor }"],
exp:"paraObjeto() converte a INSTÂNCIA em objeto simples antes de salvar no localStorage (a instância perderia métodos/privados ao serializar)."},

{topic:"Operadores",diff:"easy",type:"code",
text:"[Prova] Escreva a assinatura de um constructor que recebe um objeto desestruturado com descricao e valor.",
answer:"constructor( { descricao, valor } ) {}",
keywords:["constructor( { descricao, valor } )"],
exp:"A desestruturação no parâmetro extrai descricao e valor do objeto recebido. Permite chamar new Servico({descricao, valor})."},

{topic:"Exceções",diff:"easy",type:"code",
text:"[Prova] Adicione a mensagem 'O nome deve ter entre 2 e 100 caracteres' ao array de erros validacao.",
answer:"validacao.push( 'O nome deve ter entre 2 e 100 caracteres' );",
keywords:["validacao.push( 'O nome deve ter entre 2 e 100 caracteres' )"],
exp:"Em vez de lançar exceção, o padrão da prova acumula mensagens num array e quem chama checa validacao.length > 0."},

{topic:"Operadores",diff:"easy",type:"code",
text:"[Prova] Atribua a status 'aprovado' se nota >= 6, senão 'reprovado' (operador ternário).",
answer:"const status = nota >= 6 ? 'aprovado' : 'reprovado';",
keywords:["nota >= 6 ? 'aprovado' : 'reprovado'"],
exp:"condicao ? a : b é uma expressão que devolve um valor. Mais conciso que if/else para escolher entre dois valores."},

{topic:"Arrays",diff:"easy",type:"code",
text:"[Prova] Escreva a condição usada para saber se o array problemas contém algum erro.",
answer:"problemas.length > 0",
keywords:["problemas.length > 0"],
exp:"length > 0 indica que há mensagens de erro. Quando verdadeiro, exibe-se os erros e interrompe (return) o salvamento."},

{topic:"Eventos",diff:"easy",type:"code",
text:"[Prova] Remova do DOM o elemento guardado na variável liEscolhida.",
answer:"liEscolhida.remove();",
keywords:["liEscolhida.remove()"],
exp:".remove() exclui o próprio elemento do DOM. Usado após apagar o item correspondente do array e do localStorage."},

{topic:"Async/Await",diff:"easy",type:"code",
text:"[Prova] Declare uma função assíncrona obterDados() com corpo vazio.",
answer:"async function obterDados() {}",
keywords:["async function obterDados()"],
exp:"async torna a função assíncrona: ela retorna uma Promise e permite usar await no corpo."},

{topic:"Promise/Fetch",diff:"easy",type:"code",
text:"[Prova] Faça um await fetch GET para '/jogos' e guarde a resposta em response.",
answer:"const response = await fetch('/jogos');",
keywords:["const response = await fetch('/jogos')"],
exp:"GET é o método padrão do fetch. await pausa até a resposta chegar. Sempre cheque response.ok depois antes de usar os dados."},

{topic:"Promise/Fetch",diff:"easy",type:"code",
text:"[Prova] Lance um Error com a mensagem 'Erro ao obter os jogos' caso a resposta não seja bem-sucedida.",
answer:`if ( !response.ok ) {
  throw new Error('Erro ao obter os jogos');
}`,
keywords:["if ( !response.ok )","throw new Error('Erro ao obter os jogos')"],
exp:"fetch não rejeita em 404/500 — response.ok fica false. Por isso checa-se manualmente e lança-se o erro para o catch tratar."},

{topic:"Async/Await",diff:"easy",type:"code",
text:"[Prova] Retorne o corpo da resposta convertido em objeto/JSON.",
answer:"return response.json();",
keywords:["return response.json()"],
exp:"response.json() devolve uma Promise com o objeto. Num return de função async, não precisa de await (o chamador aguarda)."},

{topic:"REST/HTTP",diff:"easy",type:"code",
text:"[Prova] Faça um await fetch DELETE para '/jogos/5'.",
answer:"const response = await fetch('/jogos/5', { method: 'DELETE' });",
keywords:["fetch('/jogos/5'","method: 'DELETE'"],
exp:"DELETE remove o recurso identificado na URL (id 5). O método vai nas opções: { method: 'DELETE' }."},

{topic:"Arrow Functions",diff:"easy",type:"code",
text:"[Prova] Converta para arrow function sem corpo: function(c){ return Number(c.valor); }",
answer:"c => Number( c.valor )",
keywords:["c => Number( c.valor )"],
exp:"Único parâmetro dispensa parênteses; corpo de uma expressão dispensa chaves e return. Comum como callback de filter/map."},

{topic:"JSON",diff:"easy",type:"code",
text:"[Prova] Serialize o objeto cadastro em uma string JSON.",
answer:"JSON.stringify( cadastro )",
keywords:["JSON.stringify( cadastro )"],
exp:"JSON.stringify converte valor JS em texto JSON — necessário para gravar no localStorage ou enviar no body de um fetch."},

{topic:"JSON",diff:"easy",type:"code",
text:"[Prova] Converta a string JSON guardada em texto de volta para objeto JavaScript.",
answer:"JSON.parse( texto )",
keywords:["JSON.parse( texto )"],
exp:"JSON.parse transforma texto JSON em valor JS (objeto/array). Lança SyntaxError se o texto for inválido."},

{topic:"HTML/CSS",diff:"easy",type:"code",
text:"[Prova] Escreva o HTML de um input de texto de id 'nome', obrigatório.",
answer:`<input type="text" id="nome" required>`,
keywords:['<input','type="text"','id="nome"','required'],
exp:"required impede o envio com o campo vazio e ativa a validação nativa do navegador (vista por reportValidity())."},

{topic:"HTML/CSS",diff:"easy",type:"code",
text:"[Prova] Escreva o HTML de um <label> 'Valor' associado ao input de id 'valor' (atributo for).",
answer:`<label for="valor">Valor</label>`,
keywords:['<label for="valor">'],
exp:"O for do label aponta para o id do input. Clicar no rótulo foca o campo e melhora a acessibilidade."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Selecione o <tbody> da página e guarde na constante tbody.",
answer:"const tbody = document.querySelector('tbody');",
keywords:["const tbody = document.querySelector('tbody')"],
exp:"querySelector('tbody') pega o corpo da tabela, onde as linhas de dados são inseridas/limpas via JavaScript."},

{topic:"Tipos",diff:"easy",type:"code",
text:"[Prova] Converta a string em valor para o número equivalente e guarde em valorNum.",
answer:"const valorNum = Number( valor );",
keywords:["const valorNum = Number( valor )"],
exp:"Number() converte string em número (NaN se houver caracteres inválidos). Faça isso antes de comparar valores numéricos vindos de inputs."},

{topic:"Arrays",diff:"easy",type:"code",
text:"[Prova] Crie um array vazio chamado validacao para acumular mensagens de erro.",
answer:"let validacao = [];",
keywords:["let validacao = []"],
exp:"O array começa vazio e recebe push() de cada mensagem de erro encontrada. Se ficar vazio no fim, não há erros."},

{topic:"JS Básico",diff:"easy",type:"code",
text:"[Prova] Crie a constante mensagem com o texto 'Olá, <nome>!' interpolando a variável nome (template literal).",
answer:"const mensagem = \`Olá, \${nome}!\`;",
keywords:["const mensagem =","Olá, ","${nome}"],
exp:"Template literals (crases) permitem interpolar com ${...}. Equivale a 'Olá, ' + nome + '!', porém mais legível."},

{topic:"Arrays",diff:"easy",type:"code",
text:"[Prova] Crie um novo array dobros com o dobro de cada número de nums (use map).",
answer:"const dobros = nums.map( n => n * 2 );",
keywords:["nums.map","n => n * 2"],
exp:"map() aplica a função a cada elemento e devolve um NOVO array. nums permanece inalterado."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Defina o texto do elemento de id 'titulo' como 'Lista de Serviços' usando textContent.",
answer:"document.getElementById('titulo').textContent = 'Lista de Serviços';",
keywords:["getElementById('titulo')","textContent = 'Lista de Serviços'"],
exp:"textContent troca o texto com segurança. getElementById('titulo') seleciona o elemento pelo id."},

{topic:"Eventos",diff:"easy",type:"code",
text:"[Prova] Registre no documento um listener de 'dblclick' que chama a função remover.",
answer:"document.addEventListener('dblclick', remover);",
keywords:["addEventListener('dblclick', remover)"],
exp:"dblclick dispara no clique duplo. Registrado no document, usa-se event.target para descobrir qual <li> foi clicado (delegação)."},

{topic:"Eventos",diff:"easy",type:"code",
text:"[Prova] Peça uma confirmação ao usuário com a pergunta 'Deseja remover?' e guarde a resposta em ok.",
answer:"const ok = confirm('Deseja remover?');",
keywords:["const ok = confirm('Deseja remover?')"],
exp:"confirm() exibe um diálogo nativo e retorna true (OK) ou false (Cancelar). Usado antes de remoções destrutivas."},

{topic:"Exceções",diff:"easy",type:"code",
text:"[Prova] No catch(erro), exiba a mensagem do erro num alerta.",
answer:"alert( erro.message );",
keywords:["alert( erro.message )"],
exp:"erro.message contém o texto da exceção. alert(erro.message) mostra só a mensagem — não o objeto erro inteiro."},

{topic:"Arrays",diff:"easy",type:"code",
text:"[Prova] Remova 1 elemento do array cadastros na posição index (use splice).",
answer:"cadastros.splice( index, 1 );",
keywords:["cadastros.splice( index, 1 )"],
exp:"splice(index, 1) remove 1 item a partir de index e reindexa o array — diferente de delete, que deixa um buraco."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Alterne (adicionar/remover) a classe 'ativo' no elemento guardado em item.",
answer:"item.classList.toggle('ativo');",
keywords:["item.classList.toggle('ativo')"],
exp:"classList.toggle() adiciona a classe se ausente e remove se presente. Não apaga as outras classes do elemento."},

{topic:"Classes",diff:"easy",type:"code",
text:"[Prova] No constructor, atribua cadastro.descricao ao atributo privado #descricao.",
answer:"this.#descricao = cadastro.descricao;",
keywords:["this.#descricao = cadastro.descricao"],
exp:"Dentro do constructor, copia-se o valor recebido para o atributo privado. Acesso sempre via this.# ."},

{topic:"DOM",diff:"easy",type:"code",
text:"[Prova] Abra como modal o <dialog> da página ao registrar nada além de chamar showModal.",
answer:"document.querySelector('dialog').showModal();",
keywords:["querySelector('dialog').showModal()"],
exp:"showModal() exibe o <dialog> bloqueando o restante da página (fecha com Esc). show() abriria sem bloquear."},

// ───────────────────── MÉDIAS (combinações estilo prova) ─────────────────────

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Estilo Prova] Escreva validar(cadastro) que recebe {nome, nota} e retorna um array de mensagens: nome entre 3 e 80 caracteres; nota numérica entre 0 e 10.",
answer:`export function validar( cadastro ) {
  const nome = cadastro.nome;
  const nota = cadastro.nota;
  let validacao = [];
  if ( nome.length < 3 || nome.length > 80 ) {
    validacao.push( 'O nome deve ter entre 3 e 80 caracteres' );
  }
  if ( isNaN( Number( nota ) ) || Number( nota ) < 0 || Number( nota ) > 10 ) {
    validacao.push( 'A nota deve ser um número entre 0 e 10' );
  }
  return validacao;
}`,
keywords:["export function validar( cadastro )","cadastro.nome","cadastro.nota","validacao","nome.length < 3","validacao.push","isNaN( Number( nota ) )","return validacao"],
exp:"Mesma estrutura da validacao.js da prova: lê campos, acumula mensagens num array, retorna []. Number(nota) converte antes de comparar."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Estilo Prova] Crie a classe Livro (ESM) com privados #titulo e #preco, constructor desestruturado {titulo, preco}, e get/set para ambos.",
answer:`export class Livro {
  #titulo;
  #preco;
  constructor( { titulo, preco } ) {
    this.#titulo = titulo;
    this.#preco = preco;
  }
  get titulo() { return this.#titulo; }
  set titulo( novo ) { this.#titulo = novo; }
  get preco() { return this.#preco; }
  set preco( novo ) { this.#preco = novo; }
}`,
keywords:["export class Livro","#titulo","#preco","constructor( { titulo, preco } )","this.#titulo = titulo","this.#preco = preco","get titulo()","set titulo( novo )","get preco()","set preco( novo )"],
exp:"Espelha a classe Servico da prova: privados com #, constructor recebendo objeto desestruturado, getters e setters para cada atributo."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"Escreva duas coisas para um cadastro de livros (a classe Livro tem os atributos privados #titulo e #preco): (1) o MÉTODO paraObjeto(), que vai DENTRO da classe Livro e retorna um objeto simples { titulo, preco } a partir dos atributos privados; (2) a FUNÇÃO buscarCadastro(), que fica FORA da classe (export), lê o array da chave 'Livros' do localStorage e retorna [] se a chave não existir (valor null).",
answer:`paraObjeto() {
  return { titulo: this.#titulo, preco: this.#preco };
}

// fora da classe:
export function buscarCadastro() {
  const lista = JSON.parse( localStorage.getItem('Livros') );
  if ( lista == null ) {
    return [];
  }
  return lista;
}`,
keywords:["paraObjeto()","return { titulo: this.#titulo, preco: this.#preco }","export function buscarCadastro()","JSON.parse( localStorage.getItem('Livros') )","lista == null","return []","return lista"],
exp:"paraObjeto() converte a instância em objeto simples antes de salvar. buscarCadastro() protege contra chave inexistente (JSON.parse(null) === null)."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Estilo Prova] Escreva salvar(event) para livros: previne o padrão; lê 'titulo' e 'preco' do DOM; cria new Livro; busca a lista; faz push de paraObjeto(); salva em 'Livros'; e dá form.reset().",
answer:`function salvar( event ) {
  event.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const preco = document.getElementById('preco').value;
  const livro = new Livro( { titulo, preco } );
  const livros = buscarCadastro();
  livros.push( livro.paraObjeto() );
  localStorage.setItem( 'Livros', JSON.stringify( livros ) );
  document.querySelector('form').reset();
}`,
keywords:["function salvar( event )","event.preventDefault()","getElementById('titulo').value","getElementById('preco').value","new Livro( { titulo, preco } )","buscarCadastro()","livros.push( livro.paraObjeto() )","localStorage.setItem( 'Livros'","JSON.stringify( livros )","querySelector('form').reset()"],
exp:"Fluxo da Q3 da prova: preventDefault, ler DOM, criar instância, push de paraObjeto() (objeto simples), stringify+setItem e reset() do formulário."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Estilo Prova] Escreva listar() que busca os livros, filtra os com preco >= 50 e, para cada um, cria um <tr> com dois <td> (titulo e preco) anexados ao tbody. Use createElement e textContent.",
answer:`function listar() {
  const livros = buscarCadastro();
  const filtrados = livros.filter( l => Number( l.preco ) >= 50 );
  const tbody = document.querySelector('tbody');
  for ( const l of filtrados ) {
    const tr = document.createElement('tr');
    const tdTitulo = document.createElement('td');
    tdTitulo.textContent = l.titulo;
    const tdPreco = document.createElement('td');
    tdPreco.textContent = l.preco;
    tr.append( tdTitulo, tdPreco );
    tbody.append( tr );
  }
}`,
keywords:["function listar()","buscarCadastro()","filter","Number( l.preco ) >= 50","querySelector('tbody')","for ( const l of filtrados )","createElement('tr')","createElement('td')","textContent","tr.append( tdTitulo, tdPreco )","tbody.append( tr )"],
exp:"Igual à lista-servicos.js da prova: filter por número, for..of, createElement + textContent (sem innerHTML) e append na tabela."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Estilo Prova] Liste os carros do localStorage (chave 'carros', padrão []) num <ul> anexado ao body, usando map() para gerar '<li>modelo - R$ preco</li>' e join('').",
answer:`const carros = JSON.parse( localStorage.getItem('carros') ) || [];
const ul = document.createElement('ul');
const texto = carros.map( c => \`<li>\${c.modelo} - R$ \${c.preco}</li>\` );
ul.innerHTML = texto.join('');
document.querySelector('body').append( ul );`,
keywords:["JSON.parse( localStorage.getItem('carros') ) || []","createElement('ul')","carros.map","<li>","${c.modelo}","${c.preco}","ul.innerHTML","texto.join('')","querySelector('body').append( ul )"],
exp:"Padrão da prova atleta.js: map() cria as <li>, join('') concatena, innerHTML insere e append coloca a ul no body."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"Escreva o registro de um listener de 'dblclick' no documento e a FUNÇÃO remover(event) que apaga o <li> em que o usuário deu duplo clique. Suponha que existe, em memória, o array carros (os mesmos itens da chave 'carros' do localStorage). A função deve: pegar o <li> clicado (event.target); descobrir o índice dele entre os irmãos (Array.from(li.parentNode.children).indexOf(li)); remover esse índice de carros com splice; atualizar o localStorage ('carros'); e remover o <li> do DOM.",
answer:`document.addEventListener( 'dblclick', remover );

function remover( event ) {
  const li = event.target;
  const index = Array.from( li.parentNode.children ).indexOf( li );
  carros.splice( index, 1 );
  localStorage.setItem( 'carros', JSON.stringify( carros ) );
  li.remove();
}`,
keywords:["addEventListener( 'dblclick', remover )","event.target","Array.from( li.parentNode.children ).indexOf( li )","carros.splice( index, 1 )","localStorage.setItem( 'carros'","JSON.stringify( carros )","li.remove()"],
exp:"Cópia da lógica de remoção da prova: event.target é o li; indexOf entre os irmãos acha a posição; splice remove do array; setItem persiste; remove() tira do DOM."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Estilo Prova] No salvar(), se o array problemas tiver erros, monte uma string com cada erro em <p> e exiba no output via innerHTML; depois interrompa com return.",
answer:`if ( problemas.length > 0 ) {
  let texto = '';
  for ( const p of problemas ) {
    texto += \`<p>\${p}</p>\`;
  }
  output.innerHTML = texto;
  return;
}`,
keywords:["if ( problemas.length > 0 )","for ( const p of problemas )","texto +=","<p>","${p}","output.innerHTML = texto","return"],
exp:"Quando há erros, concatena-se cada mensagem em <p>, mostra-se no output com innerHTML e retorna-se cedo para não salvar."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"[Estilo Prova] Antes de adicionar uma conta, percorra contas e, se já houver uma com o mesmo nome, alerte 'Já cadastrado' e interrompa (return).",
answer:`for ( const c of contas ) {
  if ( c.nome === conta.nome ) {
    alert( 'Já cadastrado' );
    return;
  }
}
contas.push( conta );`,
keywords:["for ( const c of contas )","if ( c.nome === conta.nome )","alert( 'Já cadastrado' )","return","contas.push( conta )"],
exp:"O for..of verifica duplicidade por nome; return interrompe antes do push, evitando cadastros repetidos. Alternativa: contas.some(...)."},

{topic:"JS Básico",diff:"medium",type:"code",
text:"[Estilo Prova] Crie mediaDasNotas(notas) que recebe um array de números e retorna a média, usando obrigatoriamente for..of.",
answer:`function mediaDasNotas( notas ) {
  let soma = 0;
  for ( const nota of notas ) {
    soma += nota;
  }
  return soma / notas.length;
}`,
keywords:["function mediaDasNotas( notas )","let soma = 0","for ( const nota of notas )","soma += nota","return soma / notas.length"],
exp:"Variação da mediaDosNomes da prova: acumula com for..of e divide pelo total. A prova exigia for..of — map/reduce não pontuaria."},

{topic:"Async/Await",diff:"medium",type:"code",
text:"Escreva a FUNÇÃO async listarFilmes(). Suponha que existem: consultarFilmes() — retorna uma Promise com o array de filmes; e desenharFilmes(filmes) — exibe os filmes na tela. A função deve, num try, fazer 'const filmes = await consultarFilmes()' e chamar desenharFilmes(filmes); no catch, fazer alert(erro.message).",
answer:`async function listarFilmes() {
  try {
    const filmes = await consultarFilmes();
    desenharFilmes( filmes );
  } catch ( erro ) {
    alert( erro.message );
  }
}`,
keywords:["async function listarFilmes()","try","await consultarFilmes()","desenharFilmes( filmes )","catch ( erro )","alert( erro.message )"],
exp:"await pausa até a consulta resolver. O try/catch trata erros de rede/HTTP relançados, exibindo a mensagem com alert."},

{topic:"Estilo Prova",diff:"medium",type:"code",
text:"Considere a classe Livro, com os atributos privados #titulo e #preco. Escreva, DENTRO dela, o MÉTODO público problemas() — sem parâmetros, que NÃO lança exceção: monta e RETORNA um array de mensagens de erro (vazio se tudo certo). Adicione uma mensagem quando: #titulo tiver menos de 2 ou mais de 50 caracteres; #preco não for número (isNaN(Number(...))) ou for menor que 10 ou maior que 1000.",
answer:`problemas() {
  let problema = [];
  if ( this.#titulo.length < 2 ) {
    problema.push( \`O titulo: \${this.#titulo} tem menos que 2 caracteres;\` );
  } else if ( this.#titulo.length > 50 ) {
    problema.push( \`O titulo: \${this.#titulo} tem mais que 50 caracteres;\` );
  }
  if ( isNaN( Number( this.#preco ) ) ) {
    problema.push( \`Preco: \${this.#preco} precisa ser um numero\` );
  } else if ( this.#preco < 10 ) {
    problema.push( \`Preco: \${this.#preco} precisa ser maior que 10\` );
  } else if ( this.#preco > 1000 ) {
    problema.push( \`Preco: \${this.#preco} precisa ser menor que 1000\` );
  }
  return problema;
}`,
keywords:["problemas()","let problema = []","this.#titulo.length < 2","problema.push","isNaN( Number( this.#preco ) )","this.#preco < 10","this.#preco > 1000","return problema"],
exp:"Igual ao problemas() da classe Servico: valida tamanho do texto e faixa numérica, acumulando mensagens. isNaN(Number()) checa se é número."},

{topic:"Promise/Fetch",diff:"medium",type:"code",
text:"[Estilo Prova] Escreva consultarFilmes() que faz fetch GET em 'http://localhost:3000/filmes', lança Error se !response.ok e retorna a Promise com o JSON. Use .then.",
answer:`export function consultarFilmes() {
  return fetch( 'http://localhost:3000/filmes' )
    .then( response => {
      if ( !response.ok ) {
        throw new Error( 'Erro ao consultar os filmes.' );
      }
      return response.json();
    } );
}`,
keywords:["export function consultarFilmes()","return fetch( 'http://localhost:3000/filmes' )","then( response =>","if ( !response.ok )","throw new Error","return response.json()"],
exp:"Retornar fetch().then() devolve uma Promise encadeada. fetch só rejeita por erro de rede; 404/500 exigem checar response.ok."},

{topic:"Async/Await",diff:"medium",type:"code",
text:"[Estilo Prova] Escreva async salvar(event): previne o padrão, valida o form com reportValidity (return se inválido) e monta o objeto filme {titulo, nota:Number(...)}.",
answer:`async function salvar( event ) {
  event.preventDefault();
  const form = document.querySelector('form');
  if ( !form.reportValidity() ) {
    return;
  }
  const filme = {
    titulo: document.getElementById('titulo').value,
    nota: Number( document.getElementById('nota').value )
  };
}`,
keywords:["async function salvar( event )","event.preventDefault()","querySelector('form')","if ( !form.reportValidity() )","return","const filme = {","getElementById('titulo').value","nota: Number(","getElementById('nota').value"],
exp:"reportValidity() roda a validação nativa do HTML5 e aborta se inválido. Number() converte a nota, pois input.value é string."},

{topic:"Eventos",diff:"medium",type:"code",
text:"[Estilo Prova] Use delegação: registre um clique na <ul id='lista'> que imprime o texto do <li> clicado (cheque event.target).",
answer:`document.getElementById('lista').addEventListener('click', event => {
  if ( event.target.tagName === 'LI' ) {
    console.log( event.target.textContent );
  }
});`,
keywords:["getElementById('lista')","addEventListener('click'","event.target","tagName === 'LI'","textContent"],
exp:"Um listener no pai atende todos os filhos (inclusive dinâmicos). event.target é o elemento clicado; checa-se tagName para reagir só aos <li>."},

{topic:"Async/Await",diff:"medium",type:"code",
text:"[Estilo Prova] Reescreva usando async/await: consultar().then(d => desenhar(d)).catch(e => alert(e.message))",
answer:`try {
  const d = await consultar();
  desenhar( d );
} catch ( e ) {
  alert( e.message );
}`,
keywords:["try","await consultar()","desenhar( d )","catch ( e )","alert( e.message )"],
exp:"async/await transforma a cadeia .then em código sequencial; o .catch vira o bloco catch. Mais legível para fluxos encadeados."},

{topic:"Arrays",diff:"medium",type:"code",
text:"[Estilo Prova] A partir de produtos (array de {nome, estoque}), gere as strings 'nome: estoque un' apenas dos que têm estoque > 0 (filter + map).",
answer:`const linhas = produtos
  .filter( p => p.estoque > 0 )
  .map( p => \`\${p.nome}: \${p.estoque} un\` );`,
keywords:["produtos","filter( p => p.estoque > 0 )","map( p =>","${p.nome}","${p.estoque}"],
exp:"filter seleciona os com estoque; map formata cada um numa string. Encadear filter().map() é o padrão de listagem da disciplina."},

{topic:"HTML/CSS",diff:"medium",type:"code",
text:"[Estilo Prova] Escreva o HTML de um formulário com input de texto id 'titulo', input number id 'nota' (0 a 10), um <button> Salvar e um <output>.",
answer:`<form>
  <input type="text" id="titulo" required>
  <input type="number" id="nota" min="0" max="10" required>
  <button type="button">Salvar</button>
  <output></output>
</form>`,
keywords:['<form>','<input','id="titulo"','type="number"','id="nota"','min="0"','max="10"','<button','<output>'],
exp:"min/max delimitam o número; required ativa a validação nativa; button type='button' evita submit (o salvar é via addEventListener)."},

{topic:"Storage",diff:"medium",type:"code",
text:"[Estilo Prova] Escreva atualizarLista(item) que lê 'itens' (padrão []), faz push do item, regrava no localStorage e retorna a lista atualizada.",
answer:`function atualizarLista( item ) {
  const itens = JSON.parse( localStorage.getItem('itens') ) || [];
  itens.push( item );
  localStorage.setItem( 'itens', JSON.stringify( itens ) );
  return itens;
}`,
keywords:["function atualizarLista( item )","JSON.parse( localStorage.getItem('itens') ) || []","itens.push( item )","localStorage.setItem( 'itens'","JSON.stringify( itens )","return itens"],
exp:"Ciclo ler-modificar-gravar: parse com fallback [], push e stringify. O storage só guarda strings, daí o stringify/parse."},

// ───────────────────── DIFÍCEIS (questões completas estilo prova) ─────────────────────

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Estilo Prova completa] Crie a classe Aluno (ESM) com privados #nome e #nota; constructor desestruturado {nome, nota}; getters; e problemas() que retorna mensagens: nome 2-100 chars; nota número entre 0 e 10.",
answer:`export class Aluno {
  #nome;
  #nota;
  constructor( { nome, nota } ) {
    this.#nome = nome;
    this.#nota = nota;
  }
  get nome() { return this.#nome; }
  get nota() { return this.#nota; }
  paraObjeto() {
    return { nome: this.#nome, nota: this.#nota };
  }
  problemas() {
    let problema = [];
    if ( this.#nome.length < 2 || this.#nome.length > 100 ) {
      problema.push( 'O nome deve ter entre 2 e 100 caracteres' );
    }
    if ( isNaN( Number( this.#nota ) ) || Number( this.#nota ) < 0 || Number( this.#nota ) > 10 ) {
      problema.push( 'A nota deve ser um número entre 0 e 10' );
    }
    return problema;
  }
}`,
keywords:["export class Aluno","#nome","#nota","constructor( { nome, nota } )","this.#nome = nome","this.#nota = nota","get nome()","get nota()","paraObjeto()","problemas()","this.#nome.length < 2","isNaN( Number( this.#nota ) )","return problema"],
exp:"Classe completa no molde da prova: privados, constructor desestruturado, getters, paraObjeto() e problemas() retornando array de erros."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Estilo Prova completa] Escreva salvar(event) para Aluno: previne o padrão; lê 'nome' e 'nota'; cria new Aluno; se problemas() houver, mostra-os em <p> no output e retorna; senão busca a lista, push de paraObjeto(), salva em 'alunos' e exibe 'Salvo' + form.reset().",
answer:`function salvar( event ) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const nota = document.getElementById('nota').value;
  const aluno = new Aluno( { nome, nota } );
  const output = document.querySelector('output');
  const problemas = aluno.problemas();
  if ( problemas.length > 0 ) {
    let texto = '';
    for ( const p of problemas ) {
      texto += \`<p>\${p}</p>\`;
    }
    output.innerHTML = texto;
    return;
  }
  const alunos = JSON.parse( localStorage.getItem('alunos') ) || [];
  alunos.push( aluno.paraObjeto() );
  localStorage.setItem( 'alunos', JSON.stringify( alunos ) );
  output.innerText = 'Salvo';
  document.querySelector('form').reset();
}`,
keywords:["function salvar( event )","event.preventDefault()","getElementById('nome').value","getElementById('nota').value","new Aluno( { nome, nota } )","aluno.problemas()","problemas.length > 0","<p>","${p}","output.innerHTML = texto","return","JSON.parse( localStorage.getItem('alunos') ) || []","alunos.push( aluno.paraObjeto() )","localStorage.setItem( 'alunos'","JSON.stringify( alunos )","output.innerText = 'Salvo'","querySelector('form').reset()"],
exp:"Fluxo completo da Q3 da prova: validar primeiro (mostrar erros e return), depois salvar paraObjeto() (objeto simples), persistir e limpar o form."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Estilo Prova completa] Escreva listar() para alunos: busca a lista (padrão []), filtra nota >= 6, e para cada aluno cria um <tr> com <td> de nome e nota (textContent) anexado ao tbody, que é limpo antes com replaceChildren().",
answer:`function listar() {
  const alunos = JSON.parse( localStorage.getItem('alunos') ) || [];
  const aprovados = alunos.filter( a => Number( a.nota ) >= 6 );
  const tbody = document.querySelector('tbody');
  tbody.replaceChildren();
  for ( const a of aprovados ) {
    const tr = document.createElement('tr');
    const tdNome = document.createElement('td');
    tdNome.textContent = a.nome;
    const tdNota = document.createElement('td');
    tdNota.textContent = a.nota;
    tr.append( tdNome, tdNota );
    tbody.append( tr );
  }
}`,
keywords:["function listar()","JSON.parse( localStorage.getItem('alunos') ) || []","filter( a => Number( a.nota ) >= 6 )","querySelector('tbody')","tbody.replaceChildren()","for ( const a of aprovados )","createElement('tr')","createElement('td')","textContent","tr.append( tdNome, tdNota )","tbody.append( tr )"],
exp:"replaceChildren() limpa o tbody antes de redesenhar (evita duplicar linhas). filter + createElement + textContent + append montam a tabela com segurança."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Estilo Prova completa] Escreva listar() que, além das linhas, calcula no <tfoot> a menor e a maior nota dos alunos, preenchendo com innerHTML uma <tr> de dois <td> (Mín. e Máx.).",
answer:`function listar() {
  const alunos = JSON.parse( localStorage.getItem('alunos') ) || [];
  let min = Infinity;
  let max = -Infinity;
  for ( const a of alunos ) {
    const nota = Number( a.nota );
    if ( nota < min ) { min = nota; }
    if ( nota > max ) { max = nota; }
  }
  const tfoot = document.querySelector('tfoot');
  tfoot.innerHTML = \`
    <tr>
      <td>Mín.: \${min}</td>
      <td>Máx.: \${max}</td>
    </tr>
  \`;
}`,
keywords:["function listar()","JSON.parse( localStorage.getItem('alunos') ) || []","let min = Infinity","let max = -Infinity","for ( const a of alunos )","Number( a.nota )","if ( nota < min )","if ( nota > max )","querySelector('tfoot')","tfoot.innerHTML","Mín.:","${min}","Máx.:","${max}"],
exp:"Acumula min/max num for..of com Number() e preenche o tfoot com innerHTML — igual à lista-servicos.js da prova 2025-2."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Estilo Prova completa] Crie a classe Erro de validação ValidacaoErro (extends Error, redefine this.name) e use-a: na classe Carro, um método #validar() lança ValidacaoErro se #preco não for número (isNaN) ou for menor que 0.",
answer:`export class ValidacaoErro extends Error {
  constructor( message ) {
    super( message );
    this.name = 'ValidacaoErro';
  }
}

class Carro {
  #preco;
  #validar() {
    if ( isNaN( Number( this.#preco ) ) || Number( this.#preco ) < 0 ) {
      throw new ValidacaoErro( 'Preço deve ser número não negativo' );
    }
  }
}`,
keywords:["export class ValidacaoErro extends Error","constructor( message )","super( message )","this.name = 'ValidacaoErro'","#preco","#validar()","isNaN( Number( this.#preco ) )","throw new ValidacaoErro"],
exp:"Exceção customizada herda de Error, com super(message) e this.name. O método privado #validar() lança a exceção quando os dados são inválidos."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Estilo Prova completa] Escreva async remover(event) para uma linha de tabela: pega o <td> de ações (event.target.parentElement) e seu dataset.id; pede confirm(); se ok, dentro de try faz await removerComId(id) e remove o <tr> (parentElement.remove()); no catch faz alert.",
answer:`async function remover( event ) {
  const tdAcoes = event.target.parentElement;
  const id = tdAcoes.dataset.id;
  if ( !confirm( 'Deseja mesmo remover?' ) ) {
    return;
  }
  try {
    await removerComId( id );
    tdAcoes.parentElement.remove();
  } catch ( erro ) {
    alert( erro.message );
  }
}`,
keywords:["async function remover( event )","event.target.parentElement","tdAcoes.dataset.id","if ( !confirm(","return","try","await removerComId( id )","tdAcoes.parentElement.remove()","catch ( erro )","alert( erro.message )"],
exp:"event.target é o botão; parentElement é o <td data-id>. Após remover na API (await), o <tr> é tirado do DOM — mantendo dados e tela sincronizados."},

{topic:"MVC/MVP",diff:"hard",type:"code",
text:"[Estilo Prova — Serviço] Crie a classe ServicoFilmes (ESM) com async obterFilmes() (GET /filmes, lança Error se !response.ok, retorna JSON) e async removerFilme(id) (DELETE /filmes/{id}, 404 = 'Filme não encontrado', outros erros = 'Erro ao remover').",
answer:`const API = 'http://localhost:3000';

export class ServicoFilmes {
  async obterFilmes() {
    const response = await fetch( \`\${API}/filmes\` );
    if ( !response.ok ) {
      throw new Error( 'Erro ao obter os filmes.' );
    }
    return response.json();
  }

  async removerFilme( id ) {
    const response = await fetch( \`\${API}/filmes/\${id}\`, { method: 'DELETE' } );
    if ( response.status === 404 ) {
      throw new Error( 'Filme não encontrado' );
    }
    if ( !response.ok ) {
      throw new Error( 'Erro ao remover' );
    }
  }
}`,
keywords:["export class ServicoFilmes","async obterFilmes()","await fetch","${API}/filmes","!response.ok","throw new Error","return response.json()","async removerFilme( id )","method: 'DELETE'","response.status === 404","Filme não encontrado"],
exp:"O Serviço isola o acesso à API. fetch não rejeita em 404/500 — checa-se response.ok/status. DELETE recebe o id na URL via template literal."},

{topic:"MVC/MVP",diff:"hard",type:"code",
text:"[Estilo Prova — Apresentador] Crie a ControladoraFilmes: importa ServicoFilmes; constructor recebe a visao e cria o servico; async listar() que obtém os filmes e chama visao.desenhar, tratando erro com visao.mostrarErro.",
answer:`import { ServicoFilmes } from './servico-filmes.js';

export class ControladoraFilmes {
  constructor( visao ) {
    this.servico = new ServicoFilmes();
    this.visao = visao;
  }

  async listar() {
    try {
      const filmes = await this.servico.obterFilmes();
      this.visao.desenhar( filmes );
    } catch ( erro ) {
      this.visao.mostrarErro( erro );
    }
  }
}`,
keywords:["import { ServicoFilmes } from './servico-filmes.js'","export class ControladoraFilmes","constructor( visao )","this.servico = new ServicoFilmes()","this.visao = visao","async listar()","try","await this.servico.obterFilmes()","this.visao.desenhar( filmes )","catch ( erro )","this.visao.mostrarErro( erro )"],
exp:"O Apresentador pede dados ao Serviço e manda a Visão desenhar. O try/catch encaminha sucesso (desenhar) ou erro (mostrarErro) à Visão, sem o Serviço tocar no DOM."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Estilo Prova completa] Crie 'cadastro.js' completo (importa validar): no DOMContentLoaded registra o clique do botão em salvar; salvar(event) lê nome/peso/altura, monta cadastro, chama validar; se houver erros mostra <p> no output, senão faz push no array 'cadastro' e form.reset().",
answer:`import { validar } from './validacao.js';

document.addEventListener( 'DOMContentLoaded', () => {
  document.querySelector('button').addEventListener('click', salvar);
} );

function salvar( event ) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const peso = document.getElementById('peso').value;
  const altura = document.getElementById('altura').value;
  const cadastro = { nome, peso, altura };
  const validacao = validar( cadastro );
  const output = document.querySelector('output');
  if ( validacao.length > 0 ) {
    let texto = '';
    for ( const v of validacao ) {
      texto += \`<p>\${v}</p>\`;
    }
    output.innerHTML = texto;
  } else {
    const cadastros = JSON.parse( localStorage.getItem('cadastro') ) || [];
    cadastros.push( cadastro );
    localStorage.setItem( 'cadastro', JSON.stringify( cadastros ) );
    document.querySelector('form').reset();
  }
}`,
keywords:["import { validar } from './validacao.js'","addEventListener( 'DOMContentLoaded'","querySelector('button').addEventListener('click', salvar)","function salvar( event )","event.preventDefault()","const cadastro = { nome, peso, altura }","validar( cadastro )","if ( validacao.length > 0 )","<p>","${v}","output.innerHTML = texto","JSON.parse( localStorage.getItem('cadastro') ) || []","cadastros.push( cadastro )","localStorage.setItem( 'cadastro'","querySelector('form').reset()"],
exp:"Reprodução fiel do cadastro.js da prova 2024-2: DOMContentLoaded, leitura do DOM, validar() externo, erros em <p> via innerHTML ou push+setItem+reset."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Estilo Prova completa] Escreva o desenho da tabela de cadastros num <tbody> via innerHTML acumulando <tr> com template literal, e no <tfoot> a média dos pesos e a maior altura (use for..of).",
answer:`const cadastros = JSON.parse( localStorage.getItem('cadastro') ) || [];
let texto = '';
let media = 0;
let maior = -Infinity;
for ( const c of cadastros ) {
  if ( Number( c.altura ) > maior ) {
    maior = Number( c.altura );
  }
  media += Number( c.peso );
  texto += \`<tr><td>\${c.nome}</td><td>\${c.peso}</td><td>\${c.altura}</td></tr>\`;
}
document.querySelector('tbody').innerHTML = texto;
document.querySelector('tfoot').textContent = \`Média de pesos: \${media / cadastros.length} | Maior altura: \${maior}\`;`,
keywords:["JSON.parse( localStorage.getItem('cadastro') ) || []","let texto = ''","let media = 0","let maior = -Infinity","for ( const c of cadastros )","Number( c.altura ) > maior","media += Number( c.peso )","<tr>","${c.nome}","querySelector('tbody').innerHTML = texto","Média de pesos:","${maior}"],
exp:"Espelha o altos.js da prova: acumula linhas em texto, calcula média e maior no mesmo for..of, e injeta no tbody/tfoot — Number() converte as strings."},

{topic:"Estilo Prova",diff:"hard",type:"code",
text:"[Estilo Prova completa] Escreva async cadastrarFilme(filme) que faz POST para 'http://localhost:3000/filmes' com header Content-Type application/json, corpo em JSON; lança Error se !response.ok; retorna o filme criado.",
answer:`async function cadastrarFilme( filme ) {
  const response = await fetch( 'http://localhost:3000/filmes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( filme )
  } );
  if ( !response.ok ) {
    throw new Error( 'Erro ao cadastrar o filme' );
  }
  return response.json();
}`,
keywords:["async function cadastrarFilme( filme )","await fetch( 'http://localhost:3000/filmes'","method: 'POST'","'Content-Type': 'application/json'","body: JSON.stringify( filme )","!response.ok","throw new Error","return response.json()"],
exp:"POST cria o recurso. O header Content-Type avisa que o corpo é JSON (JSON.stringify). O json-server devolve o filme criado já com id — por isso o return response.json()."},

// ══════════════════════════════════════════════════════════
// MÚLTIPLA ESCOLHA PRÁTICA — saída de código e uso das funções
// (espelha as questões de código já criadas no estilo da prova)
// ══════════════════════════════════════════════════════════

// ───────────────────── FÁCEIS ─────────────────────

{topic:"Estilo Prova",diff:"easy",type:"mc",
text:"Após ler um campo de formulário com .value, qual é o tipo do valor obtido?",
code:`const v = document.getElementById('preco').value;`,
options:['"number"','"string"','"object"','Depende do type do input'],
answer:1,
exp:"input.value SEMPRE retorna string, mesmo em <input type=\"number\">. Por isso usa-se Number(v) antes de comparar ou calcular."},

{topic:"Arrays",diff:"easy",type:"mc",
text:"Qual é o resultado da expressão abaixo?",
code:`[10, 50, 100, 200].filter( n => n >= 100 )`,
options:["[100, 200]","[10, 50]","[100]","[10, 50, 100, 200]"],
answer:0,
exp:"filter mantém apenas os elementos que passam no teste (>= 100): 100 e 200. Devolve um novo array sem alterar o original."},

{topic:"Storage",diff:"easy",type:"mc",
text:"O que retorna localStorage.getItem('x') se a chave 'x' nunca foi salva?",
options:["undefined","null","'' (string vazia)","[]"],
answer:1,
exp:"getItem devolve null para chave inexistente. Por isso o padrão JSON.parse(getItem(...) || '[]') garante um array de fallback."},

{topic:"Estilo Prova",diff:"easy",type:"mc",
text:"No fluxo de cadastro da prova, para que serve cadastros.push(cadastro)?",
options:["Salva direto no localStorage","Adiciona o objeto ao fim do array que está em memória","Valida o cadastro","Remove duplicatas"],
answer:1,
exp:"push() só adiciona ao array em memória. Persistir exige depois localStorage.setItem('chave', JSON.stringify(cadastros))."},

{topic:"Classes",diff:"easy",type:"mc",
text:"Qual declaração cria um atributo PRIVADO dentro de uma classe?",
options:["private valor;","_valor;","#valor;","var valor;"],
answer:2,
exp:"O prefixo # define atributos privados (reais). _valor é apenas convenção, não privacidade. private não existe em JS."},

{topic:"DOM",diff:"easy",type:"mc",
text:"Para inserir texto numa célula <td> com segurança (sem interpretar HTML), usa-se:",
options:["td.innerHTML = texto","td.textContent = texto","td.value = texto","td.append(htmlString)"],
answer:1,
exp:"textContent insere texto puro, sem risco de XSS. innerHTML interpretaria tags. Era o usado na listagem da prova."},

{topic:"JSON",diff:"easy",type:"mc",
text:"Por que chamar JSON.stringify(lista) antes de localStorage.setItem?",
options:["Para ordenar a lista","Porque o localStorage só armazena strings","Para remover duplicatas","Para validar a lista"],
answer:1,
exp:"O storage guarda apenas strings. stringify serializa o array/objeto. Ao ler, JSON.parse desfaz a conversão."},

{topic:"Eventos",diff:"easy",type:"mc",
text:"O que faz event.preventDefault() como primeira linha de salvar(event)?",
options:["Remove o listener","Impede o envio (submit) padrão do formulário","Para a propagação do evento aos pais","Limpa o formulário"],
answer:1,
exp:"preventDefault() cancela o comportamento padrão (recarregar a página ao enviar o form), permitindo tratar o salvamento por JavaScript."},

{topic:"Arrays",diff:"easy",type:"mc",
text:"Para gerar um NOVO array com os títulos de uma lista de livros, qual método usar?",
options:["forEach","map","filter","find"],
answer:1,
exp:"map transforma cada elemento e devolve um novo array. forEach apenas executa, sem retornar array. filter seleciona; find devolve um único elemento."},

{topic:"Tipos",diff:"easy",type:"mc",
text:"Qual é o resultado de isNaN(Number('abc'))?",
options:["true","false","NaN","Lança erro"],
answer:0,
exp:"Number('abc') é NaN (não numérico); isNaN(NaN) é true. Padrão de validação numérica da prova: isNaN(Number(valor))."},

{topic:"DOM",diff:"easy",type:"mc",
text:"Qual instrução cria um elemento <tr> em memória?",
options:["document.querySelector('tr')","document.createElement('tr')","new Element('tr')","document.append('tr')"],
answer:1,
exp:"createElement('tr') cria o nó. Ele só aparece na tela após ser anexado (append) ao tbody. querySelector BUSCA um já existente."},

{topic:"Storage",diff:"easy",type:"mc",
text:"Qual é o objetivo do || '[]' na expressão abaixo?",
code:`JSON.parse( localStorage.getItem('itens') || '[]' )`,
options:["Ordenar os itens","Garantir um array vazio quando a chave não existe","Converter para número","Remover a chave"],
answer:1,
exp:"getItem devolve null se a chave não existe; o || '[]' fornece uma string JSON válida, e JSON.parse('[]') vira [] — evitando erro ao iterar."},

{topic:"HTML/CSS",diff:"easy",type:"mc",
text:"Qual atributo torna o preenchimento de um campo obrigatório para enviar o formulário?",
options:["mandatory","required","min","needed"],
answer:1,
exp:"required impede o envio com o campo vazio e ativa a validação nativa do navegador (mostrada por reportValidity())."},

{topic:"Eventos",diff:"easy",type:"mc",
text:"O que faz form.reset()?",
options:["Recarrega a página","Limpa (restaura) os campos do formulário","Envia o formulário","Remove o formulário do DOM"],
answer:1,
exp:"reset() devolve os campos aos valores iniciais (vazios). Costuma vir no fim de salvar(), após o cadastro dar certo."},

{topic:"Arrays",diff:"easy",type:"mc",
text:"Qual é o resultado de [1, 2, 3].filter(n => n > 9)?",
options:["undefined","null","[]","false"],
answer:2,
exp:"filter devolve sempre um array — vazio [] quando nenhum elemento passa no teste. Nunca null nem undefined."},

{topic:"Async/Await",diff:"easy",type:"mc",
text:"Em const r = await fetch('/jogos'), o que r representa?",
options:["O JSON já convertido","O objeto Response (a resposta HTTP)","Uma string","O array de jogos"],
answer:1,
exp:"fetch resolve com um objeto Response. Para obter os dados é preciso ainda chamar await r.json()."},

{topic:"REST/HTTP",diff:"easy",type:"mc",
text:"Como indicar que uma chamada fetch deve REMOVER um recurso?",
options:["{ method: 'REMOVE' }","{ method: 'DELETE' }","{ delete: true }","fetch.delete()"],
answer:1,
exp:"O método HTTP de remoção é DELETE, passado nas opções: fetch(url, { method: 'DELETE' })."},

{topic:"DOM",diff:"easy",type:"mc",
text:"O que faz dialog.showModal()?",
options:["Abre o dialog sem bloquear o fundo","Abre o dialog como modal, bloqueando o restante da página","Fecha o dialog","Cria um novo dialog"],
answer:1,
exp:"showModal() abre o <dialog> como modal (overlay, fecha com Esc). show() abriria sem bloquear; close() fecha."},

// ───────────────────── MÉDIAS ─────────────────────

{topic:"Arrays",diff:"medium",type:"mc",
text:"Qual é a saída do código?",
code:`console.log( ['a', 'bb', 'ccc'].map( s => s.length ) );`,
options:["[1, 2, 3]","['a', 'bb', 'ccc']","6","[3]"],
answer:0,
exp:"map devolve um novo array com o length de cada string: 'a'→1, 'bb'→2, 'ccc'→3."},

{topic:"Estilo Prova",diff:"medium",type:"mc",
text:"Na classe Servico da prova, o que problemas() retorna quando os dados são VÁLIDOS?",
options:["true","null","[] (array vazio)","undefined"],
answer:2,
exp:"problemas() acumula mensagens num array. Sem erros, devolve []. Quem chama testa problemas.length > 0 para decidir."},

{topic:"Estilo Prova",diff:"medium",type:"mc",
text:"Por que salvar paraObjeto() no localStorage em vez da própria instância da classe?",
options:["É mais rápido","A instância perde métodos e atributos privados ao serializar; salva-se um objeto simples","Por segurança","O localStorage não aceita arrays"],
answer:1,
exp:"JSON.stringify de uma instância grava só os dados e perde o prototype/métodos. paraObjeto() devolve um objeto simples já pronto para persistir."},

{topic:"Operadores",diff:"medium",type:"mc",
text:"O que a instrução abaixo faz?",
code:`const { nome, valor } = cadastro;`,
options:["Cria um novo objeto","Extrai as propriedades nome e valor do objeto cadastro (desestruturação)","Compara nome e valor","Renomeia cadastro"],
answer:1,
exp:"Desestruturação de objeto: cria as constantes nome e valor com os valores das propriedades correspondentes de cadastro."},

{topic:"JS Básico",diff:"medium",type:"mc",
text:"O que é impresso pelo laço?",
code:`for ( const x of ['a', 'b'] ) {
  console.log( x );
}`,
options:["0 e 1","'a' e 'b'","['a', 'b']","undefined"],
answer:1,
exp:"for..of percorre os VALORES do array ('a', 'b'). Quem percorreria os índices (0, 1) seria for..in."},

{topic:"Arrays",diff:"medium",type:"mc",
text:"Qual é o resultado de [1, 2, 3, 4].reduce((acc, n) => acc + n, 0)?",
options:["10","[1, 2, 3, 4]","24","0"],
answer:0,
exp:"reduce acumula: 0+1+2+3+4 = 10. O segundo argumento (0) é o valor inicial do acumulador."},

{topic:"Promise/Fetch",diff:"medium",type:"mc",
text:"O que response.json() retorna?",
options:["O objeto JavaScript já pronto","Uma Promise que resolve com o objeto convertido","Uma string JSON","Um array sempre"],
answer:1,
exp:"response.json() devolve uma Promise — precisa de await ou .then(). Não é síncrono como JSON.parse()."},

{topic:"Estilo Prova",diff:"medium",type:"mc",
text:"Por que escrever Number(c.valor) no filtro abaixo, em vez de usar c.valor direto?",
code:`cadastros.filter( c => Number( c.valor ) >= 100 )`,
options:["Para arredondar","Porque c.valor é string (veio do input) e a comparação numérica exige conversão","Para remover casas decimais","Não faz diferença"],
answer:1,
exp:"Valores vindos de input.value são strings. Comparar string com número pode dar resultado errado; Number() converte antes de comparar."},

{topic:"DOM",diff:"medium",type:"mc",
text:"O que faz tbody.replaceChildren() chamado sem argumentos?",
options:["Adiciona uma linha vazia","Remove todos os filhos do tbody","Clona o tbody","Substitui o tbody por outro"],
answer:1,
exp:"replaceChildren() sem argumentos esvazia o elemento. Muito usado para limpar a tabela antes de redesenhar a listagem."},

{topic:"Async/Await",diff:"medium",type:"mc",
text:"O que é impresso?",
code:`async function f() { return 5; }
f().then( v => console.log( v ) );`,
options:["5","Promise","undefined","Error"],
answer:0,
exp:"Uma função async sempre retorna uma Promise; return 5 equivale a Promise.resolve(5). O .then recebe o valor resolvido (5)."},

{topic:"Storage",diff:"medium",type:"mc",
text:"O que fica realmente salvo na chave 'x'?",
code:`localStorage.setItem('x', { a: 1 });`,
options:["{ a: 1 }","'[object Object]'","'{\"a\":1}'","null"],
answer:1,
exp:"setItem converte o valor para string com toString(); um objeto vira '[object Object]'. Para salvar de verdade, use JSON.stringify({a:1})."},

{topic:"Arrays",diff:"medium",type:"mc",
text:"Qual é a saída do encadeamento?",
code:`[1, 2, 3, 4].filter( n => n % 2 === 0 ).map( n => n * 10 )`,
options:["[20, 40]","[2, 4]","[10, 20, 30, 40]","[20]"],
answer:0,
exp:"filter pega os pares [2,4]; map multiplica por 10 → [20,40]. Encadear filter().map() é o padrão da listagem da prova."},

{topic:"Estilo Prova",diff:"medium",type:"mc",
text:"Depois de chamar validar(), como salvar() decide que HÁ erros?",
options:["if ( validacao === true )","if ( validacao.length > 0 )","if ( validacao )","if ( validacao.erro )"],
answer:1,
exp:"validar() devolve um array de mensagens. length > 0 indica que há erros — então exibe-se as mensagens e retorna-se cedo (return)."},

{topic:"Eventos",diff:"medium",type:"mc",
text:"Ao dar duplo clique num <li> da lista, o que é impresso?",
code:`document.addEventListener('dblclick', e => console.log( e.target.tagName ));`,
options:["'li'","'LI'","'UL'","undefined"],
answer:1,
exp:"e.target é o elemento clicado (o <li>); tagName devolve o nome da tag em MAIÚSCULAS: 'LI'."},

{topic:"JS Básico",diff:"medium",type:"mc",
text:"Depois do splice, qual é o conteúdo de a?",
code:`const a = [10, 20, 30];
a.splice( 1, 1 );`,
options:["[10, 30]","[20, 30]","[10, 20]","[10, 20, 30]"],
answer:0,
exp:"splice(1, 1) remove 1 elemento a partir do índice 1 (o 20) e reindexa o array: [10, 30]. É o usado na remoção da prova."},

{topic:"Promise/Fetch",diff:"medium",type:"mc",
text:"Um fetch recebeu uma resposta com status 404. Qual o valor de response.ok?",
options:["true","false","undefined","Lança erro automaticamente"],
answer:1,
exp:"fetch NÃO rejeita em 404/500 — a Promise resolve com response.ok = false. Por isso checa-se if(!response.ok) throw new Error(...)."},

// ───────────────────── DIFÍCEIS ─────────────────────

{topic:"Estilo Prova",diff:"hard",type:"mc",
text:"Qual é a saída do console?",
code:`const cadastros = [ {valor:'80'}, {valor:'150'}, {valor:'200'} ];
const r = cadastros
  .filter( c => Number(c.valor) >= 100 )
  .map( c => Number(c.valor) );
console.log( r );`,
options:["[150, 200]","['150', '200']","[80, 150, 200]","[200]"],
answer:0,
exp:"filter mantém os com valor numérico >= 100 ('150','200'); map converte cada um com Number → [150, 200]."},

{topic:"Classes",diff:"hard",type:"mc",
text:"O que ocorre ao executar este código?",
code:`class C {
  #x = 1;
  get x() { return this.#x; }
}
const c = new C();
console.log( c.x );
c.#x = 9;`,
options:["Imprime 1 e altera para 9","Imprime 1 e depois dá erro: #x é privado, inacessível fora da classe","Erro nas duas linhas","Imprime undefined"],
answer:1,
exp:"c.x usa o getter e imprime 1. c.#x fora da classe lança SyntaxError — atributos # são estritamente privados."},

{topic:"Operadores",diff:"hard",type:"mc",
text:"Quais os valores de a e resto?",
code:`const [ a, ...resto ] = [1, 2, 3, 4];`,
options:["a = 1, resto = [2, 3, 4]","a = 1, resto = 2","a = [1], resto = [2, 3, 4]","a = 1, resto = {2, 3, 4}"],
answer:0,
exp:"Desestruturação com rest: a recebe o 1º elemento; ...resto coleta o restante num array [2, 3, 4]."},

{topic:"Async/Await",diff:"hard",type:"mc",
text:"Qual alternativa executa op1() e op2() em PARALELO?",
options:[
  "const a = await op1(); const b = await op2();",
  "const [ a, b ] = await Promise.all( [op1(), op2()] );",
  "async [a, b] = [ op1(), op2() ];",
  "await op1(); await op2();"
],
answer:1,
exp:"Dois await em sequência rodam uma de cada vez. Promise.all inicia ambas e aguarda as duas — tempo total = max(op1, op2)."},

{topic:"Storage",diff:"hard",type:"mc",
text:"A chave 'x' nunca foi salva. O que retorna a expressão?",
code:`JSON.parse( localStorage.getItem('x') )`,
options:["[]","null","Lança SyntaxError","undefined"],
answer:1,
exp:"getItem('x') é null; JSON.parse(null) devolve null (não erro). Por isso usa-se || '[]' ou um if(... == null) return []."},

{topic:"Estilo Prova",diff:"hard",type:"mc",
text:"Um Servico foi salvo com JSON.stringify e relido com JSON.parse. O objeto lido tem o método problemas()?",
options:["Sim","Não — JSON.parse devolve um objeto simples, sem os métodos da classe","Sim, se usar JSON.stringify de novo","Apenas os getters"],
answer:1,
exp:"Serializar e desserializar preserva só os dados. O objeto recuperado é simples (sem prototype) — para usar problemas() seria preciso recriar new Servico(...)."},

{topic:"DOM",diff:"hard",type:"mc",
text:"O que acontece ao executar o código?",
code:`const li = document.createElement('li');
li.appendChild( 'texto' );`,
options:["Adiciona 'texto' ao li","Lança erro: appendChild só aceita Node (use append, que aceita string)","Adiciona 'texto' como atributo","Não faz nada"],
answer:1,
exp:"appendChild exige um Node — passar string lança TypeError. append() aceita string diretamente; era a diferença cobrada na prova."},

{topic:"Promise/Fetch",diff:"hard",type:"mc",
text:"Um fetch resolveu uma resposta com status 500 e o código NÃO checou response.ok. O que ocorre?",
options:["A Promise rejeita sozinha","O código segue como se tivesse dado certo (o erro 500 passa despercebido)","Lança automaticamente um erro 500","Retorna null"],
answer:1,
exp:"Sem checar response.ok, o 500 é tratado como sucesso e o código tenta usar dados inexistentes. Daí o padrão if(!response.ok) throw."},

{topic:"Arrays",diff:"hard",type:"mc",
text:"Qual é o retorno?",
code:`['a', 'b', 'c'].findIndex( x => x === 'b' )`,
options:["'b'","1","true","-1"],
answer:1,
exp:"findIndex devolve o ÍNDICE do primeiro elemento que passa no teste ('b' está na posição 1). find devolveria o próprio 'b'; -1 seria se não achasse."},

{topic:"JS Básico",diff:"hard",type:"mc",
text:"Qual é o resultado de Number('12px')?",
options:["12","'12px'","NaN","undefined"],
answer:2,
exp:"Number exige que a string inteira seja numérica — 'px' invalida, retornando NaN. parseInt('12px') daria 12 (lê os dígitos iniciais)."},

{topic:"Estilo Prova",diff:"hard",type:"mc",
text:"Qual é a saída?",
code:`let soma = 0;
for ( const nome of ['Ana', 'Bia'] ) {
  soma += nome.length;
}
console.log( soma );`,
options:["6","2","['Ana', 'Bia']","7"],
answer:0,
exp:"for..of soma o length de cada nome: 'Ana'(3) + 'Bia'(3) = 6. Mesma lógica da questão mediaDosNomes da prova."},

];
