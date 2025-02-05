import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectAvailabilityPopup from './ProjectAvailabilityPopup';
import { tipsPopupConfig } from './tipsPopupConfig';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';

jest.mock('@breef/shared/hooks', () => ({
    useMediaContext: jest.fn(),
    useRouteControl: jest.fn(),
}));

jest.mock('../../startPitchPopup/StartPitchPopup', () => ({
    StartPitchPopup: ({
        children,
        title,
        description,
        buttonTitle,
        onSubmit,
    }: {
        children: React.ReactNode;
        title: string;
        description: string;
        buttonTitle: string;
        onSubmit: () => void;
    }) => (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <button onClick={onSubmit}>{buttonTitle}</button>
            {children}
        </div>
    ),
}));

describe('ProjectAvailabilityPopup', () => {
    const mockChangePage = jest.fn();
    const mockClose = jest.fn();

    beforeEach(() => {
        (useMediaContext as jest.Mock).mockReturnValue({ isMobile: false });
        (useRouteControl as jest.Mock).mockReturnValue({
            changePage: mockChangePage,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with provided config', () => {
        render(<ProjectAvailabilityPopup projectId={1} close={mockClose} />);

        expect(
            screen.getByText(tipsPopupConfig.config.label),
        ).toBeInTheDocument();
        expect(
            screen.getByText(tipsPopupConfig.config.note),
        ).toBeInTheDocument();
        tipsPopupConfig.tips.forEach(tip => {
            expect(screen.getByText(tip.title)).toBeInTheDocument();
            expect(screen.getByText(tip.description)).toBeInTheDocument();
        });
    });
});
