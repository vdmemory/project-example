import { fireEvent, render, screen } from '@testing-library/react';
import NavControl from './NavControl';

const handleNext = jest.fn();
const handleBack = jest.fn();

const props = {
    handleNext,
    handleBack,
    isDisabledNext: false,
    isViewNavControl: true,
    isDisabledPrev: false,
    step: 1,
    isStatic: false,
    isSticky: true,
};

describe('NavControl', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<NavControl {...props} />);
        expect(baseElement).toBeTruthy();
        const nextBtn = screen.getByTestId('next-button');
        const backBtn = screen.getByTestId('back-button');
        expect(nextBtn).toBeTruthy();
        expect(backBtn).toBeTruthy();
        fireEvent.click(nextBtn);
        expect(handleNext).toBeCalled();
        fireEvent.click(backBtn);
        expect(handleBack).toBeCalled();
    });
});
