import { render, screen } from '@testing-library/react';
import { Label } from './Label';

const defaultProps = {
    label: 'test label',
    hasInputWrapper: false,
    error: 'test error',
    isFocus: false,
    isReadonly: false,
    isHideErrorMessage: false,
    isRedesign: false,
};
describe('Label', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Label {...defaultProps}>test children</Label>,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test label')).toBeInTheDocument();
        expect(screen.getByText('test error')).toBeInTheDocument();
    });
    it('should render without error if isHideErrorMessage is true', () => {
        render(
            <Label {...defaultProps} isHideErrorMessage>
                test children
            </Label>,
        );
        expect(screen.queryByText('test error')).toBe(null);
    });
});
