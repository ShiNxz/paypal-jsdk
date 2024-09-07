import { getConfig } from '../config'
import GetPayPalAccessToken from './AccessToken'
import axios, { Method } from 'axios'

export const baseURL = () =>
	getConfig().mode === 'SANDBOX' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com'

const Paypal = axios.create({
	baseURL: baseURL() + '/v1',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

export const PaypalV2 = axios.create({
	baseURL: baseURL() + '/v2',
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

// Axios instance that always up to date
export const Axios = async <T>(url: string, method: Method, body?: object) => {
	const token = await GetPayPalAccessToken()
	return await axios<T>(`${baseURL()}${url}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: body,
		method,
	})
}

export default Paypal
