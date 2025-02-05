/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render } from '@testing-library/react';
import { toast } from 'react-toastify';
import { toastCaller } from './toastCaller';

jest.mock('react-toastify', () => ({
    toast: jest.fn(),
}));

describe('toastCaller', () => {
    beforeEach(() => {
        // @ts-ignore
        jest.clearAllMocks();
    });

    const exampleProps = {
        content: 'Test message',
        title: 'Test Title',
    };

    it.each([
        ['neutral', 'neutral'],
        ['positive', 'positive'],
        ['negative', 'negative'],
        ['attentive', 'attentive'],
        ['informative', 'informative'],
    ])(
        'calls the toast function with %s sentiment',
        (methodName, expectedSentiment) => {
            //@ts-ignore
            toastCaller[methodName](exampleProps);

            expect(toast).toBeCalledWith(
                expect.any(Function),
                expect.anything(),
            );

            //@ts-ignore
            const renderArg = toast.mock.calls[0][0];
            const { getByText } = render(
                renderArg({ closeToast: () => undefined }),
            );

            expect(getByText(exampleProps.content)).toBeInTheDocument();
            expect(getByText(exampleProps.title)).toBeInTheDocument();
        },
    );
});
