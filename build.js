var fs = require("fs")
var path = require('path')
var reader = require('line-by-line')
var _  = require("lodash")
var inputFile = new reader(path.resolve(__dirname, '_mapping.py'))
var outputFile = path.resolve(__dirname, "index.json")
var lexers = []

var pattern = /^\s+'(\w+)':\s\('pygments\.lexers\.(\w+)', '(.*)', \((.*)\), \((.*)\), \((.*)\)\)/

// 'RqlLexer': ('pygments.lexers.sql', 'RQL', ('rql',), ('*.rql',), ('text/x-rql',)),
// 'Ca65Lexer': ('pygments.lexers.asm', 'ca65 assembler', ('ca65',), ('*.s',), ()),
// 'CbmBasicV2Lexer': ('pygments.lexers.basic', 'CBM BASIC V2', ('cbmbas',), ('*.bas',), ()),
// 'CeylonLexer': ('pygments.lexers.jvm', 'Ceylon', ('ceylon',), ('*.ceylon',), ('text/x-ceylon',)),
// 'Cfengine3Lexer': ('pygments.lexers.configs', 'CFEngine3', ('cfengine3', 'cf3'), ('*.cf',), ()),

var flatten = function (input) {
  return _.compact(
    input.replace(/'/g, "").split(",").map(function(thing) {
      return thing.trim()
    })
  )
}

inputFile.on('line', function (line) {
  var match = line.match(pattern)
  if (!match) return
  lexers.push({
    name: match[3],
    category: match[2],
    aliases: flatten(match[4]),
    filenames: flatten(match[5]),
    mimetypes: flatten(match[6]),
  })

});

inputFile.on('end', function () {
  console.log(lexers)
  fs.writeFileSync(outputFile, JSON.stringify(lexers, null, 2))
  console.log("\n\n%d lexers written to %s", lexers.length, outputFile)
});
