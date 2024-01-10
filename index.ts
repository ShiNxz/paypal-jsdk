// Typs
export * from './@types'
import Config from './config'
import Init from './functions/Init'

// Utils
export * from './utils'
import Utils from './utils'

// Functions
export * from './functions/Tracking'
import Tracking from './functions/Tracking'

export * from './functions/Products'
import Products from './functions/Products'

export * from './functions/Plans'
import Plans from './functions/Plans'

export * from './functions/Subscriptions'
import Subscriptions from './functions/Subscriptions'

export * from './functions/Payments'
import Payments from './functions/Payments'

export * from './functions/Orders'
import Orders from './functions/Orders'

export * from './functions/Webhooks'
import Webhooks from './functions/Webhooks'

export { Config, Init, Tracking, Products, Plans, Subscriptions, Payments, Orders, Webhooks, Utils }

export default {
	config: Config,
	init: Init,
	tracking: Tracking,
	products: Products,
	plans: Plans,
	subscriptions: Subscriptions,
	payments: Payments,
	orders: Orders,
	webhooks: Webhooks,
	utils: Utils,
}
