import dotenv from 'dotenv'
dotenv.config()

const config: Config = {
	clientId: process.env.PAYPAL_CLIENT_ID || '',
	clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
	mode: (process.env.PAYPAL_MODE as Config['mode']) || 'LIVE',
}

export interface Config {
	clientId: string
	clientSecret: string
	mode: 'LIVE' | 'SANDBOX'
}

export default config
