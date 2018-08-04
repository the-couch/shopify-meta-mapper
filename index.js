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

  const shopifyAPI = new Shopify({
    shopName: shopifyInfo.store_name,
    apiKey: shopifyInfo.store_apikey,
    password: shopifyInfo.store_password
  })
  shopifyAPI.product.list({ limit: 250, page: 0 })
    .then(
      (products) => {
        console.log('hey', products)
      }, () => {
        console.log('bad err')
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        res.write(JSON.stringify({
          errors: [
            'Issue accessing Shopify'
          ]
        }))
        res.end()
      }
      // products => {
      //   products.map(async ({id}) => {
      //     const metafields = await shopifyAPI.metafield.list({
      //       limit: 250,
      //       metafield: { owner_resource: 'product', owner_id: id }
      //     })
      //     // console.log('what?', metafields)
      //     const oldField = metafields.find(
      //       ({ namespace, key }) => namespace === 'global' && key === 'testing'
      //     )
      //
      //     if (!oldField) return
      //
      //     const newField = metafields.find(
      //       ({ namespace, key }) => namespace === 'sf_product_land' && key === 'updated'
      //     )
      //
      //     if (newField) {
      //       // console.log('new field', newField)
      //       // since the newfield exists let's update it
      //       shopifyAPI.metafield.update(newField.id, {
      //         value: oldField.value
      //       }).then(res => console.log('response', res))
      //     }
      //
      //     // console.log('there is an old field', oldField)
      //   })
      // }
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