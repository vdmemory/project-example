import { useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

export const useRequiresActionStripe = () => {
    const stripe = useStripe();
    const [isLoadingAction, setIsLoadingAction] = useState(false);

    const handleAction = async (clientSecret: string) => {
        if (!stripe) return;
        setIsLoadingAction(true);
        const { error } = await stripe.handleNextAction({
            clientSecret,
        });
        if (error) {
            console.log('error - ', error);
            setIsLoadingAction(false);
        } else {
            setIsLoadingAction(false);
        }
    };

    return { handleAction, isLoadingAction };
};
