# Javascript para Frontend


## Javascript e DOM

- DOM: _Document Object Model_.
	- Representação do HTML da página criada pelo _browser_.
	- A partir do _parse_ do documento.
	- Árvore em que os nós são os elementos/_tags_ do documento.
- Javascript disponibiliza funções para interagir com o DOM:
	- Navegar pela hierarquia.
	- Acessar, modificar, remover e adicionar novos nós.
- Utilidades:
    - Código Javascript pode alterar conteúdo e estilo da página mostrada ao utilizador.
    - Código Javascript pode ler valores introduzidos pelo utilizador em campos de formulário.
    - Código Javascript pode realizar operações no servidor (com fetch, por exemplo) e apresentar resposta no HTML.

### Javascript e DOM: O Objeto `document`

- Acesso ao DOM pode ser feito pelo objeto `document`.
	- Implicitamente disponível.
	- Representa o documento HTML.
	- Contém (entre outras) a propriedade `documentElement`.
		- Elemento correspondente à _tag_ `<html>`.
		- Ou seja, a raiz da árvore.
- Cada nó do DOM possui (entre outras) as propriedades.
	- `childNodes`: vetor com os seus filhos no DOM.
	- `parentNode`: seu pai no DOM.
	- `nodeName`: identificador do tipo de nó na árvore DOM.

### Javascript e DOM: Navegar através do `document`

- Podemos, portanto, navegar o DOM começando no `document`. Exemplo:

```html
<!DOCTYPE html>
<html>
	<head>
        <script type="text/javascript">
            function retornaNoEFilhos(no, nivel) {
                let s = "", i;
                if (nivel > 0) {
                    for (i = 0; i < nivel - 1; i++) s += "      ";
                    s += "+---- "
                }
                s += no.nodeName + "\n";
                for (i = 0; i < no.childNodes.length; i++) 
                    s += retornaNoEFilhos(no.childNodes[i], nivel + 1);
                return(s);
            }
        </script>
	</head>
	<body>
		<h1>Título</h1>
        <h2>Seção</h2>
        Uma <b>tabela</b>:<br>
		<table>
            <tr><th>Col 1</th><th>Col 2</th></tr>
            <tr><td><s>val 1</s></td><td><u>val 2</u></td></tr>
            <tr><td><a href="outraPagina.html">val 3</a></td><td>val 4</td></tr>
        </table>
        <input type="button" value="Gerar DOM" onclick="alert(retornaNoEFilhos(document.documentElement, 0));">
	</body>
</html>
```

[html-samples/Exemplo9.html](html-samples/Exemplo9.html)

</iframe>


### JS e DOM: A Família de Métodos `getElementBy*`

- Podemos encontrar um elemento no DOM fazendo implementando uma busca na árvore.
- Mas há métodos (do objeto `document`) já disponíveis para isso:

    | Nome                      | Retorno                                        |
    | ------------------------- | ---------------------------------------------- |
    | `getElementById()`        | Primeiro (único?) elemento com id especificado |
    | `getElementByTagName()`   | Todos os elementos daquela _tag_               |
    | `getElementByName()`      | Todos os elementos com aquele nome             |
    | `getElementByClassName()` | Todos os elementos pertencentes aquela classe  |


- Note: para o `getElementByClassName()`, múltiplas classes podem ser especificadas separadas por espaço.
	- Retorno: elementos que pertencem a ambas **simultaneamente**.

    ```javascript
    let el1 = document.getElementById('meuDiv');
    let el2 = document.getElementByTagName('div');
    let el3 = document.getElementByClass('minhaClasse1 minhaClasse2');
    ```

### Javascript e DOM: Modificar Conteúdo de Elementos

- Pode ser feito com a propriedade `innerHTML`:

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <script type="text/javascript">
                let vezesCarregado = 0;
                function carregaBotao() {
                    vezesCarregado++;
                    let el = document.getElementById("saida");
                    if (vezesCarregado == 1)
                        el.innerHTML = "Botão foi carregado 1 vez";
                    else
                        el.innerHTML = "Botão foi carregado " + String(vezesCarregado) +" vezes";
                }
            </script>
        </head>
        <body>
            <h1>Vezes carregado</h1>
            <p id="saida">Botão foi carregado 0 vezes</p>
            <input type="button" value="Carregar" onclick="carregaBotao();">
        </body>
    </html>
    ```

- Exemplo disponível em: [html-samples/Exemplo10.html](html-samples/Exemplo10.html).

### Javascript e DOM: Modificar Estilo de Elementos

- Pode ser feito com a propriedade `style`:

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <script type="text/javascript">
                var indiceCor = 0;
                var cores = ["", "blue", "red", "green", "orange"];
                function alteraCor() {
                    indiceCor = (indiceCor + 1) % cores.length;
                    var el = document.getElementById("meuElemento");
                    el.style.color = cores[indiceCor];
                }
            </script>
        </head>
        <body>
            <h1>Mudança de cor</h1>
            <p id="meuElemento">Um texto qualquer</p>
            <input type="button" value="Alterar cor" onclick="alteraCor();">
        </body>
    </html>
    ```

- Exemplo disponível em: [html-samples/Exemplo11.html](html-samples/Exemplo11.html).

### Javascript e DOM: Inserir Novos Elementos

- **Objetivo**: criar um novo elemento em determinado ponto do documento.
	- _e.g._, colocar uma tabela dentro de um `div`.
- Técnicamente, pode ser feito com o `innerHTML`:
	1. Acha-se o elemento do DOM correspondente ao `div`.
	2. Adiciona-se o código HTML da tabela ao `innerHTML` do `div`.

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <script type="text/javascript">
                function adicionaTabela() {
                    let el = document.getElementById("meuDiv");
                    el.innerHTML += "<table><tr><th>Col 1</th><th>Col 2</th></tr>";
                    el.innerHTML += "<tr><td>Dado 1</td><td>Dado 2</td></tr></table>";
                }
            </script>
        </head>
        <body>
            <h1>Tabela Dinâmica</h1>
            <div id="meuDiv"></div>
            <input type="button" value="Adiciona Tabela" onclick="adicionaTabela();">
        </body>
    </html>
    ```

- No entanto, Javascript fornece uma API para esse fim.
	- Torna código mais legível.
- Métodos relevantes:

    | Método                      | Propósito                                                             | Exemplo                                 |
    | --------------------------- | --------------------------------------------------------------------- | --------------------------------------- |
    | `document.createElement()`  | Cria novo elemento DOM do tipo especificado                           | `document.createElement("table")`       |
    | `document.createTextNode()` | Cria novo nó do tipo `text` (_i.e._, conteúdo de tag)                 | `document.createElement("Novo texto!")` |
    | `el.appendChild()`          | Acrescenta novo filho ao elemento (como último filho)                 | `el.appendChild(novoDiv)`               |
    | `el.insertBefore()`         | Acrescenta novo filho ao elemento (antes de outro filho especificado) | `el.insertBefore(novoDiv, outroFilho)`  |


- **Note**: na tabela, `el` denota algum elemento/nó **já existente** no DOM.


### Javascript e DOM: Exemplos de Inserção

```html
<!DOCTYPE html>
<html>
	<head>
        <script type="text/javascript">
            let elementosAdicionados = 0;
            function adicionaLinha() {
				let el = document.getElementById("minhaTabela");
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let text1 = document.createTextNode("Texto célula " + String(++elementosAdicionados));
                let text2 = document.createTextNode("Texto célula " + String(++elementosAdicionados));
                td1.appendChild(text1);
                td2.appendChild(text2);
                tr.appendChild(td2);
                tr.insertBefore(td1, td2); // td1 inserido antes do td2!
                el.appendChild(tr);
			}
        </script>
	</head>
	<body>
		<h1>Tabela Dinâmica (II)</h1>
		<table id="minhaTabela">
            <tr><th>Col 1</th><th>Col 2</th></tr>
        </table>
        <input type="button" value="Nova linha ao final" onclick="adicionaLinha();">
	</body>
</html>
```

- Exemplo disponível em: [html-samples/Exemplo13.html](html-samples/Exemplo13.html).


### Javascript e DOM: Remoção e Substituição

- Por vezes, é útil removermos ou substituirmos um elemento do DOM.
- API provê métodos para isso:

    | Método              | Propósito                                          | Exemplo                         |
    | ------------------- | -------------------------------------------------- | ------------------------------- |
    | `el.removeChild()`  | Remove filho especificado do elemento              | `el.removeChild(elFilho)`       |
    | `el.replaceChild()` | Substitui filho especificado do elemento por outro | `el.replaceChild(novo, antigo)` |


### Javascript e DOM: Exemplos de Remoção e Substituição

```html
<!DOCTYPE html>
<html>
	<head>
        <script type="text/javascript">
            function substitui() {
				var lista = document.getElementById("lista");
				var item = document.getElementById("substituido");
                var novo = document.createElement("li");
                novo.appendChild(document.createTextNode("Novo item"));
                lista.replaceChild(novo, item);
			}
            function remove() {
				var lista = document.getElementById("lista");
				var item = document.getElementById("removido");
                lista.removeChild(item);
			}
        </script>
	</head>
	<body>
		<h1>Remoção e Substituição</h1>
		<ul id="lista">
            <li id="substituido">Item 1</li>
            <li>Item 2</li>
            <li id="removido">Item 3</li>
        </ul>
        <input type="button" value="Remove" onclick="remove();">
        <input type="button" value="Substitui" onclick="substitui();">
	</body>
</html>
```

- Exemplo disponível em: [html-samples/Exemplo14.html](html-samples/Exemplo14.html)


## Javascript: Eventos

- Um dos principais usos de Javascript é **responder a eventos**.
	- Carregamento de botões.
	- Estouro de temporizadores.
	- Término de carregamento da página.
	- Mudança em campo de formuário.
	- ...
- Paradigma de **Programação Orientada a Eventos**.

### Javascript: Eventos do DOM

- Boa parte dos elementos HTML suporta vários eventos.
- Propriedades `on*` associam eventos a códigos Javascript.

| Propriedade   | Evento                                     | Observações                 |
| ------------- | ------------------------------------------ | --------------------------- |
| `onclick`     | Utilizador carrega no elemento             |                             |
| `onload`      | Página é carregada                         | Usado com elemento `body`   |
| `onunload`    | Utilizador deixa a página                  | Usado com elemento `body`   |
| `onchange`    | Campo de formulário tem valor alterado     | Usado com elementos `input` |
| `onmouseover` | Cursor está sobre elemento                 |                             |
| `onmouseout`  | Cursor deixa área do elemento              |                             |
| `onmousedown` | Botão do rato é pressionado sobre elemento |                             |
| `onmouseup`   | Botão do rato é liberado sobre o elemento  |                             |

### Javascript: Eventos de Temporização

- Em alguns casos, queremos executar após um determinado tempo.
- Para isso, criamos um **temporizador**, associamos uma duração e uma _callback_.
	- Feito com a função `setTimeout()`.
	- Retorna um objeto representando o temporizador.
- Podemos cancelar o temporizador criado usando a função `clearTimeout()`.

### Javascript: Exemplo de Temporizador

```html
<!DOCTYPE html>
<html>
	<head>
        <script type="text/javascript">
            var timer;
            function iniciar() {
				var botao = document.getElementsByTagName("input")[0];
                botao.value = "Parar";
                botao.onclick = parar;  // Altera callback do botão.
                timer = setTimeout(timerCallback, 1000);
			}
            function parar() {
				var botao = document.getElementsByTagName("input")[0];
                botao.value = "Iniciar";
                botao.onclick = iniciar;  // Altera callback do botão.
                clearTimeout(timer);
			}
            function timerCallback() {
                var el = document.getElementById("titulo");
                if (el.style.color == "red") el.style.color = "";
                else el.style.color = "red";
                timer = setTimeout(timerCallback, 1000);
            }
        </script>
	</head>
	<body>
		<h1 id="titulo">Temporizador</h1>
        <input type="button" value="Iniciar" onclick="iniciar();">
	</body>
</html>
```

## Javascript: Carregar Ficheiro Fonte

- Indicar o caminho relativo do ficheiro JS no `src` do elemento `script`.

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <script src="caminho/para/o/ficheiro.js"></script>
        </head>
        <body>
            ...
        </body>
    </html>
    ```
