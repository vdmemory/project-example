import { fireEvent, render } from '@testing-library/react';
import ChoiceMethod from './ChoiceMethod';
import { MockProfileProvider } from '../../../utils/mockData.ts/mockProfileProvider';

const handleClickBack = jest.fn();
const handleClickNext = jest.fn();
const handleAddBank = jest.fn();
const props = {
    title: 'Test title',
    handleClickBack,
    handleClickNext,
    handleAddBank,
    hideBackButton: false,
    isLoading: false,
};
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
jest.useFakeTimers();
jest.mock('@stripe/react-stripe-js', () => ({
    useStripe: jest.fn(),
    useElements: jest.fn(),
}));

describe('ChoiceMethod', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, getByTestId } = render(
            <MockProfileProvider>
                <ChoiceMethod {...props} />
            </MockProfileProvider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test title')).toBeInTheDocument();
        expect(getByTestId('button-back')).toBeInTheDocument();
    });
    it('should render without Back button successfully', () => {
        const { queryByTestId } = render(
            <MockProfileProvider>
                <ChoiceMethod {...props} hideBackButton={true} />
            </MockProfileProvider>,
        );
        expect(queryByTestId('button-back')).toBe(null);
    });
    it('should call handleClickBack on button back click successfully', () => {
        const { getByTestId } = render(
            <MockProfileProvider>
                <ChoiceMethod {...props} />
            </MockProfileProvider>,
        );
        const buttonBack = getByTestId('button-back');
        fireEvent.click(buttonBack);
        expect(handleClickBack).toBeCalled();
    });
    it('should call handleClickNext on ButtonChoice credit card click successfully', () => {
        const { getByText } = render(
            <MockProfileProvider>
                <ChoiceMethod {...props} />
            </MockProfileProvider>,
        );
        const creditCardChoice = getByText('Credit card');
        fireEvent.click(creditCardChoice);
        jest.advanceTimersByTime(800);
        expect(handleClickNext).toBeCalled();
    });
});
