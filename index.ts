import * as Types from './@types'
export * as Types from './@types'
import Config from './config'
import Init from './Init'

// Tracking
import Tracking from './functions/Tracking'
export * from './functions/Tracking'
import AddTracking from './functions/Tracking/AddTracking'
import EditTracking from './functions/Tracking/EditTracking'
import ShowTrackingInformation from './functions/Tracking/ShowTracking'

// Catalog Products
import Products from './functions/CatalogProducts'
import CreateProduct from './functions/CatalogProducts/CreateProduct'
import ListProducts from './functions/CatalogProducts/ListProducts'
import ProductDetails from './functions/CatalogProducts/ProductDetails'

// Plans
export { default as Plans } from './functions/Plans'
import Plans from './functions/Plans'

// Subscriptions
import Subscriptions from './functions/Subscriptions'
import ActivateSubscription from './functions/Subscriptions/ActivateSubscription'
import CancelSubscription from './functions/Subscriptions/CancelSubscription'
import CapturePayment from './functions/Subscriptions/CapturePayment'
import CreateSubscription from './functions/Subscriptions/CreateSubscription'
import ListTransactions from './functions/Subscriptions/ListTransactions'
import RevisePlan from './functions/Subscriptions/RevisePlan'
import ShowSubscriptionDetails from './functions/Subscriptions/ShowSubscriptionDetails'
import SuspendSubscription from './functions/Subscriptions/SuspendSubscription'

// Payments
import Payments from './functions/Payments'
import ShowAuthorizedPaymentDetails from './functions/Payments/ShowAuthorizedPaymentDetails'

export {
	Config,
	Init,
	// Tracking
	Tracking,
	AddTracking,
	EditTracking,
	ShowTrackingInformation,
	// Catalog Products
	Products,
	CreateProduct,
	ListProducts,
	ProductDetails,
	// Subscriptions
	Subscriptions,
	ActivateSubscription,
	CancelSubscription,
	CapturePayment,
	CreateSubscription,
	ListTransactions,
	RevisePlan,
	ShowSubscriptionDetails,
	SuspendSubscription,
	// Payments
	Payments,
	ShowAuthorizedPaymentDetails,
	// Types
}

export default {
	config: Config,
	init: Init,
	tracking: Tracking,
	products: Products,
	plans: Plans,
	subscriptions: Subscriptions,
	payments: Payments,
	types: Types,
}
