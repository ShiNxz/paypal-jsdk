import { Method } from 'axios';
import { z } from 'zod';

interface AuthorizedPayment {
    /**
     * The status of the authorized payment.
     */
    status?: AuthorizationStatus;
    /**
     * The details of the authorized order pending status.
     */
    status_details?: StatusDetails;
    /**
     * The PayPal-generated ID for the authorized payment.
     */
    id?: string;
    /**
     * The API caller-provided external invoice number for this order.
     * Appears in both the payer's transaction history and the emails that the payer receives.
     */
    invoiceId?: string;
    /**
     * The API caller-provided external ID.
     * Used to reconcile API caller-initiated transactions with PayPal transactions.
     * Appears in transaction and settlement reports.
     */
    customId?: string;
    /**
     * An array of related HATEOAS links.
     */
    links?: Link[];
    /**
     * The amount for this authorized payment.
     */
    amount?: AmountPrice;
    /**
     * Reference values used by the card network to identify a transaction.
     */
    network_transaction_reference?: NetworkTransactionReference;
    /**
     * The level of protection offered as defined by PayPal Seller Protection for Merchants.
     * @see https://www.paypal.com/us/webapps/mpp/security/seller-protection?_ga=2.65763566.1795084420.1703891260-1944583344.1698732461
     */
    seller_protection?: SellerProtection;
    /**
     * The date and time when the authorized payment expires, in Internet date and time format.
     * It follows the pattern ^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|...
     */
    expiration_time?: string;
    /**
     * The date and time when the transaction occurred, in Internet date and time format.
     * It follows the pattern ^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|...
     */
    create_time?: string;
    /**
     * The date and time when the transaction was last updated, in Internet date and time format.
     * It follows the pattern ^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|...
     */
    update_time?: string;
    /**
     * An object that provides supplementary/additional data related to a payment transaction.
     */
    supplementary_data?: SupplementaryData;
    /**
     * The details associated with the merchant for this transaction.
     */
    payee?: Payee;
}
/**
 * Reference values used by the card network to identify a transaction.
 */
interface NetworkTransactionReference {
    /**
     * @required
     * Transaction reference id returned by the scheme. For Visa and Amex, this is the "Tran id" field in response.
     * For MasterCard, this is the "BankNet reference id" field in response.
     * For Discover, this is the "NRID" field in response. The pattern we expect for this field from Visa/Amex/CB/Discover is numeric,
     * Mastercard/BNPP is alphanumeric and Paysecure is alphanumeric with special character -.
     */
    id: string;
    /**
     * The date that the transaction was authorized by the scheme.
     * This field may not be returned for all networks.
     * MasterCard refers to this field as "BankNet reference date.
     */
    date?: string;
    /**
     * Reference ID issued for the card transaction. This ID can be used to track the transaction across processors, card brands and issuing banks.
     */
    acquirer_reference_number?: string;
    /**
     * Name of the card network through which the transaction was routed.
     */
    network?: CardNetwork;
}
interface Payee {
    /**
     * The email address of merchant.
     */
    email_address?: string;
    /**
     * The encrypted PayPal account ID of the merchant.
     */
    merchant_id?: string;
}
interface SupplementaryData {
    related_ids?: RelatedIds;
}
interface RelatedIds {
    /**
     * Order ID related to the resource.
     */
    order_id?: string;
    /**
     * Authorization ID related to the resource.
     */
    authorization_id?: string;
    /**
     * Capture ID related to the resource.
     */
    capture_id?: string;
}
/**
 * @required
 * - ELIGIBLE: Your PayPal balance remains intact if the customer claims that they did not receive an item or the account holder claims that they did not authorize the payment.
 * - PARTIALLY_ELIGIBLE: Your PayPal balance remains intact if the customer claims that they did not receive an item.
 * - NOT_ELIGIBLE: This transaction is not eligible for seller protection.
 */
type SellerProtectionStatus = 'ELIGIBLE' | 'PARTIALLY_ELIGIBLE' | 'NOT_ELIGIBLE';
interface SellerProtection {
    /**
     * Indicates whether the transaction is eligible for seller protection.
     */
    status?: SellerProtectionStatus;
    /**
     * An array of conditions that are covered for the transaction.
     */
    dispute_categories?: string[];
}
/**
 * The status for the authorized payment.
 * @required
 * - CREATED:	The authorized payment is created. No captured payments have been made for this authorized payment.
 * - CAPTURED:	The authorized payment has one or more captures against it. The sum of these captured payments is greater than the amount of the original authorized payment.
 * - DENIED:	PayPal cannot authorize funds for this authorized payment.
 * - PARTIALLY_CAPTURED:	A captured payment was made for the authorized payment for an amount that is less than the amount of the original authorized payment.
 * - VOIDED:	The authorized payment was voided. No more captured payments can be made against this authorized payment.
 * - PENDING:	The created authorization is in a pending state.
 */
type AuthorizationStatus = 'CREATED' | 'CAPTURED' | 'DENIED' | 'PARTIALLY_CAPTURED' | 'VOIDED' | 'PENDING';
/**
 * @required
 * Represents the Card Network type.
 */
type CardNetwork = 'VISA' | 'MASTER' | 'DISCOVER' | 'AMEX' | 'SOLO' | 'JCB' | 'STAR' | 'DELTA' | 'SWITCH' | 'MAESTRO' | 'CB_NATIONALE' | 'CONFIGOGA' | 'CONFIDIS' | 'ELECTRON' | 'CETELEM' | 'CHINA_UNION_PAY';
interface StatusDetails {
    /**
     * The reason why the authorized status is PENDING.
     * Values can be:
     * - PENDING_REVIEW: Authorization is pending manual review.
     */
    reason?: 'PENDING_REVIEW';
}

declare const PlansQuery$1: z.ZodOptional<z.ZodObject<{
    product_id: z.ZodOptional<z.ZodString>;
    plan_ids: z.ZodOptional<z.ZodString>;
    page_size: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
    total_required: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    product_id?: string | undefined;
    plan_ids?: string | undefined;
    page_size?: number | undefined;
    page?: number | undefined;
    total_required?: boolean | undefined;
}, {
    product_id?: string | undefined;
    plan_ids?: string | undefined;
    page_size?: number | undefined;
    page?: number | undefined;
    total_required?: boolean | undefined;
}>>;

interface ListPlansType {
    /**
     * An array of plans.
     */
    plans: CreatedPlan[];
    /**
     * The total number of items.
     */
    total_items: number;
    /**
     * The total number of pages.
     */
    total_pages: number;
    /**
     * The HATEOAS links related to this call, including the self link.
     * @link https://developer.paypal.com/docs/api/reference/api-responses/#hateoas-links
     */
    links: Link[];
}
interface PlanBody {
    /**
     * The ID of the product created through Catalog Products API.
     * @required
     */
    product_id: string;
    /**
     * The plan name.
     * @required
     */
    name: string;
    /**
     * The plan status.
     */
    status?: PlanStatus;
    /**
     * The detailed description of the plan.
     */
    description?: string;
    /**
     * The detailed description of the plan.
     * @required
     */
    billing_cycles: PlanBillingCycle[];
    /**
     * Indicates whether you can subscribe to this plan by providing a quantity for the goods or service.
     * @default false
     */
    quantity_supported?: boolean;
    /**
     * The payment preferences for a subscription.
     * @required
     */
    payment_preferences: PaymentPreferences;
}
interface CreatedPlan extends PlanBody {
    /**
     * The unique PayPal-generated ID for the plan.
     */
    id: string;
    /**
     * An array of request-related HATEOAS links.
     * @link https://developer.paypal.com/docs/api/reference/api-responses/#hateoas-links
     */
    links: Link[];
    /**
     * The tax details.
     */
    taxes: Taxes;
    /**
     * he date and time when the plan was created, in Internet date and time format.
     * @link https://tools.ietf.org/html/rfc3339#section-5.6
     */
    create_time: string;
    /**
     * The date and time when the plan was last updated, in Internet date and time format.
     * @link https://tools.ietf.org/html/rfc3339#section-5.6
     */
    update_time: string;
}
/**
 * CANCEL: Cancels the subscription if the initial payment for the setup fails.
 * CONTINUE: Continues the subscription if the initial payment for the setup fails.
 */
type SetupFeeFailureAction = 'CANCEL' | 'CONTINUE';
interface PaymentPreferences {
    /**
     * Indicates whether to automatically bill the outstanding amount in the next billing cycle.
     * @default true
     */
    auto_bill_outstanding?: boolean;
    /**
     * The action to take on the subscription if the initial payment for the setup fails.
     * @default CANCEL
     */
    setup_fee_failure_action?: SetupFeeFailureAction;
    /**
     * The maximum number of payment failures before a subscription is suspended.
     * For example, if payment_failure_threshold is 2, the subscription automatically updates to the SUSPEND state if two consecutive payments fail.
     * @default 0
     */
    payment_failure_threshold?: number;
    setup_fee?: AmountPrice;
}
declare enum PlanStatus {
    /**
     * The plan was created. You cannot create subscriptions for a plan in this state.
     */
    'CREATED' = "CREATED",
    /**
     * The plan is inactive.
     */
    'INACTIVE' = "INACTIVE",
    /**
     * The plan is active. You can only create subscriptions for a plan in this state.
     */
    'ACTIVE' = "ACTIVE"
}
interface PlanBillingCycle {
    /**
     * The tenure type of the billing cycle. In case of a plan having trial cycle, only 2 trial cycles are allowed per plan.
     */
    tenure_type: 'REGULAR' | 'TRIAL';
    /**
     * The order in which this cycle is to run among other billing cycles.
     * For example, a trial billing cycle has a sequence of 1 while a regular billing cycle has a sequence of 2, so that trial cycle runs before the regular cycle.
     */
    sequence: number;
    /**
     * The number of times this billing cycle gets executed.
     * Trial billing cycles can only be executed a finite number of times (value between 1 and 999 for total_cycles).
     * Regular billing cycles can be executed infinite times (value of 0 for total_cycles) or a finite number of times (value between 1 and 999 for total_cycles).
     * @default 0
     */
    total_cycles?: number;
    /**
     * The active pricing scheme for this billing cycle. A free trial billing cycle does not require a pricing scheme.
     */
    pricing_scheme?: PricingScheme;
    /**
     * The frequency details for this billing cycle.
     */
    frequency: Frequency;
}
interface PricingScheme {
    /**
     * The pricing model for tiered plan. The tiers parameter is required.
     */
    pricing_model?: PricingSchemeModel;
    /**
     * An array of pricing tiers which are used for billing volume/tiered plans. pricing_model field has to be specified.
     */
    tiers?: PricingSchemeTier[];
    /**
     * The fixed amount to charge for the subscription.
     * The changes to fixed amount are applicable to both existing and future subscriptions.
     * For existing subscriptions, payments within 10 days of price change are not affected.
     */
    fixed_price?: AmountPrice;
}
declare enum PricingSchemeModel {
    /**
     * A volume pricing model.
     */
    'VOLUME' = "VOLUME",
    /**
     * A tiered pricing model.
     */
    'TIERED' = "TIERED"
}
interface PricingSchemeTier {
    /**
     * The starting quantity for the tier.
     * @required
     */
    starting_quantity: string;
    /**
     * The ending quantity for the tier. Optional for the last tier.
     */
    ending_quantity?: string;
    /**
     * The pricing amount for the tier.
     * @required
     */
    price: AmountPrice;
}
type PlansQuery = z.infer<typeof PlansQuery$1>;

interface Product {
    /**
     * The ID of the product. You can specify the SKU for the product.
     * If you omit the ID, the system generates it.
     * System-generated IDs have the PROD- prefix.
     * @optional
     */
    id?: string;
    /**
     * The product name.
     * @required
     */
    name: string;
    /**
     * The product description.
     * @optional
     */
    description?: string;
    /**
     * The product type.
     * Indicates whether the product is physical or digital goods, or a service.
     * @required
     * @default PHYSICAL
     */
    type: ProductType;
    /**
     * The product category.
     * @see https://developer.paypal.com/docs/api/catalog-products/v1/#products_create!path=category&t=request
     * @optional
     */
    category?: string;
    /**
     * The image URL for the product.
     * @optional
     */
    image_url?: string;
    /**
     * The home page URL for the product.
     * @optional
     */
    home_url?: string;
}
interface ProductResponse extends Partial<Product> {
    /**
     * An array of request-related [HATEOAS links](https://developer.paypal.com/docs/api/overview/#hateoas-links).
     */
    links?: Link[];
    /**
     * The date and time when the product was created, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6).
     */
    create_time: string;
    /**
     * The date and time when the product was last updated, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6).
     */
    update_time: string;
}
type ProductList = ProductResponse[];
interface Query {
    /**
     * The number of items to return in the response.
     * @default: 10
     */
    page_size?: number;
    /**
     * A non-zero integer which is the start index of the entire list of items that are returned in the response.
     * So, the combination of `page=1` and `page_size=20` returns the first 20 items.
     * The combination of `page=2` and `page_size=20` returns the next 20 items.
     * @default: 1
     */
    page?: number;
    /**
     * Indicates whether to show the total items and total pages in the response.
     * @default: false
     */
    total_required?: boolean;
}
interface Response {
    products: ProductList;
    links: Link[];
    total_items: number;
    total_pages: number;
}
/**
 * - PHYSICAL Physical goods.
 * - DIGITAL For digital goods, the value must be set to DIGITAL to get the best rates. For more details, please contact your account manager.
 * - SERVICE A service. For example, technical support.
 */
type ProductType = 'PHYSICAL' | 'DIGITAL' | 'SERVICE';

interface CreateSubscriptionBody {
    /**
     * The quantity of the product in the subscription.
     */
    quantity?: string;
    /**
     * Indicates whether the subscription auto-renews after the billing cycles complete.
     * @default false
     * @DEPRECATED
     */
    auto_renewal?: boolean;
    /**
     * The custom id for the subscription. Can be invoice id.
     */
    custom_id?: string;
    /**
     * The date and time when the subscription started, in Internet date and time format.
     * @default "Current time"
     */
    start_time?: string;
    /**
     * The shipping charges.
     */
    shipping_amount?: AmountPrice;
    /**
     * The subscriber request information .
     */
    subscriber?: {
        /**
         * The email address of the payer.
         */
        email_address?: string;
        /**
         * The name of the payer. Supports only the given_name and surname properties.
         */
        name?: Name;
    };
    /**
     * The phone number of the customer.
     * Available only when you enable the Contact Telephone Number option in the Profile & Settings for the merchant's PayPal account.
     * The phone.phone_number supports only national_number.
     * @see https://www.paypal.com/cgi-bin/customerprofileweb?cmd=_profile-website-payments&_ga=2.70891984.1795084420.1703891260-1944583344.1698732461
     */
    phone?: {
        /**
         * The phone type.
         */
        phone_type?: 'FAX' | 'HOME' | 'MOBILE' | 'OTHER' | 'PAGER';
        /**
         * The phone number, in its canonical international E.164 numbering plan format.
         * Supports only the national_number property.
         * @see https://www.itu.int/rec/T-REC-E.164/en
         */
        phone_number: {
            /**
             * The national number, in its canonical international E.164 numbering plan format.
             * The combined length of the country calling code (CC) and the national number must not be greater than 15 digits.
             * The national number consists of a national destination code (NDC) and subscriber number (SN).
             * @see https://www.itu.int/rec/T-REC-E.164/en
             */
            national_number: string;
        };
    };
    /**
     * The shipping details.
     */
    shipping_address?: {
        /**
         * The method by which the payer wants to get their items from the payee e.g shipping, in-person pickup.
         * Either type or options but not both may be present.
         * - SHIPPING - The payer intends to receive the items at a specified address.
         * - PICKUP_IN_PERSON - The payer intends to pick up the items from the payee in person.
         */
        type?: 'SHIPPING' | 'PICKUP_IN_PERSON';
        /**
         * The name of the person to whom to ship the items. Supports only the full_name property.
         */
        name?: Name;
        /**
         * The address of the person to whom to ship the items.
         * Supports only the address_line_1, address_line_2, admin_area_1, admin_area_2, postal_code, and country_code properties.
         */
        address?: Address;
        /**
         * The payment source definition.
         * To be eligible to create subscription using debit or credit card, you will need to sign up here (https://www.paypal.com/bizsignup/entry/product/ppcp).
         * Please note, its available only for non-3DS cards and for merchants in US and AU regions.
         * @see https://www.paypal.com/bizsignup/entry/product/ppcp?_ga=2.170497376.1795084420.1703891260-1944583344.1698732461
         */
        payment_source?: {
            /**
             * The payment card to use to fund a payment. Can be a credit or debit card.
             */
            card?: Card;
        };
    };
    /**
     * The application context, which customizes the payer experience during the subscription approval process with PayPal.
     */
    application_context?: ApplicationContext;
    /**
     * An inline plan object to customise the subscription. You can override plan level default attributes by providing customised values for the subscription in this object.
     */
    plan?: {
        billing_cycles: PlanBillingCycle;
        payment_preferences: PaymentPreferences;
        taxes: Taxes;
    };
}
interface ApplicationContext {
    /**
     * The label that overrides the business name in the PayPal account on the PayPal site.
     */
    brand_name?: string;
    /**
     * The location from which the shipping address is derived.
     * - GET_FROM_FILE - Get the customer-provided shipping address on the PayPal site.
     * - NO_SHIPPING - Redacts the shipping address from the PayPal site. Recommended for digital goods.
     * - SET_PROVIDED_ADDRESS - Get the merchant-provided address. The customer cannot change this address on the PayPal site. If merchant does not pass an address, customer can choose the address on PayPal pages.
     */
    shipping_preference?: 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS';
    /**
     * Configures the label name to Continue or Subscribe Now for subscription consent experience.
     * - CONTINUE - After you redirect the customer to the PayPal subscription consent page, a Continue button appears. Use this option when you want to control the activation of the subscription and do not want PayPal to activate the subscription.
     * - SUBSCRIBE_NOW - After you redirect the customer to the PayPal subscription consent page, a Subscribe Now button appears. Use this option when you want PayPal to activate the subscription.
     */
    user_action?: 'CONTINUE' | 'SUBSCRIBE_NOW';
    /**
     * The URL where the customer is redirected after the customer approves the payment.
     * @required
     */
    return_url: string;
    /**
     * The URL where the customer is redirected after the customer cancels the payment.
     * @required
     */
    cancel_url: string;
    /**
     * The BCP 47-formatted locale of pages that the PayPal payment experience shows.
     * PayPal supports a five-character code.
     * @example, da-DK, he-IL, id-ID, ja-JP, no-NO, pt-BR, ru-RU, sv-SE, th-TH, zh-CN, zh-HK, or zh-TW.
     */
    locale?: string;
    /**
     * The customer and merchant payment preferences.
     * Currently only PAYPAL payment method is supported.
     */
    payment_method?: {
        /**
         * The customer-selected payment method on the merchant site.
         */
        payer_selected?: string;
        /**
         * The merchant-preferred payment methods.
         * - UNRESTRICTED - Accepts any type of payment from the customer.
         * - IMMEDIATE_PAYMENT_REQUIRED - Accepts only immediate payment from the customer. For example, credit card, PayPal balance, or instant ACH. Ensures that at the time of capture, the payment does not have the pending status.
         */
        payee_preferred?: 'UNRESTRICTED' | 'IMMEDIATE_PAYMENT_REQUIRED';
    };
}
interface ReviseSubscriptionBody {
    quantity?: string;
    shipping_amount?: AmountPrice;
    shipping_address?: {
        /**
         * The method by which the payer wants to get their items from the payee e.g shipping, in-person pickup.
         * Either type or options but not both may be present.
         * - SHIPPING - The payer intends to receive the items at a specified address.
         * - PICKUP_IN_PERSON - The payer intends to pick up the items from the payee in person.
         */
        type?: 'SHIPPING' | 'PICKUP_IN_PERSON';
        /**
         * The name of the person to whom to ship the items. Supports only the full_name property.
         */
        name?: Name;
        /**
         * The address of the person to whom to ship the items.
         * Supports only the address_line_1, address_line_2, admin_area_1, admin_area_2, postal_code, and country_code properties.
         */
        address?: Address;
    };
    application_context?: ApplicationContext;
    plan?: {
        billing_cycles: PlanBillingCycle;
        payment_preferences: PaymentPreferences;
        taxes: Taxes;
    };
}
interface Card {
    /**
     * The card holder's name as it appears on the card.
     */
    name?: string;
    /**
     * The primary account number (PAN) for the payment card.
     * @required
     */
    number: string;
    /**
     * The three- or four-digit security code of the card.
     * Also known as the CVV, CVC, CVN, CVE, or CID.
     * This parameter cannot be present in the request when payment_initiator=MERCHANT.
     */
    security_code?: string;
    /**
     * The card expiration year and month, in Internet date format.
     * @see https://tools.ietf.org/html/rfc3339#section-5.6
     */
    expiry: string;
    /**
     * The billing address for this card. Supports only the address_line_1, address_line_2, admin_area_1, admin_area_2, postal_code, and country_code properties.
     */
    billing_address?: Address;
}
interface Name {
    /**
     * When the party is a person, the party's given, or first, name.
     */
    given_name?: string;
    /**
     * When the party is a person, the party's surname or family name.
     * Also known as the last name.
     * Required when the party is a person.
     * Use also to store multiple surnames including the matronymic, or mother's, surname.
     */
    surname?: string;
}
/**
 * - APPROVAL_PENDING The subscription is created but not yet approved by the buyer.
 * - APPROVED The buyer has approved the subscription.
 * - ACTIVE The subscription is active.
 * - SUSPENDED The subscription is suspended.
 * - CANCELLED The subscription is cancelled.
 * - EXPIRED The subscription is expired.
 */
type SubscriptionStatus = 'APPROVAL_PENDING' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';
interface CreatedSubscription {
    /**
     * The status of the subscription.
     */
    status?: SubscriptionStatus;
    /**
     * The reason or notes for the status of the subscription.
     */
    status_change_note?: string;
    /**
     * The date and time, in Internet date and time format. Seconds are required while fractional seconds are optional.
     */
    status_update_time?: string;
    /**
     * The PayPal-generated ID for the subscription.
     */
    id?: string;
    /**
     * The ID of the plan.
     */
    plan_id?: string;
    /**
     * The quantity of the product in the subscription.
     */
    quantity?: string;
    /**
     * The custom id for the subscription. Can be invoice id.
     */
    custom_id?: string;
    /**
     * Indicates whether the subscription has overridden any plan attributes.
     */
    plan_overridden?: boolean;
    /**
     * An array of request-related HATEOAS links.
     * @see https://developer.paypal.com/docs/api/reference/api-responses/#hateoas-links
     */
    links?: Link[];
    /**
     * The date and time, in Internet date and time format.
     * Seconds are required while fractional seconds are optional.
     * @note The regular expression provides guidance but does not reject all invalid dates.
     * @see https://tools.ietf.org/html/rfc3339#section-5.6
     */
    start_time?: string;
    /**
     * The currency and amount for a financial transaction, such as a balance or payment due.
     */
    shipping_amount?: AmountPrice;
    /**
     * The subscriber response information.
     */
    subscriber?: CreateSubscriptionBody['subscriber'];
    /**
     * The billing details for the subscription. If the subscription was or is active, these fields are populated.
     */
    billing_info?: BillingInfo;
    /**
     * The date and time, in Internet date and time format.
     * Seconds are required while fractional seconds are optional.
     * @see https://tools.ietf.org/html/rfc3339#section-5.6
     */
    create_time?: string;
    /**
     * The date and time, in Internet date and time format.
     * Seconds are required while fractional seconds are optional.
     * @see https://tools.ietf.org/html/rfc3339#section-5.6
     */
    update_time?: string;
    /**
     * Inline plan details.
     */
    plan?: PlanBody;
    /**
     * The payment & subscription link.
     */
    paymentUrl: string | null;
}
interface BillingInfo {
    /**
     * The trial and regular billing executions.
     */
    cycle_executions?: CycleExecution[];
    /**
     * The number of consecutive payment failures.
     * Resets to 0 after a successful payment.
     * If this reaches the payment_failure_threshold value, the subscription updates to the SUSPENDED state.
     */
    failed_payments_count: number;
    /**
     * The total pending bill amount, to be paid by the subscriber.
     */
    outstanding_balance: AmountPrice;
    /**
     * The details for the last payment of the subscription.
     */
    last_payment?: Payment;
    /**
     * The next date and time for billing this subscription, in Internet date and time format.
     * @see https://tools.ietf.org/html/rfc3339#section-5.6
     */
    next_billing_time?: string;
    /**
     * The date and time when the final billing cycle occurs, in Internet date and time format.
     * @see https://tools.ietf.org/html/rfc3339#section-5.6
     */
    final_payment_time: string;
    /**
     * The details for the last failed payment of the subscription.
     */
    last_failed_payment: FailedPayment;
}
/**
 * - COMPLETED: The funds for this captured payment were credited to the payee's PayPal account.
 * - DECLINED: The funds could not be captured.
 * - PARTIALLY_REFUNDED: An amount less than this captured payment's amount was partially refunded to the payer
 * - PENDING: The funds for this captured payment was not yet credited to the payee's PayPal account. For more information, see status.details.
 * - REFUNDED: An amount greater than or equal to this captured payment's amount was refunded to the payer.
 */
type PaymentStatus = 'COMPLETED' | 'DECLINED' | 'PARTIALLY_REFUNDED' | 'PENDING' | 'REFUNDED';
interface Payment {
    /**
     * The status of the captured payment.
     */
    status?: PaymentStatus;
    /**
     * The last payment amount.
     */
    amount: AmountPrice;
    /**
     * The date and time when the last payment was made, in Internet date and time format.
     * @see https://tools.ietf.org/html/rfc3339#section-5.6
     */
    time: string;
}
/**
 * - PAYMENT_DENIED PayPal declined the payment due to one or more customer issues.
 * - INTERNAL_SERVER_ERROR An internal server error has occurred.
 * - PAYEE_ACCOUNT_RESTRICTED The payee account is not in good standing and cannot receive payments.
 * - PAYER_ACCOUNT_RESTRICTED The payer account is not in good standing and cannot make payments.
 * - PAYER_CANNOT_PAY Payer cannot pay for this transaction.
 * - SENDING_LIMIT_EXCEEDED The transaction exceeds the payer's sending limit.
 * - TRANSACTION_RECEIVING_LIMIT_EXCEEDED The transaction exceeds the receiver's receiving limit.
 * - CURRENCY_MISMATCH The transaction is declined due to a currency mismatch.
 */
type ReasonCode = 'PAYMENT_DENIED' | 'INTERNAL_SERVER_ERROR' | 'PAYEE_ACCOUNT_RESTRICTED' | 'PAYER_ACCOUNT_RESTRICTED' | 'PAYER_CANNOT_PAY' | 'SENDING_LIMIT_EXCEEDED' | 'TRANSACTION_RECEIVING_LIMIT_EXCEEDED' | 'CURRENCY_MISMATCH';
interface FailedPayment {
    /**
     * The reason code for the payment failure.
     */
    reason_code: ReasonCode;
    /**
     * The failed payment amount.
     */
    amount: AmountPrice;
    /**
     * The date and time when the failed payment was made, in Internet date and time format.
     * @see https://tools.ietf.org/html/rfc3339#section-5.6
     */
    time: string;
    /**
     * The time when the retry attempt for the failed payment occurs, in Internet date and time format.
     * @see https://tools.ietf.org/html/rfc3339#section-5.6
     */
    next_payment_retry_time?: string;
}
interface CycleExecution {
    /**
     * The type of the billing cycle.
     */
    tenure_type: 'REGULAR' | 'TRIAL';
    /**
     * The order in which to run this cycle among other billing cycles.
     */
    sequence: number;
    /**
     * The number of billing cycles that have completed.
     */
    cycles_completed: number;
    /**
     * For a finite billing cycle, cycles_remaining is the number of remaining cycles. For an infinite billing cycle, cycles_remaining is set as 0.
     */
    cycles_remaining?: number;
    /**
     * The active pricing scheme version for the billing cycle
     */
    current_pricing_scheme_version?: number;
    /**
     * The number of times this billing cycle gets executed.
     * Trial billing cycles can only be executed a finite number of times (value between 1 and 999 for total_cycles).
     * Regular billing cycles can be executed infinite times (value of 0 for total_cycles) or a finite number of times (value between 1 and 999 for total_cycles).
     */
    total_cycles?: number;
}
interface CapturePaymentType {
    /**
     * The reason or note for the subscription charge.
     */
    notes: string;
    /**
     * The type of capture.
     * - OUTSTANDING_BALANCE: The outstanding balance that the subscriber must clear.
     */
    capture_type: 'OUTSTANDING_BALANCE';
    /**
     * The currency and amount for a financial transaction, such as a balance or payment due.
     */
    amount: AmountPrice;
}
interface Transaction {
    /**
     * The status of the captured payment.
     */
    status?: PaymentStatus;
    /**
     * The PayPal-generated transaction ID.
     */
    id: string;
    /**
     * The breakdown details for the amount. Includes the gross, tax, fee, and shipping amounts.
     */
    amount_with_breakdown: AmountWithBreakdown;
    /**
     * The name of the customer.
     */
    payer_name?: PayerName;
    /**
     * The email ID of the customer.
     */
    payer_email?: string;
    /**
     * The date and time when the transaction was processed, in Internet date and time format.
     * @see https://tools.ietf.org/html/rfc3339#section-5.6
     */
    time: string;
}
interface AmountWithBreakdown {
    /**
     * The amount for this transaction.
     */
    gross_amount: AmountPrice;
    /**
     * The item total for the transaction.
     */
    total_item_amount?: AmountPrice;
    /**
     * The fee details for the transaction.
     */
    fee_amount?: AmountPrice;
    /**
     * The shipping amount for the transaction.
     */
    shipping_amount?: AmountPrice;
    /**
     * The tax amount for the transaction.
     */
    tax_amount?: AmountPrice;
    /**
     * The net amount that the payee receives for this transaction in their PayPal account.
     * The net amount is computed as gross_amount minus the paypal_fee.
     */
    net_amount?: AmountPrice;
}
interface PayerName {
    /**
     * The prefix, or title, to the party's name.
     */
    prefix?: string;
    /**
     * When the party is a person, the party's given, or first, name.
     */
    given_name?: string;
    /**
     * When the party is a person, the party's surname or family name.
     * Also known as the last name.
     * Required when the party is a person.
     * Use also to store multiple surnames including the matronymic, or mother's, surname.
     */
    surname?: string;
    /**
     * When the party is a person, the party's middle name. Use also to store multiple middle names including the patronymic, or father's, middle name.
     */
    middle_name?: string;
    /**
     * The suffix for the party's name.
     */
    suffix?: string;
    /**
     * The party's alternate name. Can be a business name, nickname, or any other name that cannot be split into first, last name.
     * Required when the party is a business.
     * @DEPRECATED
     */
    alternate_full_name?: string;
    /**
     * When the party is a person, the party's full name.
     */
    full_name?: string;
}
interface ListParams {
    /**
     * The start date and time for the range of transactions to list.
     * The query uses the ISO 8601 date and time format. For example, 2019-08-20T00:00:00Z represents August 20, 2019 UTC 00:00:00.
     */
    start_time?: string;
    /**
     * The end date and time for the range of transactions to list.
     * The query uses the ISO 8601 date and time format. For example, 2019-08-20T00:00:00Z represents August 20, 2019 UTC 00:00:00.
     */
    end_time?: string;
}
interface ListResponse {
    transactions: Transaction[];
    /**
     * The total number of items.
     */
    total_items: number;
    /**
     * The total number of pages.
     */
    total_pages: number;
    /**
     * The HATEOAS links related to this call, including the next, previous, and current page links.
     * @see https://developer.paypal.com/docs/api/overview/#hateoas-links
     */
    links: Link[];
}

interface Tracker {
    /**
     * The PayPal transaction ID.
     * @required
     */
    transaction_id: string;
    /**
     * The tracking number for the shipment.
     * @optional
     */
    tracking_number?: string;
    /**
     * The name of the carrier for the shipment. Provide this value only if the carrier parameter is OTHER.
     * @optional
     */
    carrier_name_other?: string;
    /**
     * If true , sends an email notification to the buyer of the PayPal transaction. The email contains the tracking information that was uploaded through the API.
     * @optional
     * @default false
     */
    notify_buyer: boolean;
    /**
     * To denote whether the shipment is sent forward to the receiver or returned back.
     * @optional
     */
    shipment_direction: ShipmentDirection;
    /**
     * Tracking Link of the shipment.
     * @optional
     */
    tracking_url?: string;
    /**
     * The type of tracking number.
     * @optional
     */
    tracking_number_type?: TrackingNumberType;
    /**
     * The status of the item shipment.
     * For allowed values, see [Shipping Statuses](https://developer.paypal.com/docs/tracking/reference/shipping-status/).
     * @required
     */
    status: TrackingStatus;
    /**
     * The stand-alone date, in Internet date and time format.
     * To represent special legal values, such as a date of birth, you should use dates with no associated time or time-zone data.
     * Whenever possible, use the standard date_time type.
     * This regular expression does not validate all dates.
     * For example, February 31 is valid and nothing is known about leap years.
     * @optional
     */
    shipment_date?: string;
    /**
     * The carrier for the shipment.
     * Some carriers have a global version as well as local subsidiaries.
     * The subsidiaries are repeated over many countries and might also have an entry in the global list.
     * Choose the carrier for your country.
     * If the carrier is not available for your country, choose the global version of the carrier.
     * If your carrier name is not in the list, set `carrier` to `OTHER` and set carrier name in `carrier_name_other`.
     * For allowed values, see [Carriers](https://developer.paypal.com/docs/tracking/reference/carriers/).
     * @optional
     */
    carrier?: string;
    /**
     * The date and time, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6).
     * Seconds are required while fractional seconds are optional.
     */
    last_updated_time?: string;
}
/**
 * - FORWARD The shipment is sent forward to the receiver.
 * - RETURN The shipment was returned back.
 */
type ShipmentDirection = 'FORWARD' | 'RETURN';
/**
 * - CARRIER_PROVIDED A merchant-provided tracking number.
 * - E2E_PARTNER_PROVIDED A marketplace-provided tracking number.
 */
type TrackingNumberType = 'CARRIER_PROVIDED' | 'E2E_PARTNER_PROVIDED';
/**
 * - CANCELLED The shipment was cancelled and the tracking number no longer applies.
 * - DELIVERED The item was already delivered when the tracking number was uploaded.
 * - LOCAL_PICKUP Either the buyer physically picked up the item or the seller delivered the item in person without involving any couriers or postal companies.
 * - ON_HOLD The item is on hold. Its shipment was temporarily stopped due to bad weather, a strike, customs, or another reason.
 * - SHIPPED The item was shipped and is on the way.
 */
type TrackingStatus = 'CANCELLED' | 'DELIVERED' | 'LOCAL_PICKUP' | 'ON_HOLD' | 'SHIPPED';

interface PaypalWebhook {
    id: string;
    create_time: string;
    resource_type: string;
    event_type: PaypalEventType;
    summary: string;
    resource: {
        billing_agreement_id: string;
        agreement_details: {
            outstanding_balance: {
                value: string;
            };
            num_cycles_remaining: string;
            num_cycles_completed: string;
            last_payment_date: string;
            last_payment_amount: {
                value: string;
            };
            final_payment_due_date: string;
            failed_payment_count: string;
        };
        description: string;
        links: Link[];
        id: string;
        shipping_address: ShippingAddress;
        plan: {
            curr_code: string;
            links: string[];
            payment_definitions: [
                {
                    type: string;
                    frequency: 'Month' | 'Year' | 'Week' | 'Day';
                    frequency_interval: string;
                    amount: {
                        value: string;
                    };
                    cycles: string;
                    charge_models: [
                        {
                            type: string;
                            amount: {
                                value: string;
                            };
                        },
                        {
                            type: 'SHIPPING';
                            amount: {
                                value: string;
                            };
                        }
                    ];
                }
            ];
            merchant_preferences: {
                setup_fee: {
                    value: string;
                };
                auto_bill_amount: 'YES' | 'NO';
                max_fail_attempts: string;
            };
        };
        subscriber: {
            name: {
                given_name: string;
                surname: string;
            };
            email_address: string;
            shipping_address: {
                name: {
                    full_name: string;
                };
                address: Address;
            };
        };
        start_date: string;
    };
    links: Link[];
    event_version: string;
}
interface ShippingAddress {
    recipient_name: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country_code: string;
}
declare enum PaypalEventType {
    'BILLING.SUBSCRIPTION.CREATED' = "BILLING.SUBSCRIPTION.CREATED",
    'BILLING.SUBSCRIPTION.ACTIVATED' = "BILLING.SUBSCRIPTION.ACTIVATED",
    'BILLING.SUBSCRIPTION.RE-ACTIVATED' = "BILLING.SUBSCRIPTION.RE-ACTIVATED",
    'BILLING.SUBSCRIPTION.UPDATED' = "BILLING.SUBSCRIPTION.UPDATED",
    'BILLING.SUBSCRIPTION.EXPIRED' = "BILLING.SUBSCRIPTION.EXPIRED",
    'BILLING.SUBSCRIPTION.CANCELLED' = "BILLING.SUBSCRIPTION.CANCELLED",
    'BILLING.SUBSCRIPTION.SUSPENDED' = "BILLING.SUBSCRIPTION.SUSPENDED",
    'BILLING.SUBSCRIPTION.PAYMENT.FAILED' = "BILLING.SUBSCRIPTION.PAYMENT.FAILED",
    'PAYMENT.SALE.COMPLETED' = "PAYMENT.SALE.COMPLETED"
}

interface Frequency {
    /**
     * The interval at which the subscription is charged or billed.
     */
    interval_unit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
    /**
     * The number of intervals after which a subscriber is billed.
     * For example, if the interval_unit is DAY with an interval_count of 2, the subscription is billed once every two days.
     * The following table lists the maximum allowed values for the interval_count for each interval_unit:
     * - Interval unit | Maximum interval count:
     * - DAY 365
     * - WEEK 52
     * - MONTH 12
     * - YEAR 1
     * @default 1
     */
    interval_count?: number;
}
interface AmountPrice {
    /**
     * The three-character ISO-4217 currency code that identifies the currency.
     * https://developer.paypal.com/docs/integration/direct/rest/currency-codes/
     * @required
     * @length 3
     * @pattern [A-Z]{3}
     * @example USD
     */
    currency_code: string;
    /**
     * The value, which might be:
     * An integer for currencies like JPY that are not typically fractional.
     * A decimal fraction for currencies like TND that are subdivided into thousandths.
     * For the required number of decimal places for a currency code, see Currency Codes.
     */
    value: string;
}
interface Example {
    description: string;
    code: string;
}
interface Link {
    /**
     * The complete target URL.
     * To make the related call, combine the method with this URI Template-formatted link.
     * For pre-processing, include the $, (, and ) characters.
     * The href is the key HATEOAS component that links a completed call with a subsequent call.
     * @link https://tools.ietf.org/html/rfc6570
     */
    href: string;
    /**
     * The link relation type, which serves as an ID for a link that unambiguously describes the semantics of the link. See Link Relations.
     * @link https://tools.ietf.org/html/rfc5988#section-4
     * @link https://www.iana.org/assignments/link-relations/link-relations.xhtml
     */
    rel: string;
    /**
     * The HTTP method required to make the related call.
     */
    method?: Method;
}
interface Taxes {
    /**
     * Indicates whether the tax was already included in the billing amount.
     * @default true
     */
    inclusive?: boolean;
    /**
     * The tax percentage on the billing amount.
     * @required
     */
    percentage: string;
}
interface Address {
    /**
     * The first line of the address.
     * For example, number or street. For example, 173 Drury Lane.
     * Required for data entry and compliance and risk checks.
     * Must contain the full address.
     */
    address_line_1?: string;
    /**
     * The second line of the address.
     * For example, suite or apartment number.
     */
    address_line_2?: string;
    /**
     * A city, town, or village.
     * Smaller than admin_area_level_1.
     */
    admin_area_2?: string;
    /**
     * The highest level sub-division in a country, which is usually a province, state, or ISO-3166-2 subdivision.
     * Format for postal delivery.
     * For example, CA and not California. Value, by country, is:
     * - UK. A county.
     * - US. A state.
     * - Canada. A province.
     * - Japan. A prefecture.
     * - Switzerland. A kanton.
     */
    admin_area_1?: string;
    /**
     * The postal code, which is the zip code or equivalent.
     * Typically required for countries with a postal code or an equivalent.
     * See postal code.
     * @see https://en.wikipedia.org/wiki/Postal_code
     */
    postal_code?: string;
    /**
     * The two-character ISO 3166-1 code that identifies the country or region.
     * Note: The country code for Great Britain is GB and not UK as used in the top-level domain names for that country.
     * Use the C2 country code for China worldwide for comparable uncontrolled price (CUP) method, bank card, and cross-border transactions.
     * @see https://developer.paypal.com/docs/integration/direct/rest/country-codes/
     */
    country_code?: string;
}

declare const config: Config;
interface Config {
    clientId: string;
    clientSecret: string;
    mode: 'LIVE' | 'SANDBOX';
}

declare const Init: (clientId: string, clientSecret: string, mode: 'LIVE' | 'SANDBOX') => void;

/**
 * Add tracking information for multiple PayPal transactions
 *
 * Adds tracking information, with or without tracking numbers, for multiple PayPal transactions.
 * Accepts up to 20 tracking IDs.
 * For more information, see [Add tracking information with tracking numbers](https://developer.paypal.com/docs/tracking/integrate/#add-tracking-information-with-tracking-numbers) and [Add tracking information without tracking numbers](https://developer.paypal.com/docs/tracking/integrate/#add-tracking-information-without-tracking-numbers).
 * @param trackers An array of tracking information for shipments.
 */
declare const AddTracking: (trackers: Tracker[]) => Promise<void>;

/**
 * Update or cancel tracking information for PayPal transaction
 *
 * Updates or cancels the tracking information for a PayPal transaction, by ID.
 * To cancel tracking information, call this method and set the status to CANCELLED.
 * For more information, see [Update or cancel tracking information](https://developer.paypal.com/docs/tracking/integrate/#update-or-cancel-tracking-information).
 * @param trackerId The ID of the tracker in the `transaction_id-tracking_number` format.
 * @param trackers An array of tracking information for shipments.
 */
declare const EditTracking: (trackerId: string, options: Tracker[]) => Promise<void>;

/**
 * Shows tracking information, by tracker ID, for a PayPal transaction.
 *
 * @param trackerId The ID of the tracker in the `transaction_id-tracking_number` format.
 */
declare const ShowTrackingInformation: (trackerId: string) => Promise<Tracker>;

declare const _default$5: {
    add: (trackers: Tracker[]) => Promise<void>;
    edit: (trackerId: string, options: Tracker[]) => Promise<void>;
    showInformation: (trackerId: string) => Promise<Tracker>;
};

/**
 * Creates a product.
 */
declare const CreateProduct: (options: Product) => Promise<ProductResponse>;

/**
 * Lists products.
 */
declare const ListProducts: (query?: Query) => Promise<Response>;

/**
 * Shows details for a product, by ID.
 */
declare const ShowProductDetails: (productId: string) => Promise<ProductResponse>;

declare const _default$4: {
    create: (options: Product) => Promise<ProductResponse>;
    list: (query?: Query | undefined) => Promise<Response>;
    showDetails: (productId: string) => Promise<ProductResponse>;
};

/**
 * Activates a plan, by ID.
 */
declare const ActivatePlan: (planId: string) => Promise<void>;

/**
 * Creates a plan that defines pricing and billing cycle details for subscriptions.
 */
declare const CreatePlan: (body: PlanBody) => Promise<CreatedPlan>;

/**
 * Deactivates a plan, by ID.
 */
declare const DeactivatePlan: (planId: string) => Promise<void>;

/**
 * Lists billing plans.
 */
declare const ListPlans: (query?: PlansQuery) => Promise<ListPlansType>;

/**
 * Shows details for a plan, by ID.
 */
declare const PlanDetails: (planId: string) => Promise<CreatedPlan>;

/**
 * Updates pricing for a plan.
 * For example, you can update a regular billing cycle from $5 per month to $7 per month.
 */
declare const UpdatePlanPricing: (planId: string, newPricing: {
    billing_cycle_sequence: number;
    pricing_scheme: {
        pricing_model?: "VOLUME" | "TIERED" | undefined;
        tiers?: {
            starting_quantity: string;
            price: {
                value: string;
                currency_code: string;
            };
            ending_quantity?: string | undefined;
        }[] | undefined;
        fixed_price?: {
            value: string;
            currency_code: string;
        } | undefined;
    };
}[]) => Promise<CreatedPlan>;

declare const _default$3: {
    active: (planId: string) => Promise<void>;
    create: (body: PlanBody) => Promise<CreatedPlan>;
    deactivate: (planId: string) => Promise<void>;
    list: (query?: {
        product_id?: string | undefined;
        plan_ids?: string | undefined;
        page_size?: number | undefined;
        page?: number | undefined;
        total_required?: boolean | undefined;
    } | undefined) => Promise<ListPlansType>;
    plan: (planId: string) => Promise<CreatedPlan>;
    updatePricing: (planId: string, newPricing: {
        billing_cycle_sequence: number;
        pricing_scheme: {
            pricing_model?: "VOLUME" | "TIERED" | undefined;
            tiers?: {
                starting_quantity: string;
                price: {
                    value: string;
                    currency_code: string;
                };
                ending_quantity?: string | undefined;
            }[] | undefined;
            fixed_price?: {
                value: string;
                currency_code: string;
            } | undefined;
        };
    }[]) => Promise<CreatedPlan>;
};

/**
 * Cancels the subscription..
 * @param subId The ID of the subscription.
 * @param reason The reason for the cancellation of a subscription..
 **/
declare const ActivateSubscription: (subId: string, reason?: string) => Promise<void>;

/**
 * Cancels the subscription..
 * @param subId The ID of the subscription.
 * @param reason The reason for the cancellation of a subscription..
 **/
declare const CancelSubscription: (subId: string, reason: string) => Promise<void>;

/**
 * Captures an authorized payment from the subscriber on the subscription.
 * @param subId The ID of the subscription.
 * @param reason The reason for the cancellation of a subscription..
 **/
declare const CapturePayment: (subId: string, options: CapturePaymentType) => Promise<void>;

/**
 * Creates a subscription.
 */
declare const CreateSubscription: (plan_id: string, options?: CreateSubscriptionBody) => Promise<CreatedSubscription>;

/**
 * Lists transactions for a subscription.
 * @param subId The ID of the subscription.
 * @param params query parameters
 **/
declare const ListTransactions: (subId: string, params: ListParams) => Promise<ListResponse>;

/**
 * Updates the quantity of the product or service in a subscription.
 * You can also use this method to switch the plan and update the shipping_amount, shipping_address values for the subscription.
 * This type of update requires the buyer's consent.
 */
declare const RevisePlan: (subId: string, options?: ReviseSubscriptionBody) => Promise<CreatedSubscription>;

/**
 * Shows details for a subscription, by ID.
 */
declare const ShowSubscriptionDetails: (subId: string, params?: Record<string, string>) => Promise<CreatedSubscription>;

/**
 * Suspends the subscription.
 * @param subId The ID of the subscription to suspend.
 * @param reason The reason for suspenson of the subscription.
 **/
declare const SuspendSubscription: (subId: string, reason: string) => Promise<void>;

declare const _default$2: {
    activate: (subId: string, reason?: string | undefined) => Promise<void>;
    cancel: (subId: string, reason: string) => Promise<void>;
    capturePayment: (subId: string, options: CapturePaymentType) => Promise<void>;
    create: (plan_id: string, options?: CreateSubscriptionBody | undefined) => Promise<CreatedSubscription>;
    listTransactions: (subId: string, params: ListParams) => Promise<ListResponse>;
    revisePlan: (subId: string, options?: ReviseSubscriptionBody | undefined) => Promise<CreatedSubscription>;
    show: (subId: string, params?: Record<string, string> | undefined) => Promise<CreatedSubscription>;
    suspend: (subId: string, reason: string) => Promise<void>;
};

/**
 * Shows details for an authorized payment, by ID.
 * @param {String} authorizationId The ID of the authorized payment for which to show details.
 */
declare const ShowAuthorizedPaymentDetails: (authorizationId: string) => Promise<AuthorizedPayment>;

declare const _default$1: {
    showAuthorizedDetails: (authorizationId: string) => Promise<AuthorizedPayment>;
};

declare const _default: {
    config: Config;
    init: (clientId: string, clientSecret: string, mode: "LIVE" | "SANDBOX") => void;
    tracking: {
        add: (trackers: Tracker[]) => Promise<void>;
        edit: (trackerId: string, options: Tracker[]) => Promise<void>;
        showInformation: (trackerId: string) => Promise<Tracker>;
    };
    catalogProducts: {
        create: (options: Product) => Promise<ProductResponse>;
        list: (query?: Query | undefined) => Promise<Response>;
        showDetails: (productId: string) => Promise<ProductResponse>;
    };
    plans: {
        active: (planId: string) => Promise<void>;
        create: (body: PlanBody) => Promise<CreatedPlan>;
        deactivate: (planId: string) => Promise<void>;
        list: (query?: {
            product_id?: string | undefined;
            plan_ids?: string | undefined;
            page_size?: number | undefined;
            page?: number | undefined;
            total_required?: boolean | undefined;
        } | undefined) => Promise<ListPlansType>;
        plan: (planId: string) => Promise<CreatedPlan>;
        updatePricing: (planId: string, newPricing: {
            billing_cycle_sequence: number;
            pricing_scheme: {
                pricing_model?: "VOLUME" | "TIERED" | undefined;
                tiers?: {
                    starting_quantity: string;
                    price: {
                        value: string;
                        currency_code: string;
                    };
                    ending_quantity?: string | undefined;
                }[] | undefined;
                fixed_price?: {
                    value: string;
                    currency_code: string;
                } | undefined;
            };
        }[]) => Promise<CreatedPlan>;
    };
    subscriptions: {
        activate: (subId: string, reason?: string | undefined) => Promise<void>;
        cancel: (subId: string, reason: string) => Promise<void>;
        capturePayment: (subId: string, options: CapturePaymentType) => Promise<void>;
        create: (plan_id: string, options?: CreateSubscriptionBody | undefined) => Promise<CreatedSubscription>;
        listTransactions: (subId: string, params: ListParams) => Promise<ListResponse>;
        revisePlan: (subId: string, options?: ReviseSubscriptionBody | undefined) => Promise<CreatedSubscription>;
        show: (subId: string, params?: Record<string, string> | undefined) => Promise<CreatedSubscription>;
        suspend: (subId: string, reason: string) => Promise<void>;
    };
    payments: {
        showAuthorizedDetails: (authorizationId: string) => Promise<AuthorizedPayment>;
    };
};

export { ActivatePlan, ActivateSubscription, AddTracking, type Address, type AmountPrice, type AmountWithBreakdown, type AuthorizationStatus, type AuthorizedPayment, type BillingInfo, CancelSubscription, CapturePayment, type CapturePaymentType, type CardNetwork, _default$4 as CatalogProducts, config as Config, CreatePlan, CreateProduct, CreateSubscription, type CreateSubscriptionBody, type CreatedPlan, type CreatedSubscription, type CycleExecution, DeactivatePlan, EditTracking, type Example, type FailedPayment, type Frequency, Init, type Link, type ListParams, ListPlans, type ListPlansType, ListProducts, type ListResponse, ListTransactions, type Payee, type PayerName, type Payment, type PaymentPreferences, type PaymentStatus, _default$1 as Payments, PaypalEventType, type PaypalWebhook, type PlanBillingCycle, type PlanBody, PlanDetails, PlanStatus, _default$3 as Plans, type PlansQuery, type PricingScheme, PricingSchemeModel, type PricingSchemeTier, type Product, ShowProductDetails as ProductDetails, type ProductList, type ProductResponse, type ProductType, type Query, type ReasonCode, type RelatedIds, type Response, RevisePlan, type ReviseSubscriptionBody, type SellerProtectionStatus, type SetupFeeFailureAction, type ShipmentDirection, type ShippingAddress, ShowAuthorizedPaymentDetails, ShowSubscriptionDetails, ShowTrackingInformation, type StatusDetails, type SubscriptionStatus, _default$2 as Subscriptions, type SupplementaryData, SuspendSubscription, type Taxes, type Tracker, _default$5 as Tracking, type TrackingNumberType, type TrackingStatus, type Transaction, UpdatePlanPricing, _default as default };
