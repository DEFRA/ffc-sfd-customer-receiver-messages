const util = require('util')
const { messageConfig } = require('../config')
const { MessageReceiver } = require('ffc-messaging')
const { saveToCosmos } = require('./save-to-cosmos')
const { sendToMessagesProcessor } = require('./send-to-messages-processor')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received message:', message.body)
    await saveToCosmos(message)
    await sendToMessagesProcessor(message)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Message error', util.inspect(err.message, false, null, true))
  }
}

const startMessaging = async () => {
  let messagesReceiver //eslint-disable-line
  const receiverAction = (message) => handleMessage(message, messagesReceiver)
  messagesReceiver = new MessageReceiver(
    messageConfig.receiverSubscription,
    receiverAction
  )
  await messagesReceiver.subscribe()
  console.info('Messages receiver is ready to consume messages')
}

module.exports = { startMessaging }
