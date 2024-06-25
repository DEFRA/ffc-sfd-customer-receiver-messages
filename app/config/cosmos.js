const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string().optional(),
  key: Joi.string().optional(),
  messagesDatabase: Joi.string().optional().default('ffc-sfd-customer-receiver-messages'),
  messagesContainer: Joi.string().optional().default('messages-container')
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  messagesDatabase: 'ffc-sfd-customer-receiver-messages',
  messagesContainer: 'messages-container'
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The CosmosDB config is invalid. ${error.message}`)
}

module.exports = value
