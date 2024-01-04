import type { Link } from '.'

export interface Product {
	/**
	 * The ID of the product. You can specify the SKU for the product.
	 * If you omit the ID, the system generates it.
	 * System-generated IDs have the PROD- prefix.
	 * @optional
	 */
	id?: string

	/**
	 * The product name.
	 * @required
	 */
	name: string

	/**
	 * The product description.
	 * @optional
	 */
	description?: string

	/**
	 * The product type.
	 * Indicates whether the product is physical or digital goods, or a service.
	 * @required
	 * @default PHYSICAL
	 */
	type: ProductType

	/**
	 * The product category.
	 * @see https://developer.paypal.com/docs/api/catalog-products/v1/#products_create!path=category&t=request
	 * @optional
	 */
	category?: string

	/**
	 * The image URL for the product.
	 * @optional
	 */
	image_url?: string

	/**
	 * The home page URL for the product.
	 * @optional
	 */
	home_url?: string
}

export interface ProductResponse extends Partial<Product> {
	/**
	 * An array of request-related [HATEOAS links](https://developer.paypal.com/docs/api/overview/#hateoas-links).
	 */
	links?: Link[]
	/**
	 * The date and time when the product was created, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6).
	 */
	create_time: string
	/**
	 * The date and time when the product was last updated, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6).
	 */
	update_time: string
}

export type ProductList = ProductResponse[]

export interface Query {
	/**
	 * The number of items to return in the response.
	 * @default: 10
	 */
	page_size?: number
	/**
	 * A non-zero integer which is the start index of the entire list of items that are returned in the response.
	 * So, the combination of `page=1` and `page_size=20` returns the first 20 items.
	 * The combination of `page=2` and `page_size=20` returns the next 20 items.
	 * @default: 1
	 */
	page?: number
	/**
	 * Indicates whether to show the total items and total pages in the response.
	 * @default: false
	 */
	total_required?: boolean
}

export interface Response {
	products: ProductList
	links: Link[]
	total_items: number
	total_pages: number
}

/**
 * - PHYSICAL Physical goods.
 * - DIGITAL For digital goods, the value must be set to DIGITAL to get the best rates. For more details, please contact your account manager.
 * - SERVICE A service. For example, technical support.
 */
export type ProductType = 'PHYSICAL' | 'DIGITAL' | 'SERVICE'
