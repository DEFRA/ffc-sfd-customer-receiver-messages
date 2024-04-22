require('./insights').setup()
require('log-timestamp')

const init = async () => {
  console.log('Running app')
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
