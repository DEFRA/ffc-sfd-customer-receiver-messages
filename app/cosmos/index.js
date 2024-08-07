const { messagesDatabase } = require('./database')
const cosmosInstance = async () => {
  try {
    const cosmos = {}
    cosmos.messagesDatabase = await messagesDatabase()
    return cosmos
  } catch (error) {
    console.error('Error creating Cosmos instance:', error)
  }
}

module.exports = cosmosInstance
