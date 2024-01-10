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
	activate: ActivateSubscription,
	cancel: CancelSubscription,
	capturePayment: CapturePayment,
	create: CreateSubscription,
	listTransactions: ListTransactions,
	revisePlan: RevisePlan,
	showDetails: ShowSubscriptionDetails,
	suspend: SuspendSubscription,
}
