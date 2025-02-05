import { render, screen } from '@testing-library/react';
import StepWrapper from './StepWrapper';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../../store/mockStore';

const onBack = jest.fn();
const onNext = jest.fn();
const props = {
    step: 1,
    isValid: true,
    onBack,
    onNext,
    label: 'test label',
};
const children = <div>test children</div>;

describe('StepWrapper', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
    }));
    it('should render successfully', () => {
        render(
            <Provider store={mockConfiguredStore}>
                <StepWrapper {...props}>{children}</StepWrapper>
            </Provider>,
        );
        expect(screen.getByText('test children')).toBeInTheDocument();
        expect(screen.getByText('test label')).toBeInTheDocument();
    });
});
