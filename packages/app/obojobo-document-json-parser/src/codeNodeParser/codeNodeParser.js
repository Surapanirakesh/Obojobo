const textGroupParser = require('../textGroupParser')

const codeNodeParser = node => {
    const id = node.id ? ` id="${node.id}"` : ''

    const textGroupXML = textGroupParser(node.content.textGroup)

    return (
        `<Code${id}>` +
        textGroupXML +
        `</Code>`
    )
}

module.exports = codeNodeParser
