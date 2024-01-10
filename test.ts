import Init from './functions/Init'
import dotenv from 'dotenv'
import ListAvailableEvents from './functions/Webhooks/ListEvents'

dotenv.config()

Init(process.env.PAYPAL_CLIENT_ID!, process.env.PAYPAL_CLIENT_SECRET!, 'SANDBOX')
;(async () => {
	try {
		const webhooks = await ListAvailableEvents()
		console.log(webhooks)
	} catch (error) {
		console.error(error)
	}
})()
