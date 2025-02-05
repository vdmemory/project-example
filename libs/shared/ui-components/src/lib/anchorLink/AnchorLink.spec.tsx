import { fireEvent, render, screen } from '@testing-library/react';
import { AnchorLink } from './AnchorLink';

const props = {
    href: 'test.com',
};
const children = 'test link';
describe('AnchorLink', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <AnchorLink {...props}>{children}</AnchorLink>,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test link')).toBeInTheDocument();
        expect(
            document.querySelector('a[href="test.com"]'),
        ).toBeInTheDocument();
    });

    it('should prevent event propagation on click', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(
            <div onClick={onClickMock}>
                <AnchorLink href="#">Click me</AnchorLink>
            </div>,
        );

        const anchor = getByText('Click me');
        fireEvent.click(anchor);
        expect(onClickMock).not.toHaveBeenCalled();
    });
});
