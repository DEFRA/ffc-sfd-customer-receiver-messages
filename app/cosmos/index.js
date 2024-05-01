const { messagesDatabase } = require('./database')

const cosmos = async () => {
  const cosmos = {}
  cosmos.messagesDatabase = await messagesDatabase()
  return cosmos
}

module.exports = cosmos
