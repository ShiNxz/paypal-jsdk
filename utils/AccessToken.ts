import axios from 'axios'
import config from '../config'

const baseURL = config.mode === 'SANDBOX' ? 'https://api-m.sandbox.paypal.com/' : 'https://api-m.paypal.com/'

const GetPayPalAccessToken = async () => {
	try {
		const options = {
			url: baseURL + 'v1/oauth2/token',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Accept-Language': 'en_US',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			auth: {
				username: config.clientId,
				password: config.clientSecret,
			},
			params: {
				grant_type: 'client_credentials',
			},
		}

		const { data } = await axios(options)

		return data.access_token as string
	} catch (error) {
		console.log(error)
		return new Error('Error getting PayPal access token')
	}
}

export default GetPayPalAccessToken
