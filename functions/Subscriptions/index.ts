import ActivateSubscription from './ActivateSubscription'
import CancelSubscription from './CancelSubscription'
import CaptureSubPayment from './CapturePayment'
import CreateSubscription from './CreateSubscription'
import ListTransactions from './ListTransactions'
import RevisePlan from './RevisePlan'
import ShowSubscriptionDetails from './ShowSubscriptionDetails'
import SuspendSubscription from './SuspendSubscription'

export {
	ActivateSubscription,
	CancelSubscription,
	CaptureSubPayment,
	CreateSubscription,
	ListTransactions,
	RevisePlan,
	ShowSubscriptionDetails,
	SuspendSubscription,
}

export default {
	activate: ActivateSubscription,
	cancel: CancelSubscription,
	capturePayment: CaptureSubPayment,
	create: CreateSubscription,
	listTransactions: ListTransactions,
	revisePlan: RevisePlan,
	showDetails: ShowSubscriptionDetails,
	suspend: SuspendSubscription,
}
