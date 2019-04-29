var express = require('express')
var bodyParser = require('body-parser')
var fetch = require('node-fetch')
var fs = require('fs')

var Hub = require('@decentralized-identity/hub-node-core')
var hubMongo = require('hub-mongo-connector')
var didCommon = require('@decentralized-identity/did-common-typescript')
var didAuth = require('@decentralized-identity/did-auth-jose')

const universalResolverUrl = 'https://beta.discover.did.microsoft.com'
const privateKeyFilePath = './private.jwk'
const mongoUrl = 'mongodb://localhost:27017'

async function runHub() {

  var app = express()
  const port = 8080
  app.use(bodyParser.raw({
      inflate: true,
      limit: '500kb',
      type: 'application/jwt'
    }))

  // TODO: Register DID, provision & format keys, write to fs during npm setup

  const privateJwk = JSON.parse(fs.readFileSync(privateKeyFilePath, 'utf8'))
  const hubPrivateKey = { [privateJwk.kid] : didAuth.PrivateKeyRsa.wrapJwk(privateJwk.kid, privateJwk) }
  const hubCryptoSuites = [new didAuth.RsaCryptoSuite(), new didAuth.AesCryptoSuite(), new didAuth.Secp256k1CryptoSuite()]

  mongoStore = new hubMongo.MongoDBStore({
    url: mongoUrl,
    databaseId: 'identity-hub',
    commitCollectionId: 'hub-commits',
    objectCollectionId: 'hub-objects',
  })

  await mongoStore.initialize()

  var hub = new Hub.default({
    store: mongoStore,
    resolver: new didCommon.HttpResolver({ fetch: fetch, resolverUrl: universalResolverUrl}),
    keys: hubPrivateKey,
    cryptoSuites: hubCryptoSuites
  })

  app.post('/', async function (req, res) {

    try {

      console.log('Hub request received')

      // process request body
      var requestBuffer
      if (typeof req.body === 'string') {
        requestBuffer = Buffer.from(req.body)
      } else if (Buffer.isBuffer(req.body)) {
        requestBuffer = req.body
      } else {
        return res.status(400).json({
          error_code: 'UNSUPPORTED_CONTENT_TYPE',
          error_url: null,
          developer_message: 'Expected a buffer or a string in HTTP request body.',
          inner_error: {
            timestamp: new Date(Date.now()).toUTCString()
          }
        })
      }

      // pass hub request to Hub SDK
      response = await hub.handleRequest(requestBuffer)

      // return hub response from SDK to client
      return res.status(response.ok ? 200: 500).send(response.body);

    } catch (error) {

      console.log(error)
      throw new Error('An unexpected error has occurred while handling the hub request.')
    }
  })

  app.listen(port, () => console.log(`Identity hub running on port ${port}`))

}

runHub();

