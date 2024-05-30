const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string(),
  key: Joi.string(),
  messagesDatabase: Joi.string().default('ffc-sfd-customer-receiver-messages'),
  messagesContainer: Joi.string().default('messages-container')
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  messagesDatabase: process.env.COSMOS_MESSAGES_DSTABSE || 'ffc-sfd-customer-receiver-messages',
  messagesContainer: process.env.COSMOS_MESSAGES_CONTAINER || 'messages-container'
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The CosmosDB config is invalid. ${error.message}`)
}

module.exports = value
