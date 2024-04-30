require('./insights').setup()
require('log-timestamp')
const { startMessaging } = require('./messaging')
const { DEVELOPMENT } = require('./constants/environments')
// const { saveToCosmos } = require('./messaging/save-to-cosmos')

// Disable TLS validation in development to allow connection to cosmosDb emulator
if (process.env.NODE_ENV === DEVELOPMENT) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

const init = async () => {
  await startMessaging()
  // await saveToCosmos({ id: '2', body: 'Hello' })
  console.log('Running receiver service for messages')
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
