import { render, fireEvent, screen } from '@testing-library/react';

import { ChipButton } from './ChipButton';

const handleClick = jest.fn();

const props = {
    id: 123,
    name: 'chip',
    icon: true,
    onClick: handleClick,
};

describe('ChipButton', () => {
    it('should render successfully ChipButton', () => {
        const { baseElement } = render(
            <ChipButton action={'add'} {...props} />,
        );
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully ChipButton with action add', () => {
        const { baseElement } = render(
            <ChipButton action={'add'} {...props} />,
        );
        const plusIcon = baseElement.getElementsByClassName('plus-icon');
        const closeIcon = baseElement.getElementsByClassName('close-icon');
        expect(plusIcon[0]).toBeDefined();
        expect(closeIcon[0]).not.toBeDefined();
    });
    it('should render successfully ChipButton with action remove', () => {
        const { baseElement } = render(
            <ChipButton action={'remove'} {...props} />,
        );
        const plusIcon = baseElement.getElementsByClassName('plus-icon');
        const closeIcon = baseElement.getElementsByClassName('close-icon');
        expect(plusIcon[0]).not.toBeDefined();
        expect(closeIcon[0]).toBeDefined();
    });
    it('should render successfully ChipButton with action onClick', async () => {
        render(<ChipButton action={'remove'} disabled={false} {...props} />);
        const button = screen.getByTestId('chip-button');
        await fireEvent.click(button, { id: 123, type: 'remove' });
        expect(handleClick).toBeCalledTimes(1);
    });
});
