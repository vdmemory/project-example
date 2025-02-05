import { fireEvent, render, screen } from '@testing-library/react';
import ListItem from './ListItem.component';

const onClick = jest.fn();
const props = {
    onClick,
};
describe('ListItem', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ListItem {...props}>
                <div>test children</div>
            </ListItem>,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test children')).toBeInTheDocument();
    });
    it('should call onCLick successfully', () => {
        render(
            <ListItem {...props}>
                <div>test children</div>
            </ListItem>,
        );
        const item = screen.getByText('test children');
        fireEvent.click(item);
        expect(onClick).toBeCalled();
    });
});
