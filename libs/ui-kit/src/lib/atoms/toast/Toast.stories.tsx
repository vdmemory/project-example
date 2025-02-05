import { Meta } from '@storybook/react';
import Toast from './Toast.component';
import { WarningIcon } from '../../icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastCallProps, ToastSentimentType } from '@breef/shared/types';
import styled from '@emotion/styled';

const WrapperStyled = styled.div`
    display: flex;
    gap: 10px;

    button {
        padding: 5px;
        text-transform: capitalize;
    }
`;

const StoryToast = (props: ToastCallProps) => {
    const onCLick = (sentiment: ToastSentimentType) => {
        toast(
            ({ closeToast }) => (
                <Toast
                    {...props}
                    sentiment={sentiment}
                    closeToast={closeToast}
                />
            ),
            {
                closeButton: false,
                icon: false,
                closeOnClick: false,
                hideProgressBar: true,
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
                position: 'bottom-left',
                pauseOnFocusLoss: false,
                pauseOnHover: false,
            },
        );
    };

    return (
        <WrapperStyled>
            <ToastContainer />
            <button onClick={() => onCLick('neutral')}>neutral</button>
            <button onClick={() => onCLick('positive')}>positive</button>
            <button onClick={() => onCLick('negative')}>negative</button>
            <button onClick={() => onCLick('attentive')}>attentive</button>
            <button onClick={() => onCLick('informative')}>informative</button>
        </WrapperStyled>
    );
};

const Story: Meta<typeof StoryToast> = {
    component: StoryToast,
    title: 'Toast',
};
export default Story;

export const Default = {
    args: {
        title: 'Toast',
        content: 'Info text',
        sentiment: 'neutral',
        icon: <WarningIcon />,
        linkUrl: 'test.com',
        linkText: 'Link',
        autoClose: 5000,
    },
};
