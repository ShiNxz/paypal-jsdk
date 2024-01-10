import GetPayPalAccessToken from './AccessToken'
import PaypalV1, { PaypalV2 } from './Axios'

export { GetPayPalAccessToken, PaypalV1, PaypalV2 }

export default {
	getAccessToken: GetPayPalAccessToken,
	fetchV1: PaypalV1,
	fetchV2: PaypalV2,
}
