interface Product {
  item_id: string;
  item_name: string;
  item_category?: string;
  price: number;
  quantity: number;
  currency?: string;
}

interface Order {
  transaction_id?: string;
  value: number;
  currency: string;
  tax?: number;
  shipping?: number;
  coupon?: string;
  items: Product[];
}

export const LEAD_SHEET_URL = "https://script.google.com/macros/s/AKfycbxfCJk--pvj3uKYLf3RcTmbNaAMYLcow9yhG_SoGOgLqZjNbtvW-zuBganNw4M2Mb0aiQ/exec?gid=101776857";

export const OG_PRICE = 499;
export const DISCOUNTED_PRICE = 99;
export const WEBINAR_NAME = window.location.hostname.includes("sourobhkulkorni.com")
  ? import.meta.env.VITE_WEBINAR_NAME_SOUROBH
  : import.meta.env.VITE_WEBINAR_NAME_FM4;
export const CURRENCY = "INR";
export const CURRENCY_SYMBOL = "₹";

export const PRODUCT : Product = {
    item_id : 'fm4_workshop',
    item_name : WEBINAR_NAME,
    item_category : 'Online Workshop',
    price : DISCOUNTED_PRICE,
    quantity : 1,
    currency: CURRENCY,

}

export const ORDER : Order = {
    value: DISCOUNTED_PRICE,
    currency: CURRENCY,
    items: [PRODUCT],
}
