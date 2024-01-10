import CreateOrder from './Create'
import ShowOrderDetails from './ShowDetails'
import ConfirmOrder from './ConfirmOrder'
import AuthorizeOrderPayment from './AuthorizePayment'
import CaptureOrderPayment from './CapturePayment'
import AddOrderTracking from './AddTracking'

export { CreateOrder, ShowOrderDetails, ConfirmOrder, AuthorizeOrderPayment, CaptureOrderPayment, AddOrderTracking }

export default {
	create: CreateOrder,
	showDetails: ShowOrderDetails,
	confirm: ConfirmOrder,
	authorizePayment: AuthorizeOrderPayment,
	capturePayment: CaptureOrderPayment,
	addTracking: AddOrderTracking,
}
