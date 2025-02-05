import { renderHook } from '@testing-library/react-hooks';
import { useStepperControl } from './useStepperControl';
import {
    useProjectCreateActions,
    useProjectCreateSelector,
} from '../store/hooks';
import { useRouteControl } from '@breef/shared/hooks';
import { PROJECTS_ROUTE, ProjectStep } from '@breef/shared/constants';

const setStep = jest.fn();
const changePage = jest.fn();
const openCreatePasswordPopup = jest.fn();

jest.mock('../store/hooks');
jest.mock('@breef/shared/hooks');

describe('useStepperControl', () => {
    beforeEach(() => {
        window.scroll = jest.fn();
        (useProjectCreateActions as jest.Mock).mockReturnValue({ setStep });
        (useRouteControl as jest.Mock).mockReturnValue({ changePage });
        (useProjectCreateSelector as jest.Mock).mockReturnValue({
            projectCreate: {
                step: 1,
                isPenMode: false,
                user: { needsPassword: true },
            },
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should handleNext correctly when not in pen mode', () => {
        const { result } = renderHook(() =>
            useStepperControl({ openCreatePasswordPopup }),
        );
        result.current.handleNext();
        expect(setStep).toHaveBeenCalledWith({ step: 2 });
    });
    it('should handleNext correctly when in pen mode', () => {
        (useProjectCreateSelector as jest.Mock).mockReturnValue({
            projectCreate: {
                step: 1,
                isPenMode: true,
                user: { needsPassword: true },
            },
        });
        const { result } = renderHook(() =>
            useStepperControl({ openCreatePasswordPopup }),
        );
        result.current.handleNext();
        expect(setStep).toHaveBeenCalledWith({ step: ProjectStep.REVIEW });
    });

    it('should handleBack correctly when step is 1 and user has no password', () => {
        (useProjectCreateSelector as jest.Mock).mockReturnValue({
            projectCreate: {
                step: 1,
                isPenMode: false,
                user: { needsPassword: true },
            },
        });
        const { result } = renderHook(() =>
            useStepperControl({ openCreatePasswordPopup }),
        );
        result.current.handleBack();

        expect(openCreatePasswordPopup).toHaveBeenCalled();
        expect(changePage).not.toHaveBeenCalled();
        expect(setStep).not.toHaveBeenCalled();
        expect(window.scroll).toHaveBeenCalledWith(0, 0);
    });

    it('should handleBack correctly when step is 1 and user has password', () => {
        (useProjectCreateSelector as jest.Mock).mockReturnValue({
            projectCreate: {
                step: 1,
                isPenMode: false,
                user: { needsPassword: false },
            },
        });
        const { result } = renderHook(() =>
            useStepperControl({ openCreatePasswordPopup }),
        );

        result.current.handleBack();

        expect(openCreatePasswordPopup).not.toHaveBeenCalled();
        expect(changePage).toHaveBeenCalledWith(PROJECTS_ROUTE);
        expect(setStep).not.toHaveBeenCalled();
        expect(window.scroll).toHaveBeenCalledWith(0, 0);
    });

    it('should handleBack correctly when not in pen mode and step is greater than 1', () => {
        (useProjectCreateSelector as jest.Mock).mockReturnValue({
            projectCreate: {
                step: 2,
                isPenMode: false,
                user: { needsPassword: true },
            },
        });
        const { result } = renderHook(() =>
            useStepperControl({ openCreatePasswordPopup }),
        );
        result.current.handleBack();
        expect(setStep).toHaveBeenCalledWith({ step: 1 });
        expect(window.scroll).toHaveBeenCalledWith(0, 0);
    });

    it('should return setStep and step correctly', () => {
        (useProjectCreateSelector as jest.Mock).mockReturnValue({
            projectCreate: {
                step: 2,
                isPenMode: false,
                user: { needsPassword: true },
            },
        });
        const { result } = renderHook(() =>
            useStepperControl({ openCreatePasswordPopup }),
        );

        expect(result.current.setStep).toBe(setStep);
        expect(result.current.step).toBe(2);
    });
});
