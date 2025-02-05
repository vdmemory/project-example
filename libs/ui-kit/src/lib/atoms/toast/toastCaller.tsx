import { toast, ToastOptions } from 'react-toastify';
import { Toast } from './Toast.component';
import { ToastCallProps, ToastSentimentType } from '@breef/shared/types';

const toastCustomMethod = (
    props: ToastCallProps & { sentiment: ToastSentimentType },
) =>
    toast(
        ({ closeToast }) => <Toast {...props} closeToast={closeToast} />,
        options,
    );

export const toastCaller = {
    neutral: (props: ToastCallProps) =>
        toastCustomMethod({ ...props, sentiment: 'neutral' }),
    positive: (props: ToastCallProps) =>
        toastCustomMethod({ ...props, sentiment: 'positive' }),
    negative: (props: ToastCallProps) =>
        toastCustomMethod({ ...props, sentiment: 'negative' }),
    attentive: (props: ToastCallProps) =>
        toastCustomMethod({ ...props, sentiment: 'attentive' }),
    informative: (props: ToastCallProps) =>
        toastCustomMethod({ ...props, sentiment: 'informative' }),
};

const options: ToastOptions = {
    closeButton: false,
    icon: false,
    closeOnClick: false,
    autoClose: false,
    bodyStyle: {
        padding: 0,
    },
    style: {
        padding: 0,
        border: 'none',
        width: 'fit-content',
        borderRadius: 0,
    },
};
