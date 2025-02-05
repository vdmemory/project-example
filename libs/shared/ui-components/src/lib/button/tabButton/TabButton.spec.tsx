import { fireEvent, render, screen } from '@testing-library/react';

import { TabButton } from './TabButton';

const handleClick = jest.fn();

const props = {
    title: 'TabButton',
    onClick: handleClick,
    isActive: false,
};

describe('TabButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TabButton {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should render TabButton with title', () => {
        render(<TabButton {...props} />);
        const titleButton = screen.queryByText('TabButton');
        expect(titleButton).toBeInTheDocument();
    });
    it('should render TabButton with props disabled', () => {
        render(<TabButton disabled={true} {...props} />);

        expect(screen.getByRole('button')).toHaveAttribute('disabled');
    });
    it('should render TabButton without props disabled', () => {
        render(<TabButton disabled={false} {...props} />);
        expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
    });
    it('props click should be called', async () => {
        render(<TabButton disabled={false} {...props} />);
        const button = screen.getByRole('button');
        await fireEvent.click(button);
        expect(handleClick).toBeCalledTimes(1);
    });
});
