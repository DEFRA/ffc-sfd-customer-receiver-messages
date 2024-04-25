const util = require('util')
const { messageConfig } = require('../config')
const { MessageReceiver } = require('ffc-messaging')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received message:', message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Message error', util.inspect(err.message, false, null, true))
  }
}

const startMessaging = async () => {
  console.log(messageConfig)
  let messagesReceiver //eslint-disable-line
  const receiverAction = message => handleMessage(message, messagesReceiver)
  messagesReceiver = new MessageReceiver(
    messageConfig.receiverSubscription,
    receiverAction
  )
  await messagesReceiver.subscribe()
  console.info('Receiver ready to receive processor messages')
}

module.exports = { startMessaging }
