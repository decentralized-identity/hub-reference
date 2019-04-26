Running mongo DB:
```
& 'C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe' --dbpath="C:\Program Files\MongoDB\Server\4.0\data"
```

Running local hub:
```
npm install
npm link ../hub-mongo-connector
npm start
```

Test app config:
- did:test:abb98a99-b30c-425a-9fba-d57f0aef137
- contents of private.jwk
- https://beta.discover.did.microsoft.com
- did:test:abb98a99-b30c-425a-9fba-d57f0aef137a
- http://localhost:8080

Notes on Mongo:
- default complete installation of community edition