export * from './@types'
import Config from './config'
import Init from './functions/Init'

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

export { Config, Init, Tracking, Products, Plans, Subscriptions, Payments }

export default {
	config: Config,
	init: Init,
	tracking: Tracking,
	products: Products,
	plans: Plans,
	subscriptions: Subscriptions,
	payments: Payments,
}
