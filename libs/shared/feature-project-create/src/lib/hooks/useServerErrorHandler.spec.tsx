import { renderHook, act } from '@testing-library/react-hooks';
import { toast } from 'react-toastify';
import {
    ServerErrorKeys,
    SeverErrorData,
    useServerErrorHandler,
} from './useServerErrorHandler';
import { ProjectStep } from '@breef/shared/constants';
import { MethodsProjectCreateType } from '../types/projectCreateTypes';

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

const setStep = jest.fn();
const methods = {
    projectScope: {
        setError: jest.fn(),
    },
    agencyPreferences: {
        setError: jest.fn(),
    },
    personalizeScope: {
        setError: jest.fn(),
    },
    companyDetails: {
        setError: jest.fn(),
    },
} as unknown as MethodsProjectCreateType;

const mockProps = {
    setStep,
    methods,
};

describe('useServerErrorHandler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should handle company details errors', () => {
        const errorData: SeverErrorData = {
            [ServerErrorKeys.companyName]: 'Company name is required',
        };

        const { result } = renderHook(() => useServerErrorHandler(mockProps));

        result.current.handleServerErrorsCompanyDetails(errorData);

        expect(toast.error).toHaveBeenCalledWith(
            'Something went wrong when saving project.',
            { toastId: 'Something went wrong when saving project.' },
        );
    });

    it('should handle project scope errors and set step', () => {
        const errorData: SeverErrorData = {
            [ServerErrorKeys.startDay]: 'Start day is required',
        };

        const { result } = renderHook(() => useServerErrorHandler(mockProps));

        result.current.handleServerErrors(errorData);

        expect(methods.projectScope.setError).toHaveBeenCalledWith('startDay', {
            type: 'server',
            message: 'Start day is required',
        });
        expect(toast.error).toHaveBeenCalledWith(
            'Project timing: Start day is required',
        );
        expect(setStep).toHaveBeenCalledWith({
            step: ProjectStep.PROJECT_SCOPE,
        });
    });

    it('should handle agency preferences errors and set step', () => {
        const errorData: SeverErrorData = {
            [ServerErrorKeys.agencyLocation]: 'Agency location is required',
        };

        const { result } = renderHook(() => useServerErrorHandler(mockProps));

        result.current.handleServerErrors(errorData);

        expect(methods.agencyPreferences.setError).toHaveBeenCalledWith(
            'agencyLocation',
            { type: 'server', message: 'Agency location is required' },
        );
        expect(toast.error).toHaveBeenCalledWith(
            'Agency location: Agency location is required',
        );
        expect(setStep).toHaveBeenCalledWith({
            step: ProjectStep.AGENCY_PREFERENCES,
        });
    });

    it('should handle personalize scope errors and set step', () => {
        const errorData: SeverErrorData = {
            [ServerErrorKeys.description]: 'Description is required',
        };

        const { result } = renderHook(() => useServerErrorHandler(mockProps));

        result.current.handleServerErrors(errorData);

        expect(methods.personalizeScope.setError).toHaveBeenCalledWith(
            'description',
            { type: 'server', message: 'Description is required' },
        );
        expect(toast.error).toHaveBeenCalledWith(
            'Project overview: Description is required',
        );
        expect(setStep).toHaveBeenCalledWith({
            step: ProjectStep.PERSONALIZE_SCOPE,
        });
    });

    it('should handle nested agency skills errors and set step', () => {
        const errorData = {
            [ServerErrorKeys.agencySkills]: [{ note: 'Skill is required' }],
        };

        const { result } = renderHook(() => useServerErrorHandler(mockProps));

        result.current.handleServerErrors(
            errorData as unknown as SeverErrorData,
        );

        expect(toast.error).toHaveBeenCalledWith(
            'Agency skills: Skill is required',
        );
        expect(setStep).toHaveBeenCalledWith({
            step: ProjectStep.PERSONALIZE_SCOPE,
        });
    });

    it('should handle social links errors and set step', () => {
        const errorData: SeverErrorData = {
            [ServerErrorKeys.socialLinks]: 'Social links error',
        };

        const { result } = renderHook(() => useServerErrorHandler(mockProps));

        result.current.handleServerErrors(errorData);

        expect(toast.error).toHaveBeenCalledWith(
            'Something in not right at all at the social links fields.',
        );
        expect(setStep).toHaveBeenCalledWith({
            step: ProjectStep.COMPANY_DETAILS,
        });
    });

    it('should handle generic server errors', () => {
        const errorData: SeverErrorData = {};

        const { result } = renderHook(() => useServerErrorHandler(mockProps));

        result.current.handleServerErrors(errorData);

        expect(toast.error).toHaveBeenCalledWith(
            'Something went wrong when saving project.',
            { toastId: 'Something went wrong when saving project.' },
        );
    });
});
