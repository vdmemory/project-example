import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FinishProjectPopup, { stepsConfig } from './FinishProjectPopup';
import { useMediaContext } from '@breef/shared/hooks';

jest.mock('@breef/shared/hooks', () => ({
    useMediaContext: jest.fn(),
}));

describe('FinishProjectPopup', () => {
    const closeMock = jest.fn();

    beforeEach(() => {
        (useMediaContext as jest.Mock).mockReturnValue({ isMobile: false });
    });

    it('renders correctly', () => {
        render(<FinishProjectPopup close={closeMock} />);

        expect(screen.getByText('CREATE A PROJECT')).toBeInTheDocument();
        expect(
            screen.getByText(
                'We’ll help you build the perfect project scope (in 5 mins). Let’s do this!',
            ),
        ).toBeInTheDocument();

        stepsConfig.forEach((step, index) => {
            expect(screen.getByText(step.label)).toBeInTheDocument();
            expect(screen.getByText(step.text)).toBeInTheDocument();
        });

        expect(
            screen.getByRole('button', { name: 'FINISH MY PROJECT' }),
        ).toBeInTheDocument();
    });

    it('calls close function when finish button is clicked', () => {
        render(<FinishProjectPopup close={closeMock} />);

        const finishButton = screen.getByRole('button', {
            name: 'FINISH MY PROJECT',
        });
        fireEvent.click(finishButton);

        expect(closeMock).toHaveBeenCalledTimes(1);
    });

    it('renders correctly on mobile', () => {
        (useMediaContext as jest.Mock).mockReturnValue({ isMobile: true });
        render(<FinishProjectPopup close={closeMock} />);

        expect(screen.getByText('CREATE A PROJECT')).toBeInTheDocument();
    });
});
