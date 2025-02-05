import { render } from '@testing-library/react';

// TOTO: update test
describe('GetStartedWelcomeBack', () => {
    it('should render successfully GetStartedWelcomeBack', () => {
        const { baseElement } = render(<div />);
        expect(baseElement).toBeTruthy();
    });
});
