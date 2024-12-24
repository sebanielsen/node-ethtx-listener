## This is an example to listen to transactions and create wallets with ethers.js and eth testnet


## Project setup

```bash
$ npm install
```

## Run the server

```bash
$ node index.js
```

## Check if its running propperly

```bash
Listener Sample % node index.js                                                           
Server is running on port 3000
```

## Create .env file with infura ProjectID 
```bash
INFURA_PROJECT_ID=8e3325f7474e4bd5961ac448f80bcf80
```
## Create a wallet with POST endpoint /create-wallet
```bash
curl -X POST http://localhost:3000/create-wallet
{"address":"0x3373dAeebc9b3cCd996284050B78cAeEc3c98FcB","privateKey":"*************************","mnemonic":"****************"}%
```
## Listen to Created wallet
```bash
nielsen@Sebastian Wallet Creation and Tx Listener Sample % curl -X POST http://localhost:3000/listen/0x3373dAeebc9b3cCd996284050B78cAeEc3c98FcB
{"message":"Listening for transactions to 0x3373dAeebc9b3cCd996284050B78cAeEc3c98FcB"}%                                                    
snielsen@Sebastian Wallet Creation and Tx Listener Sample % 
```
