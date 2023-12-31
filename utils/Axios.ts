import axios from 'axios'
import GetPayPalAccessToken from './AccessToken'
import config from '../config'

export const baseURL = config.mode === 'SANDBOX' ? 'https://api-m.sandbox.paypal.com/v1' : 'https://api-m.paypal.com/v1'
export const baseURLV2 =
	config.mode === 'SANDBOX' ? 'https://api-m.sandbox.paypal.com/v2' : 'https://api-m.paypal.com/v2'

const Paypal = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

export const PaypalV2 = axios.create({
	baseURL: baseURLV2,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

Paypal.interceptors.request.use(async (config) => {
	try {
		const token = await GetPayPalAccessToken('v1')
		config.headers.Authorization = `Bearer ${token}`

		return config
	} catch (error) {
		console.log(error)
		return config
	}
})

PaypalV2.interceptors.request.use(async (config) => {
	try {
		const token = await GetPayPalAccessToken('v1')
		console.log({ token })
		config.headers.Authorization = `Bearer ${token}`

		return config
	} catch (error) {
		console.log(error)
		return config
	}
})

export default Paypal
