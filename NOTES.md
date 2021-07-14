## Notes

### SETUP SCRIPT

Lo lanci con

```
node setup
```

che fa

- Validazione di sistema (dei vari linguaggi e versioni che ci servono)
- installa dependencies
- puoi inserire anche o meno la tua email

### SETTINGS DA WORKSPACE

Basta aggiungere dentro `.vscode` un file `settings.json`

### ESEGUIRE TEST

Basta lanciare i comandi

```shell
npm run test
npm test
npm t
```

### FILTRARE PER NOME TEST

Basta lanciare

```shell
npm run test
p
```

e poi mettero il testo da filtrare

### SCRIPT MODULE

```
  <script type="module">
    const rootEle = document.createElement('div')
    rootEle.id = 'root'
    const divEle = document.createElement('div')
    divEle.textContent = 'Hello World'
    divEle.classList.add('container')
    rootEle.append(divEle)
    document.body.append(rootEle)
  </script>
```

serve per definire un pezzo di codice per manipolare il DOM Ref al
[the DOM (the Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

### COME USARE REACT IN HTML

basta importare i seguenti script da [unpkg.com](https://unpkg.com)

```
  <script src="https://unpkg.com/react@17.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.development.js"></script>
```

ed il codice react poi basta che lo definisci dentro un
`<script type='module'>...</script>` es:

```
  <script type="module">
    const rootElement = document.getElementById('root')
    const reactElement = React.createElement('h1', {
      id: 'element-id',
      children: 'Hello World',
    })
    ReactDOM.render(reactElement, rootElement)
  </script>
```

React usa anche lui la manipolazione del DOM, difatti nel suo codice
[here's where that happens in the React source code](https://github.com/facebook/react/blob/48907797294340b6d5d8fecfbcf97edf0691888d/packages/react-dom/src/client/ReactDOMComponent.js#L416)

solo che React astrae il punto di vista imperativo della manipolazione del DOM
dando a sviluppatore un punto di vista Dichiarativo

> Learn more about the difference between those two concepts here:
> [Imperative vs Declarative Programming](https://tylermcginnis.com/imperative-vs-declarative-programming/)

- React: che si occupa di creare elementi React (con `document.createElement()`)
- ReactDOM: responsabile per renderizzare elementi React nel DOM (con
  `rootElement.append()`), separato da React perchè React supporta diversi
  dispositivi

quindi per creare un elemento React (o cmq come viene transpilato da Babel)

```javascript
const elementProps = {id: 'element-id', children: 'Hello world!'}
const elementType = 'h1'
const reactElement = React.createElement(elementType, elementProps)
ReactDOM.render(reactElement, rootElement)
```

### NESTING DI DIVERSI ELEMENTI HTML CON VECCHIA MANIERA

Lo puoi fare così

```javascript
const nestedContent = React.createElement('div', {
  className: 'container',
  children: [
    React.createElement('span', {
      children: 'Hello',
    }),
    React.createElement('span', {
      children: 'World',
    }),
  ],
})
```

li passi come array (ricorda che ti servirà la `key`)

### JSX

simile a HTML viene compilato da Babel in

```jsx
const ui = <h1 id="greeting">Hey there</h1>

// ↓ ↓ ↓ ↓ compiles to ↓ ↓ ↓ ↓

const ui = React.createElement('h1', {id: 'greeting', children: 'Hey there'})
```

molto utile scrivere JSX e vedere come viene convertito da
[Babel](https://babeljs.io)

per scrivere JSX in uno script HTML deve esser di `type="text/babel"`

```
<script type="text/babel">
    const element = React.createElement('div', {
      className: 'container',
      children: 'Hello World',
    })
```

ed aver importato babel

```
<script src="https://unpkg.com/@babel/standalone@7.12.4/babel.js"></script>
```

📜 La react docs per JSX: https://reactjs.org/docs/introducing-jsx.html

Ed interpolazione dentro a JSX

- https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx
- https://reactjs.org/docs/introducing-jsx.html#specifying-attributes-with-jsx

Spread attributes in JSX 📜
https://reactjs.org/docs/jsx-in-depth.html#spread-attributes

Ricorda che gli attributi rispettano sempre l'ordine quindi se ne definisci due
con lo stesso nome l'ultimo definito è quello che verrà applicato

### REACT COMPONENTS

sono funzioni che restituiscono qualcosa di renderizzabile

Custom components REF 📜 Read more

- https://reactjs.org/docs/jsx-in-depth.html
- https://kentcdodds.com/blog/what-is-jsx

in `React.createElement` puoi usare come primo argomento oltre che una stringa
può anche essere una funzione che restituisce contenuto renderizzabile quindi
possiamo passargli anche un Component

```JSX
{React.createElement(message, {children: 'Hello World'})}
```

il primo argomento è sempre il tipo di valore da renderizzare

### NOME COMPONENTS IN MAIUSCOLO

farlo perchè altrimenti il browser interpreta il component come un tag HTML
custom

### VALIDATION CON PROPTYPES CUSTOM

```javascript
function FavoriteNumber({favoriteNumber}) {
  return <div>My favorite number is: {favoriteNumber}</div>
}

const PropTypes = {
  number(props, propName, componentName) {
    if (typeof props[propName] !== 'number') {
      return new Error('Some useful error message here')
    }
  },
}

FavoriteNumber.propTypes = {
  favoriteNumber: PropTypes.number,
}
```

dentro in PropTypes controllo il tipo e se non è di quello richiesto restituisce
Errore

i PropTypes vengono eseguiti sono in dev non in prod perchè sono onerosi

importare invece il PACKAGE PropTypes in HTML

```html
<script src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>
```

se usi un linguaggio `Tipizzato` come `TypeScript` non è utile usare anche i
PropTypes

### 💯 using React Fragments

["React Fragments"](https://reactjs.org/docs/fragments.html)

# Styling

la classe HTML viene tradotta in `className` quando in console accedi
all'elemento selezionato con `$0`, ed anche `style` ti restituisce un oggetto
del tipo `CSSStyleDeclaration`

### PASSARE COL DESTRUCTURING LE PROPS (ANCHE CHILDREN)

```javascript
function Box(props) {
  return <div {...props} />
}

const smallBox = (
  <Box
    className="box box--small"
    style={{fontStyle: 'italic', backgroundColor: 'lightblue'}}
  >
    content
  </Box>
)
```

se interpoli una stringa ricorda di usare il `trim()`

meglio passare invece della classe un attributo che ad esempio indichi la size
per non dover dare onere a chi usa il component di conoscere le classi definite
in esso

# Forms

ricorda sempre di fare il `preventDefault` e di assegnare un `name` all'input

🦉 Ci sono diversi modi per recuperare un valore dell'input col determinato
name:

- Mediante il loro indice: `event.target.elements[0].value`, ma questo funziona
  poco perchè sei troppo legato all'index
- Usando lo specifico oggetto ed i suoi attributi `name` o `id`:
  `event.target.elements.usernameInput.value`

in react si usa `htmlFor` ed è molto utile settare la label così per facilitare
gli screen reader ed anche la selezione dell'input via label

oppure usando il `ref`

Un `ref` è un oggetto che rimane invariato fra i vari rendering del componente
React. Esso contiene una property `current` che può essere aggiornata quando si
vuole. Basterà in un elemento React specificare un attributo `ref` con il valore
della ref creata e al `current` verrà associato l'elemento del DOM che ha quel
ref (l'elemento React).

Quindi se crei un oggetto `inputRef` usando `React.useRef`, potrai accedere al
suo valore con: `inputRef.current.value`
(📜https://reactjs.org/docs/hooks-reference.html#useref)

```javascript
const inputRef = React.createRef()
```

e lo associ così

```
<input
  onChange={handleChange}
  ref={inputRef}
  name="username"
  id="usernameInput"
  type="text"
  value={username}
/>
```

Per mostrare errori a video usa l'attributo `role="alert"` nell'elemento che
mostra errore per gli utenti di screen reader.

per sapere se un valore è true o false

`Boolean(value)`

### 💯 Control the input value

Permette a React di avere controllo sul value dell'input per fare tutte le
logiche e manipolazioni che si vuole.

Sono i `Controlled Form inputs`, ovvero assegnare un value all'input o form
element

```jsx
<input value={myInputValue} />
```

ovviamente dovrai anche associare un `onChange` altrimenti il valore rimane in
sola lettura e salvarlo nello state

### LA KEY NELLE LISTE

React tra ciascun rerendering di una lista se aggiungi o rimuovi un elemento non
sa quale index hai cambiato. Prova ad indovinarlo ed è bravo a farlo ma se gli
elementi della lista sono ad esempio dei React Component che mantengono lo stato
potresti ritrovarti con stati mixati in maniera errata.

Ecco perchè è meglio usare le `key`, tiene traccia dell'elemento durante i
rendering.

Regola **Ogni volta che renderizzi un array di elementi React, ognuno di essi
deve avere una prop `key` univoca.**

📜 Una lettura su cosa può succedere di negativo se non specifichi una prop
`key`
[Understanding React's key prop](https://kentcdodds.com/blog/understanding-reacts-key-prop).

📜 Inoltre un approfondimento qui:
[Why React needs a key prop](https://epicreact.dev/why-react-needs-a-key-prop).
That'll give you a bit of what's going on under the hood, so I recommend reading
this!

** non usare mai l'`index` come key perchè equivale a non definire una key
univoca **

La `key` ti permette anche di avere sempre il focus sul valore della lista
selezionato, anche se cambi ordine
