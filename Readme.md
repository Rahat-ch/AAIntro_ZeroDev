# Introduction to Account Abstraction

This README provides an overview and a basic Node.js code snippet for building gasless transactions using Account Abstraction and the ZeroDev SDK.

## Getting Started

Before you can use the ZeroDev SDK, you need to obtain a project ID from their dashboard. Visit [ZeroDev Dashboard](https://dashboard.zerodev.app/) to get your project ID.

The script requires that we set a project ID and a private key. We can generate a random private key with this command:

```bash
node -e "console.log('0x' + require('crypto').randomBytes(32).toString('hex'))"
```

Then export the variables:

export PROJECT_ID="your project ID"
export PRIVATE_KEY="your private key"


## Gasless Batched Transactions with ZeroDev SDK

The Node.js snippet in `app.js` demonstrates how to create gasless batched transactions using Account Abstraction and the ZeroDev SDK. 

## Important note 

To run this code as is, you need to have your smart account address allowlisted. Please contact Rahat for assistance in this process. Otherwise use it as a guide for interacting with your own Smart Contracts.

