import Node from '../node'

function process(token, section) {
  const { key, value } = token.data
  switch (key) {
  case `TODO`:
    if (section.type != `root`) break
    const todos = value.split(/\s|\|/g).filter(String)
    section.meta.todos = todos
    this.lexer.updateTODOs(todos)
    break
  case `HTML`:
    section.push(new Node(`html`).with({ value }))
    break
  case `CAPTION`:
  case `HEADER`:
  case `NAME`:
  case `PLOT`:
  case `RESULTS`:
    this._aks[key] = value
    break
  default:
    if (section.type === `root`) {
      section.meta[key.toLowerCase()] = value
    }
    break
  }
  this.consume()
  return this.parseSection(section)
}

module.exports = process
