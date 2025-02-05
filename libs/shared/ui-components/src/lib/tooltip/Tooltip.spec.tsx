import { render } from '@testing-library/react';

import Tooltip from './Tooltip';

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
    label: 'test label',
    isCopyBtn: false,
    isError: false,
};
const TestChildren = () => <div>test children</div>;

describe('Tooltip', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <Tooltip {...props}>
                <TestChildren />
            </Tooltip>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('test children')).toBeInTheDocument();
    });
    it('should display tooltip if isError prop is true', () => {
        const { getByText } = render(
            <Tooltip {...props} isError={true}>
                <TestChildren />
            </Tooltip>,
        );
        expect(getByText('test label')).toBeInTheDocument();
    });
    it('should display copy btn if tooltip is in view and isCopyBtn prop is true', () => {
        const { getByText } = render(
            <Tooltip {...props} isError={true} isCopyBtn={true}>
                <TestChildren />
            </Tooltip>,
        );
        expect(getByText('Copy')).toBeInTheDocument();
    });
});
