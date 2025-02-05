import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs } from './/Tabs.component';

const onClick = jest.fn();
const props = {
    tabs: [
        {
            label: 'tab 1',
            icon: <svg data-testid="icon-tab-1" />,
            key: 'tab1',
        },
        {
            label: 'tab 2',
            icon: <svg data-testid="icon-tab-2" />,
            key: 'tab2',
        },
    ],
    onClick,
    activeTab: 'tab1',
};
describe('Tabs', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Tabs {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('tab 1')).toBeInTheDocument();
        expect(screen.getByText('tab 2')).toBeInTheDocument();
        expect(screen.getByTestId('icon-tab-1')).toBeInTheDocument();
        expect(screen.getByTestId('icon-tab-2')).toBeInTheDocument();
    });
    it('should change tab successfully', () => {
        render(<Tabs {...props} />);
        const secondTab = screen.getByText('tab 2');
        fireEvent.click(secondTab);
        expect(onClick).toBeCalled();
    });
});
