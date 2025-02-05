import { fireEvent, render, screen } from '@testing-library/react';
import NavigationSection from './NavigationSection';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../../store/mockStore';

const onNext = jest.fn();
const onBack = jest.fn();
const onSaveExit = jest.fn();
const props = {
    onNext,
    onBack,
    isDisabledNext: false,
    step: 1,
    stepsCount: 2,
};

const NavigationSectionWrapper = () => {
    return (
        <Provider store={mockConfiguredStore}>
            <NavigationSection {...props} />
        </Provider>
    );
};
describe('NavigationSection', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
    }));
    it('should render successfully', () => {
        render(<NavigationSectionWrapper />);
        expect(screen.getByText('Next')).toBeInTheDocument();
    });
    it('should call functions next and back successfully', () => {
        render(<NavigationSectionWrapper />);
        const [buttonBack, buttonNext] =
            screen.getAllByTestId('button-container');
        expect(buttonNext).toBeInTheDocument();
        expect(buttonBack).toBeInTheDocument();
        fireEvent.click(buttonNext);
        fireEvent.click(buttonBack);
        expect(onNext).toBeCalled();
        expect(onBack).toBeCalled();
    });
});
