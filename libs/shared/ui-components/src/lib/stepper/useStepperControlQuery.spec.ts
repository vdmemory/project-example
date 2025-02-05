import { renderHook, act } from '@testing-library/react-hooks';
import { useStepperControlQuery } from './useStepperControlQuery';
import { STEP_CONTROL } from '@breef/shared/constants';
import { useRouterParams, useRouteControl } from '@breef/shared/hooks';

jest.mock('@breef/shared/hooks', () => ({
    useRouterParams: jest.fn(),
    useRouteControl: jest.fn(),
}));

describe('useStepperControlQuery', () => {
    let changeQueryParamsMock: jest.Mock;
    let routerParamsMock: any;

    beforeEach(() => {
        changeQueryParamsMock = jest.fn();
        routerParamsMock = {
            query: {
                step: '1',
                stepper: '1',
            },
            router: {
                query: {
                    step: '1',
                    stepper: '1',
                },
            },
        };

        (useRouterParams as jest.Mock).mockReturnValue(routerParamsMock);
        (useRouteControl as jest.Mock).mockReturnValue({
            changeQueryParams: changeQueryParamsMock,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should increment step', () => {
        const { result } = renderHook(() =>
            useStepperControlQuery({
                numberSteppersStepsArray: [2, 3],
            }),
        );

        act(() => {
            result.current.handleChangeStep(STEP_CONTROL.increment);
        });

        expect(changeQueryParamsMock).toHaveBeenCalledWith({
            step: 2,
            stepper: '1',
        });
    });

    it('should decrement step', () => {
        routerParamsMock.query.step = '2';
        routerParamsMock.router.query.step = '2';

        const { result } = renderHook(() =>
            useStepperControlQuery({
                numberSteppersStepsArray: [2, 3],
            }),
        );

        act(() => {
            result.current.handleChangeStep(STEP_CONTROL.decrement);
        });

        expect(changeQueryParamsMock).toHaveBeenCalledWith({
            step: 1,
            stepper: '1',
        });
    });

    it('should increment step and stepper', () => {
        routerParamsMock.query.step = '2';
        routerParamsMock.router.query.step = '2';

        const { result } = renderHook(() =>
            useStepperControlQuery({
                numberSteppersStepsArray: [2, 3],
            }),
        );

        act(() => {
            result.current.handleChangeStep(STEP_CONTROL.increment);
        });

        expect(changeQueryParamsMock).toHaveBeenCalledWith({
            stepper: 2,
            step: 1,
        });
    });

    it('should decrement step and stepper', () => {
        routerParamsMock.query.step = '1';
        routerParamsMock.query.stepper = '2';
        routerParamsMock.router.query.step = '1';
        routerParamsMock.router.query.stepper = '2';

        const { result } = renderHook(() =>
            useStepperControlQuery({
                numberSteppersStepsArray: [2, 3],
            }),
        );

        act(() => {
            result.current.handleChangeStep(STEP_CONTROL.decrement);
        });

        expect(changeQueryParamsMock).toHaveBeenCalledWith({
            stepper: 1,
            step: 2,
        });
    });
});
