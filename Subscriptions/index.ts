import ActivateSubscription from './ActivateSubscription'
import CancelSubscription from './CancelSubscription'
import CapturePayment from './CapturePayment'
import CreateSubscription from './CreateSubscription'
import ListTransactions from './ListTransactions'
import RevisePlan from './RevisePlan'
import ShowSubscriptionDetails from './ShowSubscriptionDetails'
import SuspendSubscription from './SuspendSubscription'

export {
	ActivateSubscription,
	CancelSubscription,
	CapturePayment,
	CreateSubscription,
	ListTransactions,
	RevisePlan,
	ShowSubscriptionDetails,
	SuspendSubscription,
}

export default {
	activateSubscription: ActivateSubscription,
	cancelSubscription: CancelSubscription,
	capturePayment: CapturePayment,
	createSubscription: CreateSubscription,
	listTransactions: ListTransactions,
	revisePlan: RevisePlan,
	showSubscriptionDetails: ShowSubscriptionDetails,
	suspendSubscription: SuspendSubscription,
}
