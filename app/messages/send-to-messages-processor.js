const { MessageSender } = require('ffc-messaging')
const { senderConfig } = require('../config')

const sendToMessagesProcessor = async (message) => {
  const sender = new MessageSender(senderConfig.senderTopic)
  try {
    await sender.sendMessage({
      body: message.body,
      type: message.applicationProperties.type,
      source: 'ffc-sfd-customer-receiver-messages'
    })
    console.log('Message sent to messages processor:', message.body)
  } catch (error) {
    throw new Error(`Error sending message to messages processor: ${error.message}`)
  }
}

module.exports = { sendToMessagesProcessor }
