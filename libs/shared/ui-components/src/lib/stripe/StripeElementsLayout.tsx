import { BaseStripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLIC_KEY } from '@breef/shared/constants';
import { getAppearance } from './StripeElements.styled';
interface StripeElementsProps {
    children: React.ReactNode;
    variantRedesign?: 'primary' | 'secondary';
}

export const StripeElements = ({
    children,
    variantRedesign,
}: StripeElementsProps) => {
    const elementsOptions: BaseStripeElementsOptions = {
        fonts: [
            {
                cssSrc: 'https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro',
            },
        ],
        locale: 'en' as const,
        appearance: getAppearance(variantRedesign),
    };
    const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
    return (
        <Elements stripe={stripePromise} options={elementsOptions}>
            {children}
        </Elements>
    );
};

export default StripeElements;
