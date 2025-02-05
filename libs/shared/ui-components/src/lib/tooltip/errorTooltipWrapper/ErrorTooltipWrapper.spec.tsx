import { render } from '@testing-library/react';
import ErrorTooltipWrapper from './ErrorTooltipWrapper';

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

const TestChildren = () => <div>test children</div>;

describe('ErrorTooltipWrapper', () => {
    it('should render successfully ', () => {
        const { baseElement } = render(
            <ErrorTooltipWrapper>
                <TestChildren />
            </ErrorTooltipWrapper>,
        );
        expect(baseElement).toBeTruthy();
    });
    it('should render with displayed error tooltip successfully', () => {
        const { getByText } = render(
            <ErrorTooltipWrapper errorMessage="test error message">
                <TestChildren />
            </ErrorTooltipWrapper>,
        );
        expect(getByText('test error message')).toBeInTheDocument();
    });
});
