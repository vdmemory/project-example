import { Button, MultiProgressBar, Stepper } from '@breef/shared/ui-components';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Agencies from './agencyes/Agencies';
import { StyledSectionSection } from './AgencySelection.styled';
import { progressBarConfig } from './configs/progressBarConfig';
import WhatsNext from './whatsNext/WhatsNext';
import { PROJECTS_ROUTE } from '@breef/shared/constants';
import { useSendSelectedAgencyMutation } from '@breef/shared/data-access-project';
import { toast } from 'react-toastify';
import {
    ValidationErrorMessageMethodValueType,
    ValidationErrorType,
    validationErrorMessages,
} from '@breef/shared/utils';
import { useMethodControl } from '../hooks/useMethodControl';

type Stepper = {
    mainStep: number;
    subStep: number;
};

type Props = {
    agenciesList: {
        id: number;
        companyName: string;
        companyLogo: string;
        companyLocation: string;
    }[];
    stepper: Stepper;
    setStepper: (step: Stepper) => void;
    brandLead: {
        firstName: string;
        lastName: string;
        logoUrl: string;
    };
};

const AgencySelection: React.FC<Props> = ({
    agenciesList,
    stepper,
    setStepper,
    brandLead,
}) => {
    const router = useRouter();
    const numberSteppersStepsArray = [1, 1];

    const { handleIncrement, handleSelectAgency, selectedItem, isLoading } =
        useMethodControl({
            stepper,
            setStepper,
        });

    useEffect(() => {
        if (!agenciesList.length) {
            router.push(PROJECTS_ROUTE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agenciesList]);

    return (
        <StyledSectionSection>
            <MultiProgressBar
                config={progressBarConfig}
                step={1}
                stepper={stepper.subStep}
                numberSteppersSteps={numberSteppersStepsArray}
                isScrollableBarOnMobile
            />

            <Stepper
                className="stepper"
                mode="stepper"
                validationSteps={[false]}
                step={stepper.subStep}
                setStep={() => undefined}
                numberSteppersStepsArray={numberSteppersStepsArray}
            >
                <Agencies
                    step={stepper.mainStep}
                    subStep={stepper.subStep}
                    agenciesList={agenciesList}
                    handleSelectAgency={handleSelectAgency}
                    selectedItem={selectedItem}
                    brandLead={brandLead}
                />
                <WhatsNext step={stepper.mainStep} subStep={stepper.subStep} />
            </Stepper>

            <div className="footer">
                <Button
                    isSubmitting={isLoading}
                    title={
                        stepper.mainStep === 2 && stepper.subStep === 2
                            ? 'Dashboard'
                            : 'Next'
                    }
                    type="button"
                    className="normal"
                    arrowRight
                    withAnimate
                    onClick={handleIncrement}
                    disabled={selectedItem === null || !selectedItem.length}
                />
            </div>
        </StyledSectionSection>
    );
};
export default AgencySelection;
