require('now-env')

const router = require('router')
const server = require('connect')()
const bodyParser = require('body-parser')

const serverRouter = router()
server.use(bodyParser.json({type: 'application/*'}))

const landing = require('./landing.js')

const Shopify = require('shopify-api-node')

const { PORT } = process.env

serverRouter.post('/api/update', (req, res) => {
  const shopifyInfo = req.body
  let fieldUpdates = []
  let success = 0

  const shopifyAPI = new Shopify({
    shopName: shopifyInfo.store_name,
    apiKey: shopifyInfo.store_apikey,
    password: shopifyInfo.store_password
  })
  shopifyAPI.product.list({ limit: 250, page: 0 })
    .then(
      (products) => {
        const results = products.map(async ({id}) => {
          const metafields = await shopifyAPI.metafield.list({
            limit: 250,
            metafield: { owner_resource: 'product', owner_id: id }
          })
          const oldField = metafields.find(
            ({ namespace, key }) => namespace === 'global' && key === 'testing'
          )

          if (!oldField) {
            fieldUpdates.push({ id: id, result: 'No field found', error: true })
          }

          const newField = metafields.find(
            ({ namespace, key }) => namespace === shopifyInfo.new_namespace && key === shopifyInfo.new_key
          )

          if (newField) {
            // console.log('new field', newField)
            // since the newfield exists let's update it
            shopifyAPI.metafield.update(newField.id, {
              value: oldField.value
            }).then(res => {
              success++
              fieldUpdates.push({ id: id, result: 'Successfully updated an existing field', error: false })
            })
          } else {
            fieldUpdates.push({ id: id, result: 'No new field exists for that namespace and key combination', error: true })
          }
        })
        Promise.all(results).then(() => {
          res.writeHead(200, {
            'Content-Type': 'application/json'
          })
          res.write(JSON.stringify({
            error: false,
            updates: fieldUpdates,
            success: success
          }))
          res.end()
        })
      }, () => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        res.write(JSON.stringify({
          error: true,
          reason: 'Issue accessing Shopify'
        }))
        res.end()
      }
    )
})

serverRouter.get('*', (req, res) => {
  res.write(landing)
  res.end()
})

server.use(serverRouter)

server.listen(PORT || 3001, () => {
  console.log(`internet baby running on ${PORT || 3001}`)
})

// {{ product.metafields["global"]["testing"] }}

// move to: product.metafields.sf_product_land.updated