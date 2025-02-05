import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectAvailabilitySuccessPopup from './ProjectAvailabilitySuccessPopup';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { PROJECTS_ROUTE } from '@breef/shared/constants';
import { agencyConfigPopup, clientConfigPopup } from './configPopup';
import { agencyConfigTips, clientConfigTips } from './configTips';

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

describe('ProjectAvailabilitySuccessPopup', () => {
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

    it('renders correctly for client userType', () => {
        render(
            <ProjectAvailabilitySuccessPopup
                userType="client"
                close={mockClose}
            />,
        );

        expect(screen.getByText(clientConfigPopup.label)).toBeInTheDocument();
        expect(
            screen.getByText(/Agencies will now confirm/i),
        ).toBeInTheDocument();
        clientConfigTips.forEach(tip => {
            expect(screen.getByText(tip.title)).toBeInTheDocument();
            expect(screen.getByText(tip.description)).toBeInTheDocument();
        });
    });

    it('renders correctly for agency userType', () => {
        render(
            <ProjectAvailabilitySuccessPopup
                userType="agency"
                close={mockClose}
            />,
        );

        expect(screen.getByText(/Client Call/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Keep an eye out for a calendar/i),
        ).toBeInTheDocument();
        agencyConfigTips.forEach(tip => {
            expect(screen.getByText(tip.title)).toBeInTheDocument();
            expect(screen.getByText(tip.description)).toBeInTheDocument();
        });
    });

    it('calls changePage on button click if onClick is not provided', () => {
        render(
            <ProjectAvailabilitySuccessPopup
                userType="client"
                close={mockClose}
            />,
        );

        const button = screen.getByText(clientConfigPopup.completeButtonLabel);
        fireEvent.click(button);

        expect(mockChangePage).toHaveBeenCalledWith(PROJECTS_ROUTE);
    });

    it('calls onClick if provided', () => {
        const mockOnClick = jest.fn();
        render(
            <ProjectAvailabilitySuccessPopup
                userType="client"
                onClick={mockOnClick}
                close={mockClose}
            />,
        );

        const button = screen.getByText(clientConfigPopup.completeButtonLabel);
        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalled();
    });

    it('renders nothing if userType is null', () => {
        const { container } = render(
            <ProjectAvailabilitySuccessPopup
                userType={null}
                close={mockClose}
            />,
        );

        expect(container).toBeEmptyDOMElement();
    });
});
