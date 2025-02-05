import { ReactNode } from 'react';

export type ToastSentimentType =
    | 'neutral'
    | 'positive'
    | 'negative'
    | 'attentive'
    | 'informative';

export type ToastCallProps = {
    title: string;
    content: string;
    icon?: ReactNode;
    linkUrl?: string;
    linkText?: string;
    autoClose?: number;
};

export type CustomToastProps = {
    sentiment?: ToastSentimentType;
    closeToast?: () => void;
} & ToastCallProps;
