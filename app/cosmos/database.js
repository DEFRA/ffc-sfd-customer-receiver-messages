const cosmosClient = require('./client')
const { cosmosConfig } = require('../config')

const messagesDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.messagesDatabase
    })

    await database.containers.createIfNotExists({
      id: cosmosConfig.messagesContainer
    })

    console.log(`A CosmosDB database has been created: ${database.id}.`)

    return database
  } catch (error) {
    console.error('Error creating Cosmos instance:', error)
  }
}

module.exports = { messagesDatabase }
