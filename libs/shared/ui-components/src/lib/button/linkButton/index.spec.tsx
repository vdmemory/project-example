import { render, screen } from '@testing-library/react';

import { LinkButton } from './LinkButton';

const handleClick = jest.fn();

const props = {
    name: 'LinkButton',
    onClick: handleClick,
    className: 'class-link',
};

describe('LinkButton', () => {
    it('should render successfully LinkButton', () => {
        const { baseElement } = render(<LinkButton {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully LinkButton with type submit', () => {
        render(<LinkButton type="submit" {...props} />);
        const button = screen.getByRole('button');
        expect(button.getAttribute('type')).toEqual('submit');
    });
    it('should render successfully LinkButton with type submit', () => {
        render(<LinkButton type="button" {...props} />);
        const button = screen.getByRole('button');
        expect(button.getAttribute('type')).toEqual('button');
    });
    it('should render successfully LinkButton with icon ', () => {
        const { baseElement } = render(
            <LinkButton type="button" icon={'plus'} {...props} />,
        );
        const plusIcon = baseElement.getElementsByClassName('icon-plus');
        expect(plusIcon[0]).toBeDefined();
    });
    it('should render successfully LinkButton with out icon ', () => {
        const { baseElement } = render(
            <LinkButton type="button" icon={'none'} {...props} />,
        );
        const plusIcon = baseElement.getElementsByClassName('icon-plus');
        expect(plusIcon[0]).not.toBeDefined();
    });
    it('should render successfully LinkButton with props name ', () => {
        render(<LinkButton type="button" line={true} {...props} />);
        const propsName = screen.getByText('LinkButton');
        expect(propsName).toBeInTheDocument();
    });
});
