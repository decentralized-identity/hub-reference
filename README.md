Identity Hub Reference Implementation
================================

This repo contains an open source implementation of a DIF identity hub for evaluation purposes. It is not intended for production use. The APIs and protocols used throughout are part of a proposed standard for decentralized data storage.

Identity hubs provide durable storage for information and data "owned" by a [decentralized identity (DID)](https://w3c-ccg.github.io/did-spec/). Hubs can run in multiple different enviornments - in the cloud, on a server, or on an edge device. All instances of identity hubs that are associated with a DID synchronize data between each other to ensure consistency. Currently, identity hubs support simple read and write of JSON data.

A working identity hub implementation is composed of several layers, several of which are being developed as distinct repos:

| Layer | GitHub Repo | Docs | 
| ----- | ----------- | ---- |
| Client SDK | [hub-sdk-js](https://github.com/decentralized-identity/hub-sdk-js) | |
| Standard APIs & Interfaces | [hub-node-core](https://github.com/decentralized-identity/hub-node-core) | [Protocol Explainer](https://github.com/decentralized-identity/identity-hub/blob/master/explainer.md) | 
| Message Encryption & Authentication | [did-auth-jose](https://github.com/decentralized-identity/did-auth-jose) | [Protocol Explainer](https://github.com/decentralized-identity/identity-hub/blob/master/docs/authentication.md) |
| Permissions/Authorization | [hub-node-core](https://github.com/decentralized-identity/hub-node-core) | [Explainer](https://github.com/decentralized-identity/identity-hub/blob/master/docs/permissions.md) |
| Edge Data Encryption | not yet implemented | |
| Sync & Replicaition | not yet implemented | | 
| Pluggable Data Storage | [hub-mongo-connector](https://github.com/microsoft/hub-mongo-connector) | |

The reference implementation in this repo serves an identity hub as a simple HTTP web server using NodeJS and Express. MongoDB is used for data persistence. 

To learn more about identity hubs, check out the [identity-hub repo](https://github.com/decentralized-identity/identity-hub).

## Run an identity hub

Follow these instructions to run an identity hub on your local machine:

1. Install MongoDB Community Server from [this location](https://www.mongodb.com/download-center/community). When prompted by the installer, choose a complete installation. Be sure to note the MongoDB data directory and installation location.

2. Run MongoDB on your machine using the `mongod` command:

```bash
mongod --dbpath="path-to-data-directory"
```

3. Clone this repository:

```bash
git clone https://github.com/decentralized-identity/hub-node-reference 
```

4. Install all necessary packages:

```bash
npm install
``` 

> Note: You may need to install python 2.7, and/or the [node Windows build tools](https://www.npmjs.com/package/windows-build-tools) to complete this step.

5. If necessary, modify the MongoDB URL in the `index.js` file. By default MongoDB runs at `mongodb://localhost:27017`.

6. Run the identity hub. This script will generate a key and register a DID for your identity hub, using a test DID method provided by Microsoft.

```bash
npm start
```

Note the DID output by the start script, and the private key generated in the `private.jwk` file.

## Run the sample app

To try out the identity hub, you can run a sample desktop app by following these instructions:

1. Download and run the sample application by following the instructions at this repo: [https://github.com/decentralized-identity/hub-sdk-js-sample](https://github.com/decentralized-identity/hub-sdk-js-sample).
2. Enter the following options for the sample app, some of which are under "Advanced Options":

- For the hub DID, use the DID output by the start script above.
- For the hub URL, use `http://localhost:8080`
- For the resolver URL, use `https://beta.discover.did.microsoft.com/`
- For the user private key, you may copy and paste the contents of `private.jwk` or create an entirely new key.
- For the user DID, you may use the same DID from above or register an entirely new test DID.

## Contribute to identity hub development

There's lots of work to be done in the area of decentralized data storage. If you'd like to get involved, consider joining the Decentralized Identity Foundation and participating in the [Storage & Compute Working Group](https://identity.foundation/#wgs).

