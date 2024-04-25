require('./insights').setup()
require('log-timestamp')
const { startMessaging } = require('./messaging')

const init = async () => {
  await startMessaging()
  console.log('Running app')
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
