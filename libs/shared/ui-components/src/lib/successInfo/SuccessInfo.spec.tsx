import { fireEvent, render } from '@testing-library/react';

import { SuccessInfo } from './SuccessInfo';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
        };
    },
}));

const config = {
    title: 'Success Title',
    note: 'Success Note',
    nextSteps: [
        {
            imageUrl: 'url',
            title: 'title 1',
            note: 'note 1',
        },
        {
            imageUrl: 'url',
            title: 'title 2',
            note: 'note 2',
        },
    ],
    btnArrowAdditional: false,
};
const onButtonClick = jest.fn();
const onAdditionalButtonClick = jest.fn();
const handleUnmountSuccessScreen = jest.fn();
const defaultProps = {
    config,
    buttonTitle: 'Button Title',
    additionalButtonTitle: undefined,
    onButtonClick,
    onAdditionalButtonClick: undefined,
    isShowNextStepsNumbers: false,
    linkButton: undefined,
    handleUnmountSuccessScreen: handleUnmountSuccessScreen,
};
describe('SuccessInfo', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <SuccessInfo {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Button Title')).toBeInTheDocument();
        expect(getByText('Success Title')).toBeInTheDocument();
        expect(getByText('Success Note')).toBeInTheDocument();
        expect(getByText('title 1')).toBeInTheDocument();
        expect(getByText('title 2')).toBeInTheDocument();
    });
    it('should render additional button successfully', () => {
        const { getByText } = render(
            <SuccessInfo
                {...defaultProps}
                additionalButtonTitle="Test Additional Button"
                onAdditionalButtonClick={onAdditionalButtonClick}
            />,
        );
        expect(getByText('Test Additional Button')).toBeInTheDocument();
    });
    it('should render link button successfully', () => {
        const { getByText } = render(
            <SuccessInfo
                {...defaultProps}
                linkButton={{
                    title: 'test link button title',
                    link: 'link',
                }}
            />,
        );
        expect(getByText('test link button title')).toBeInTheDocument();
    });
    it('should render numbers on next step titles successfully', () => {
        const { getByText } = render(
            <SuccessInfo {...defaultProps} isShowNextStepsNumbers={true} />,
        );
        expect(getByText('1. title 1')).toBeInTheDocument();
        expect(getByText('2. title 2')).toBeInTheDocument();
    });
    it('should call handler on main button click successfully', () => {
        const { getByText } = render(<SuccessInfo {...defaultProps} />);
        fireEvent.click(getByText('Button Title'));
        expect(onButtonClick).toBeCalled();
    });
    it('should call handler on additional button click successfully', () => {
        const { getByText } = render(
            <SuccessInfo
                {...defaultProps}
                additionalButtonTitle="Test Additional Button"
                onAdditionalButtonClick={onAdditionalButtonClick}
            />,
        );
        fireEvent.click(getByText('Test Additional Button'));
        expect(onAdditionalButtonClick).toBeCalled();
    });
});
