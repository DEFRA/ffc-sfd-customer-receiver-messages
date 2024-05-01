const cosmos = require('../cosmos')
const { cosmosConfig } = require('../config')

const saveToCosmos = async (message) => {
  try {
    const { messagesDatabase } = await cosmos()

    await messagesDatabase
      .container(cosmosConfig.messagesContainer)
      .items.create(message.body)

    console.log('Message saved to CosmosDB:', message.body)
  } catch (error) {
    console.error('Error saving message to Cosmos:', error)
  }
}

module.exports = { saveToCosmos }
