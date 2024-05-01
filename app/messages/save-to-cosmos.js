const cosmos = require('../cosmos')
const { cosmosConfig } = require('../config')

const saveToCosmos = async (message) => {
  try {
    const { messagesDatabase } = await cosmos()

    const item = {
      body: message.body
    }

    await messagesDatabase
      .container(cosmosConfig.messagesContainer)
      .items.create(item)

    console.log('Message saved to CosmosDB:', item)
  } catch (error) {
    console.error('Error saving message to Cosmos:', error)
  }
}

module.exports = { saveToCosmos }
