import { render } from '@testing-library/react';
import { LabelField } from './LabelField';

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

const props = {
    label: 'Test Label',
};

describe('LabelField', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <LabelField {...props}>
                <div>test children</div>
            </LabelField>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByText('test children')).toBeInTheDocument();
    });
    it('should render with error successfully', () => {
        const { getByText, getByTestId } = render(
            <LabelField {...props} error="Test Error" />,
        );
        expect(getByText('Test Error')).toBeInTheDocument();
    });
});
