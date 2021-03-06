# pygments-lexers

A JSON array of the 350+ languages supported by the pygments syntax highlighter.

The array is generated by parsing the [pygments/lexers/_mapping.py](https://bitbucket.org/birkenfeld/pygments-main/src/41771329a71bc4ab86b0d4412d5933d95b658dfd/pygments/lexers/_mapping.py?at=default) file in the pygments source.

## Installation

```sh
npm install pygments-lexers --save
```

## Usage

The module exports an array. Each item in the array has the following properties:

```js
{
  name: "CoffeeScript",
  category: "javascript",
  aliases: ["coffee-script", "coffeescript", "coffee"],
  filenames: ["*.coffee"],
  mimetypes: ["text/coffeescript"]
}
```

```js
require("pygments-lexers")
  .filter(function(l) { return l.category === "javascript" })
  .map(function(l) { return l.name })

[
  'CoffeeScript',
  'Dart',
  'JavaScript',
  'Kal',
  'Lasso',
  'LiveScript',
  'Mask',
  'Objective-J',
  'TypeScript'
]
```

## Tests

```sh
npm install
npm test
```

## License

MIT
