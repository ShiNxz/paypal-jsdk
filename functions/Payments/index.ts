import CapturePayment from './CapturePayment'
import ReauthorizePayment from './ReauthorizePayment'
import ShowRefundDetails from './RefundDetails'
import RefundCapturedPayment from './RefundPayment'
import CancelPayment from './CancelPayment'
import ShowCapturedPaymentDetails from './ShowCapturedDetails'
import ShowPaymentDetails from './ShowPaymentDetails'

export {
	ShowPaymentDetails,
	CapturePayment,
	ReauthorizePayment,
	ShowRefundDetails,
	RefundCapturedPayment,
	CancelPayment,
	ShowCapturedPaymentDetails,
}

export default {
	details: ShowPaymentDetails,
	capture: CapturePayment,
	reauthorize: ReauthorizePayment,
	refundDetails: ShowRefundDetails,
	refundCaptured: RefundCapturedPayment,
	capturedDetails: ShowCapturedPaymentDetails,
	cancel: CancelPayment,
}
