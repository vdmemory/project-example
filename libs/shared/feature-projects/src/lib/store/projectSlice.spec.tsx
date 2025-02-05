import slice, { sliceActions } from './projectsSlice';

jest.mock('@breef/shared/utils', () => ({
    removeStorageData: jest.fn(),
    getStorageData: jest.fn(),
}));

jest.mock('../utils/getOldUserValue', () => ({
    getOldUserValue: jest.fn().mockReturnValue(false),
    removeOldUserValue: jest.fn(),
}));

describe('projectDetails slice', () => {
    const initialState = {
        dashboardIsLoaded: true,
        onboardingCompleted: false,
        isOldUser: false,
        emailUser: '',
        isDisabledPayments: false,
        brandLead: null,
    };

    it('should return the initial state', () => {
        expect(slice(undefined, { type: undefined })).toEqual(initialState);
    });

    it('should handle setOnboardingCompleted', () => {
        const nextState = slice(
            initialState,
            sliceActions.setOnboardingCompleted(),
        );
        expect(nextState.onboardingCompleted).toBe(true);
    });

    it('should handle resetFieldOldUser', () => {
        const nextState = slice(initialState, sliceActions.resetFieldOldUser());
        expect(nextState.isOldUser).toBe(false);
        expect(
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('../utils/getOldUserValue').removeOldUserValue,
        ).toHaveBeenCalled();
    });

    it('should handle setDashboardIsLoaded', () => {
        const nextState = slice(
            initialState,
            sliceActions.setDashboardIsLoaded(),
        );
        expect(nextState.dashboardIsLoaded).toBe(true);
    });

    // describe('extra reducers', () => {});
});
