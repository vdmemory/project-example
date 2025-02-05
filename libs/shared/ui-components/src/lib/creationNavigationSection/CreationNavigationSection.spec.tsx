import { fireEvent, render, screen } from '@testing-library/react';
import CreationNavigationSection from './CreationNavigationSection';
import { Provider } from 'react-redux';

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

describe('NavigationSection', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
    }));
    it('should render successfully', () => {
        render(<CreationNavigationSection {...props} />);
        expect(screen.getByText('Next')).toBeInTheDocument();
    });
    it('should call functions next and back successfully', () => {
        render(<CreationNavigationSection {...props} />);
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
