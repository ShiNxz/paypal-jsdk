<div align="center">
  <strong>paypal-jsdk</strong> PayPal JavaScript SDK that supports all PayPal REST APIs out of the box.
</div>

## Features

-   🗂 **Typed**: Include 100% detailed types for everything you will ever need [types included](#typescript-support)
-   🌳 **Tree-shakeable**: Only the parts you use will be imported into your app's bundle.
-   🚀 **Fast**: Built with ES6 modules and functions.
-   🛡 **Bulletproof**: Written in strict TypeScript and has 100% test coverage.
-   😍 **Simple**: Straightforward and easy to use, covers multiple ways to achive your tasks and keep your code clean.
-   🤞 **V1 & V2**: Includes support for both V1 and V2 of the PayPal REST APIs out of the box.
-   💨 **No dependencies**

## Table of Contents

-   [Preparations](#preparations)
-   [Getting Started](#getting-started)
-   [Moving Into Production](#moving-into-production)
-   [Types Included](#types-included)
-   [Contribution](#contribution)

## Tutorials

-   [Create a Payment Request](#create-a-payment-request)
-   [Create Subscription](#create-subscription)

## Available APIs

-   [Shipment Tracking](#shipment-tracking)
-   [Catalog Products](#catalog-products)
-   [Disputes](#disputes)
-   [Identity](#identity)
-   [Invoices](#invoices)
-   [Orders](#orders)
-   [Partner Referrals](#partner-referrals)
-   [Payment Experience Web Profiles](#payment-experience-web-profiles)
-   [Payment Method Tokens](#payment-method-tokens)
-   [Payments](#payments)
-   [Payouts](#payouts)
-   [Referenced Payouts](#referenced-payouts)
-   [Subscriptions](#subscriptions)
-   [Transaction Search](#transaction-search)
-   [Webhooks Management](#webhooks-management)

## Preparations

Install the package using your favorite package manager:

```
npm install paypal-jsdk
```

```
pnpm add paypal-jsdk
```

```
yarn add paypal-jsdk
```

Create a PayPal Developer Client & Authenticate with PayPal

1. Create a 2 sandbox accounts on [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/accounts)
   One for the seller (business) and one for the buyer (personal)
2. Login to the sandbox account in the [PayPal Sandbox Portal](https://www.sandbox.paypal.com/billing/plans)
3. Create an app in the [My Apps & Credentials](https://developer.paypal.com/developer/applications/) section
   One Sandbox and one Live app, for the Sandbox select the business account
    - The Live app will be used for production
    - The Sandbox app will be used for testing
4. Select the features that you need, make sure that the Subscriptions feature is enabled in order to use the Subscriptions API.
5. Copy the client id and secret from the sandbox app and paste them in the .env file
6. For localhost testing you can use [ngrok](https://ngrok.com/) to create a tunnel to your localhost

-   For the Subscriptions API follow these steps:

1. Head over to the Sandbox Webhooks section at the bottom of the page and create a new webhook
    - The webhook url should be the url of your app + something like /api/paypal/webhooks
    - Choose these events: `Billing subscription activated, Billing subscription expired, Billing subscription payment failed, Billing subscription re-activated, Payment sale completed``

## Getting Started

The package is built with ES6 modules and functions, so you can import only the parts you need into your app's bundle, this will reduce the bundle size and improve performance.

In order to get started and init the paypal client you have 2 options:

1. add these variables to your .env file:

```env
PAYPAL_CLIENT_ID = "XXX"
PAYPAL_CLIENT_SECRET = "XXX"
PAYPAL_MODE = "SANDBOX" # or LIVE
```

2. Initialize the client manually:

```js
import Paypal from 'paypal-jsdk'

await Paypal.init('clietId', 'clientSecret', 'SANDBOX')

const Router = (req, res) => {
	// Your router logic
}
```

Note that you can also import the package functions directly:

```js
import { Init } from 'paypal-jsdk'

await Init('clietId', 'clientSecret', 'SANDBOX') // or LIVE

const Router = (req, res) => {
	// Your router logic
}
```

# Tutorials

## Create Subscription

-   todo

## Create a Payment Request

-   todo

# Available APIs

## Shipment Tracking

-   not available yet

## Catalog Products

-   not available yet

## Disputes

-   not available yet

## Identity

-   not available yet

## Invoices

-   not available yet

## Orders

-   not available yet

## Partner Referrals

-   not available yet

## Payment Experience Web Profiles

-   not available yet

## Payment Method Tokens

-   not available yet

## Payments

-   not available yet

## Payouts

-   not available yet

## Referenced Payouts

-   not available yet

## Subscriptions

-   not available yet

## Transaction Search

-   not available yet

## Webhooks Management

-   not available yet

# Moving Into Production

-   todo

## Types Included

The package includes typescript support out of the box and detailed types for all the PayPal REST APIs requests and responses.
<img src="assets/types.png" alt="types" />

## Contribution

Note that the package is still in development, we are working on adding more APIs and features.
if you want to contribute to the project you can do so by opening a pull request or an issue.
