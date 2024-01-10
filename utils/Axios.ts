import GetPayPalAccessToken from './AccessToken'
import config from '../config'
import axios from 'axios'

export const baseURL = config.mode === 'SANDBOX' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com'

const Paypal = axios.create({
	baseURL: baseURL + '/v1',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

export const PaypalV2 = axios.create({
	baseURL: baseURL + '/v2',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

Paypal.interceptors.request.use(async (config) => {
	try {
		const token = await GetPayPalAccessToken()
		config.headers.Authorization = `Bearer ${token}`

		return config
	} catch (error) {
		console.log(error)
		return config
	}
})

PaypalV2.interceptors.request.use(async (config) => {
	try {
		const token = await GetPayPalAccessToken()
		config.headers.Authorization = `Bearer ${token}`

		return config
	} catch (error) {
		console.log(error)
		return config
	}
})

export default Paypal
