import { render, fireEvent } from '@testing-library/react';
import { TrashIconButton } from './TrashIconButton';

describe('TrashIconButton', () => {
    it('calls onClick function when clicked', () => {
        const onClickMock = jest.fn();
        const { baseElement } = render(
            <TrashIconButton onClick={onClickMock} />,
        );

        const trashButton = baseElement.querySelector(
            '.trash-btn',
        ) as HTMLButtonElement;
        fireEvent.click(trashButton);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('renders with custom class name', () => {
        const { baseElement } = render(
            <TrashIconButton
                onClick={() => undefined}
                className="custom-class"
            />,
        );

        const trashButton = baseElement.querySelector(
            '.custom-class',
        ) as HTMLButtonElement;
        expect(trashButton).toBeInTheDocument();
    });

    it('renders as disabled when disabled prop is true', () => {
        const { baseElement } = render(
            <TrashIconButton onClick={() => undefined} disabled />,
        );

        const trashButton = baseElement.querySelector(
            '.trash-btn',
        ) as HTMLButtonElement;
        expect(trashButton).toBeDisabled();
    });
});
