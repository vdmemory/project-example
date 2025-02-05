import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Runner from './Runner';

describe('Runner', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Runner />);
        expect(baseElement).toBeTruthy();
        expect(document.getElementsByClassName('runner').length).toBe(1);
    });
    it('should render with custom className successfully', () => {
        render(<Runner className="custom-class-name" />);
        expect(
            document.getElementsByClassName('custom-class-name').length,
        ).toBe(1);
    });
});
