import { fireEvent, render, screen } from '@testing-library/react';
import { Tab } from './Tab.component';

const onClick = jest.fn();
const props = {
    title: 'test title',
    icon: <svg data-testid="svg-icon" />,
    value: 'test value',
    onClick,
    isActive: false,
};
const children = <div>test children</div>;
describe('Tab', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Tab {...props}>{children}</Tab>);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test title')).toBeInTheDocument();
        expect(screen.getByText('test children')).toBeInTheDocument();
        expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
    });
    it('should render successfully', () => {
        render(<Tab {...props}>{children}</Tab>);
        const button = document.getElementsByTagName('button')[0];
        fireEvent.click(button);
        expect(onClick).toBeCalledWith('test value');
    });
});
