import { render } from '@testing-library/react';
import { Table } from './Table';

const props = {
    columns: [
        {
            header: 'First Column',
            accessor: 'col1',
        },
        {
            header: 'Second Column',
            accessor: 'col2',
        },
    ],
    rows: [
        {
            id: 0,
            col1: 'First Row Cell 1',
            col2: 'First Row Cell 2',
        },
        {
            id: 1,
            col1: 'Second Row Cell 1',
            col2: 'Second Row Cell 2',
        },
    ],
    footerRow: {
        col2: 'Footer',
    },
};

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

describe('EditableElem', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<Table {...props} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('First Column')).toBeInTheDocument();
        expect(getByText('Second Column')).toBeInTheDocument();
        expect(getByText('First Row Cell 1')).toBeInTheDocument();
        expect(getByText('Second Row Cell 2')).toBeInTheDocument();
        expect(getByText('Footer')).toBeInTheDocument();
    });
    it('should display loader if isLoading prop is true', () => {
        const { getByText } = render(<Table {...props} isLoading />);
        expect(getByText('Loading...')).toBeInTheDocument();
    });
});
