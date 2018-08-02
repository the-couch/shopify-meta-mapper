require('now-env')

const router = require('router')
const server = require('connect')()
const bodyParser = require('body-parser')

const serverRouter = router()
server.use(bodyParser.json({type: 'application/*'}))

const landing = require('./landing.js')

const { PORT } = process.env

serverRouter.get('*', (req, res) => {
  res.write(landing)
  res.end()
})

server.use(serverRouter)

server.listen(PORT || 3001, () => {
  console.log(`internet baby running on ${PORT || 3001}`)
})

// {{ product.metafields["global"]["testing"] }}