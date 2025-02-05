import { render } from '@testing-library/react';
import { Stepper } from './Stepper';

const defaultProps = {
    validationSteps: [false, false],
    step: 1,
    setStep: jest.fn(),
};
const steps = [<div key="step-1">step 1</div>, <div key="step-2">step 2</div>];
describe('Stepper', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <Stepper {...defaultProps}>{steps}</Stepper>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('step 1')).toBeInTheDocument();
    });
    it('should render second step successfully', () => {
        const { getByText } = render(
            <Stepper {...defaultProps} step={2}>
                {steps}
            </Stepper>,
        );
        expect(getByText('step 2')).toBeInTheDocument();
    });
});
