import { trackAddToCart } from "@/utils/gtm";
import { CURRENCY_SYMBOL, OG_PRICE, DISCOUNTED_PRICE } from "@/utils/product-info";


interface CheckoutButtonProps {
  ogPrice?: string;
  price?: string;
  label?: string;
  ctaLocation?: string;
  href?: string;
  onClick?: () => void;
}


const CheckoutButton = ({
  ogPrice = `${CURRENCY_SYMBOL}${OG_PRICE}`,
  price = `${CURRENCY_SYMBOL}${DISCOUNTED_PRICE.toFixed(2)}`,
  label = "Book Your Seat -",
  ctaLocation = "checkout",
  onClick,
}: CheckoutButtonProps) => {

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
        type="submit"
        onClick={handleClick}
        className="w-full bg-cta hover:bg-cta-hover text-cta-foreground rounded-xl py-4 font-heading font-bold text-lg transition-colors shadow-cta flex items-center justify-center gap-2 animate-cta-bounce"
      >
        {label}{price}
      </button>
  );
};

export default CheckoutButton;