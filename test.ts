import Init from './Init'
import dotenv from 'dotenv'
import ShowAuthorizedPaymentDetails from './Payments/ShowAuthorizedPaymentDetails'

dotenv.config()

Init(process.env.PAYPAL_CLIENT_ID!, process.env.PAYPAL_CLIENT_SECRET!, 'SANDBOX')
;(async () => {
	try {
		await ShowAuthorizedPaymentDetails('6KA164545J578921F')
	} catch (error) {
		console.error(error)
	}
})()
