import { render } from '@testing-library/react';
import { SideBar } from './SideBar';

const props = {
    title: 'Welcome to Ninety Two',
    children: 'Your Brand Lead',
    popup: <div>Tooltip content</div>,
    popupControl: {
        open: jest.fn(),
        close: jest.fn(),
        isOpen: false,
    },
};

describe('SideBar', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<SideBar {...props} />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render SideBar', () => {
        const testCases = [
            { name: 'title', expected: 'Welcome to Ninety Two' },
            { name: 'children', expected: 'Your Brand Lead' },
            { name: 'link project', expected: 'View Scope' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully SideBar with ${testCase.name}`, async () => {
                const { getByText } = render(<SideBar {...props} />);
                expect(getByText(testCase.expected)).toBeInTheDocument();
            });
        });
    });

    it('should render successfully icon link project', () => {
        const { baseElement } = render(<SideBar {...props} />);
        const iconLinkButton =
            baseElement.getElementsByTagName('reactcomponent')[1];
    });
});
