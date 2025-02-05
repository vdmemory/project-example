import { STEP_CONTROL } from '@breef/shared/constants';
import { useRouterParams, useRouteControl } from '@breef/shared/hooks';

export const useStepperControlQuery = ({
    numberSteppersStepsArray,
}: {
    numberSteppersStepsArray?: number[];
}) => {
    const { query, router } = useRouterParams();
    const { changeQueryParams } = useRouteControl();
    const step = Number(query.step);
    const stepper = Number(query.stepper);

    const handleChangeStep = (action: STEP_CONTROL) => {
        if (action === STEP_CONTROL.increment)
            changeQueryParams(
                step === numberSteppersStepsArray?.[stepper - 1]
                    ? { stepper: stepper + 1, step: 1 }
                    : { ...router.query, step: step + 1 },
            );
        if (action === STEP_CONTROL.decrement)
            changeQueryParams(
                step === 1 && stepper > 1
                    ? {
                          stepper: stepper - 1,
                          step: numberSteppersStepsArray?.[stepper - 2],
                      }
                    : { ...router.query, step: step - 1 },
            );
    };
    return { step, stepper, handleChangeStep };
};
