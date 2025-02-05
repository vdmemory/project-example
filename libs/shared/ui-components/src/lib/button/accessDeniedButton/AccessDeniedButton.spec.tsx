import { render, screen } from '@testing-library/react';
import { AccessDeniedButton } from './AccessDeniedButton';

class ResizeObserverMock {
    observe() {
        return;
    }
    unobserve() {
        return;
    }
    disconnect() {
        return;
    }
}
beforeAll(() => {
    global.ResizeObserver = ResizeObserverMock;
});
afterEach(() => {
    jest.restoreAllMocks();
});

describe('AccessDeniedButton', () => {
    it('renders with provided message and children', () => {
        const { baseElement } = render(
            <AccessDeniedButton message="Access Denied" placement="top">
                <button>Click Me</button>
            </AccessDeniedButton>,
        );
        const button = screen.getByRole('button', { name: 'Click Me' });
        expect(button).toBeInTheDocument();
        const tooltip = baseElement.querySelector('.access-denied-wrapper');
        expect(tooltip).toBeInTheDocument();
    });
});
