/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { act, renderHook } from '@testing-library/react-hooks';
import { useActionButtonProjectConfig } from './useActionButtonProjectConfig';

jest.mock('@breef/shared/utils', () => ({
    ...jest.requireActual('@breef/shared/utils'), // if you need to use actual other utils
    linkClick: jest.fn(),
}));

jest.mock('../useRouteControl/useRouteControl', () => ({
    useRouteControl: () => ({
        changePage: jest.fn(),
    }),
}));

describe('useActionButtonProjectConfig', () => {
    it('should provide client project action button statuses with correct data', () => {
        const { result } = renderHook(() =>
            useActionButtonProjectConfig({
                isReviewedPitches: true,
                projectName: 'Project Alpha',
                toggleAgencySelectionPopup: jest.fn(),
                toggleBeforeKickoffPopup: jest.fn(),
                toggleProjectAvailabilityPopup: jest.fn(),
                togglePitchesReviewPopup: jest.fn(),
                firstName: 'John',
                calendlyLink: 'http://calendly.com/example',
                isDisabledPayments: false,
            }),
        );

        expect(
            result.current.clientProjectActionButtonStatuses.postProject
                ?.description,
        ).toEqual('Project Alpha');
        expect(
            result.current.agencyProjectActionButtonStatuses.reviewAndPitch
                ?.text,
        ).toEqual('Review Project');
    });

    it('should handle different project status correctly', () => {
        const { result } = renderHook(() =>
            useActionButtonProjectConfig({
                isReviewedPitches: false,
                projectName: 'Project Beta',
                toggleAgencySelectionPopup: jest.fn(),
                toggleBeforeKickoffPopup: jest.fn(),
                toggleProjectAvailabilityPopup: jest.fn(),
                togglePitchesReviewPopup: jest.fn(),
                firstName: 'Alice',
                calendlyLink: 'http://calendly.com/test',
                isDisabledPayments: true,
            }),
        );

        expect(
            result.current.clientProjectActionButtonStatuses.reviewPitches
                ?.text,
        ).toEqual('Review Pitches');
        // Check toggling behavior
        expect(
            result.current.clientProjectActionButtonStatuses.updateAvailability
                ?.nextStep,
        ).toEqual('Meet Agencies');
        // Simulate method interaction
        const toggleSpy = jest.spyOn(
            result.current.clientProjectActionButtonStatuses
                .updateAvailability as any,
            'onClick',
        );
        // @ts-ignore
        result.current.clientProjectActionButtonStatuses.updateAvailability.onClick(
            { projectId: 5 },
        );
        expect(toggleSpy).toHaveBeenCalled();
    });
});

jest.mock('../useRouteControl/useRouteControl', () => ({
    useRouteControl: () => ({
        changePage: jest.fn(),
    }),
}));

window.open = jest.fn();

// Mocking toggle functions if they are props or from context
const mockToggleAgencySelectionPopup = jest.fn();
const mockToggleBeforeKickoffPopup = jest.fn();
const mockToggleProjectAvailabilityPopup = jest.fn();
const mockTogglePitchesReviewPopup = jest.fn();

describe('useActionButtonProjectConfig onClick handlers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call toggle functions when respective onClicks are triggered', () => {
        const { result } = renderHook(() =>
            useActionButtonProjectConfig({
                toggleAgencySelectionPopup: mockToggleAgencySelectionPopup,
                toggleBeforeKickoffPopup: mockToggleBeforeKickoffPopup,
                toggleProjectAvailabilityPopup:
                    mockToggleProjectAvailabilityPopup,
                togglePitchesReviewPopup: mockTogglePitchesReviewPopup,
            }),
        );

        (
            result.current.clientProjectActionButtonStatuses.selectAgency as any
        ).onClick();
        expect(mockToggleAgencySelectionPopup).toHaveBeenCalled();

        (
            result.current.clientProjectActionButtonStatuses
                .completeKickoff as any
        ).onClick();
        expect(mockToggleBeforeKickoffPopup).toHaveBeenCalled();

        // Test all other onClicks

        (
            result.current.clientProjectActionButtonStatuses
                .awaitingKickoff as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.clientProjectActionButtonStatuses
                .completeReview as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.clientProjectActionButtonStatuses.completed as any
        ).onClick({
            projectId: 1,
        });

        (result.current.clientProjectActionButtonStatuses.other as any).onClick(
            {
                projectId: 1,
            },
        );

        (
            result.current.clientProjectActionButtonStatuses.postProject as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.clientProjectActionButtonStatuses
                .reviewPitches as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.clientProjectActionButtonStatuses.reviewScope as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.clientProjectActionButtonStatuses
                .setAvailability as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.clientProjectActionButtonStatuses
                .shortlistAgencies as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.clientProjectActionButtonStatuses.viewProject as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.clientProjectActionButtonStatuses
                .submitPayment as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.clientProjectActionButtonStatuses
                .submitPayment as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.agencyProjectActionButtonStatuses
                .reviewAndPitch as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.agencyProjectActionButtonStatuses
                .finalizeAndSubmit as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.agencyProjectActionButtonStatuses
                .updateMeeting as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.agencyProjectActionButtonStatuses
                .finalizeContract as any
        ).onClick({
            projectId: 1,
        });

        (
            result.current.agencyProjectActionButtonStatuses
                .paymentDetails as any
        ).onClick({
            projectId: 1,
        });
    });

    it('should trigger the correct popup based on reviews state', () => {
        const { result } = renderHook(() =>
            useActionButtonProjectConfig({
                isReviewedPitches: false,
                toggleAgencySelectionPopup: mockToggleAgencySelectionPopup,
                toggleBeforeKickoffPopup: mockToggleBeforeKickoffPopup,
                toggleProjectAvailabilityPopup:
                    mockToggleProjectAvailabilityPopup,
                togglePitchesReviewPopup: mockTogglePitchesReviewPopup,
            }),
        );

        act(() => {
            (
                result.current.clientProjectActionButtonStatuses
                    .reviewPitches as any
            ).onClick({
                projectId: 1,
            });
        });
        expect(mockTogglePitchesReviewPopup).toHaveBeenCalled();
        expect(mockToggleAgencySelectionPopup).not.toHaveBeenCalled();

        jest.clearAllMocks();

        const { result: resultReviewed } = renderHook(() =>
            useActionButtonProjectConfig({
                isReviewedPitches: true,
                toggleAgencySelectionPopup: mockToggleAgencySelectionPopup,
                toggleBeforeKickoffPopup: mockToggleBeforeKickoffPopup,
                toggleProjectAvailabilityPopup:
                    mockToggleProjectAvailabilityPopup,
                togglePitchesReviewPopup: mockTogglePitchesReviewPopup,
            }),
        );

        act(() => {
            (
                resultReviewed.current.clientProjectActionButtonStatuses
                    .reviewPitches as any
            ).onClick({ projectId: 1 });
        });
        expect(mockTogglePitchesReviewPopup).not.toHaveBeenCalled();
        expect(mockToggleAgencySelectionPopup).not.toHaveBeenCalled();
    });
});
