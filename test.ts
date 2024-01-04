import Init from './functions/Init'
import dotenv from 'dotenv'
import { Subscriptions } from './'

dotenv.config()

Init(process.env.PAYPAL_CLIENT_ID!, process.env.PAYPAL_CLIENT_SECRET!, 'SANDBOX')
;(async () => {
	try {
	} catch (error) {
		console.error(error)
	}
})()
