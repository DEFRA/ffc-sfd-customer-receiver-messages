const { CosmosClient } = require('@azure/cosmos')

const endpoint = process.env.COSMOS_ENDPOINT
const key = process.env.COSMOS_KEY
const cosmosClient = new CosmosClient({ endpoint, key })

const databaseId = 'ffc-sfd-customer-receiver-messages'
const containerId = 'messages-container'

const saveToCosmos = async (message) => {
  try {
    console.log('Saving message to CosmosDB...')

    const { database } = await cosmosClient.databases.createIfNotExists({
      id: databaseId
    })

    const { container } = await database.containers.createIfNotExists({
      id: containerId
    })

    console.log(
      `A CosmosDB database (name: ${database.id}) & container (name: ${container.id}) has been created.`
    )

    const item = {
      body: message.body
    }

    await container.items.create(item)
    console.log('Message saved to CosmosDB:', item)
  } catch (error) {
    console.error('Error saving message to Cosmos', error)
  }
}

module.exports = { saveToCosmos }
