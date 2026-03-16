import { trackSubscribe } from "@/utils/gtm";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { CURRENCY_SYMBOL, OG_PRICE, DISCOUNTED_PRICE } from "@/utils/product-info";
interface SubscribeButtonProps {
  ogPrice?: string;
  price?: string;
  label?: string;
  ctaLocation?: string;
  href?: string;
  onClick?: () => void;
}


const SubscribeButton = ({
  ogPrice = `${CURRENCY_SYMBOL}${OG_PRICE}`,
  price = `${CURRENCY_SYMBOL}${DISCOUNTED_PRICE}`,
  label = "Book Your Seat @",
  ctaLocation = "unknown",
  href = "#checkout",
  onClick,
}: SubscribeButtonProps) => {

  const { trackEventAllPixels } = useFacebookPixel();

  const handleClick = () => {
    trackSubscribe({ label, ctaLocation });
    trackEventAllPixels({ eventName: "Subscribe", eventParams: { value: 99, currency: "INR" } });
    if (onClick) onClick();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="block w-full max-w-lg mx-auto bg-cta hover:bg-cta-hover text-cta-foreground rounded-full py-5 px-8 text-center font-heading font-bold text-xl md:text-2xl transition-colors duration-300 shadow-cta hover:shadow-xl animate-cta-bounce"
    >
      
    <>{label}<span className="line-through opacity-70">{ogPrice}</span>{price}</>
      
    </a>
  );
};

export default SubscribeButton;