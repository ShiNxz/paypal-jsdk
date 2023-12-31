import config from './config'

const Init = (clientId: string, clientSecret: string, mode: 'LIVE' | 'SANDBOX') => {
	config.clientId = clientId
	config.clientSecret = clientSecret
	config.mode = mode
}

export default Init
