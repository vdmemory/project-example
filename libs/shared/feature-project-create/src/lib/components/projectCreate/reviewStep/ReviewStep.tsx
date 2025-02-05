import React, { FC, Fragment, useEffect, useState } from 'react';
import {
    globalStyles,
    StyledFooterMobile,
    StyledReviewStep,
} from './ReviewStep.styled';
import { Button } from '@breef/ui-kit';
import { PROJECTS_ROUTE, ProjectStep } from '@breef/shared/constants';
import {
    PreferencesFormType,
    ProjectCreationFormType,
} from '../../../types/projectCreateTypes';
import {
    useProjectCreateActions,
    useProjectCreateSelector,
} from '../../../store/hooks';
import {
    BookACallModifiedPopup,
    CreatePasswordPopup,
    ReviewProjectCreation,
    SuccessPopup,
    usePopup,
} from '@breef/shared/ui-components';
import { Global } from '@emotion/react';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { ActionTip } from './actionTip/ActionTip';
import { Call27x27Icon, Pitches27x27Icon } from '@breef/shared/assets';
import { ActionQuestion } from './actionQuestion/ActionQuestion';
import { HelpUsPopup } from './helpUsPopup/HelpUsPopup';
import { SeverErrorData } from '../../../hooks/useServerErrorHandler';
import { UseFormReturn } from 'react-hook-form';

interface ReviewStepProps {
    projectData: ProjectCreationFormType & {
        agenciesAdvantages?: { id: number; name: string }[];
    };
    projectId?: number;
    onSubmit: () => void;
    onSaveExit: () => void;
    handleServerErrors: (error: SeverErrorData) => void;
    methodsAgencyPreferences: UseFormReturn<PreferencesFormType>;
}

export const ReviewStep: FC<ReviewStepProps> = ({
    projectData,
    projectId,
    onSubmit,
    onSaveExit,
    handleServerErrors,
    methodsAgencyPreferences,
}) => {
    const {
        isSubmitting,
        isSubmittingSaveExit,
        isPenMode,
        profile: { brandLead },
        user: { needsPassword },
    } = useProjectCreateSelector(state => state).projectCreate;
    const { setStep, setPenMode, resetPenMode } = useProjectCreateActions();

    const [isSelectMeeting, setSelectMeeting] = useState(false);
    const [isHelpUsPopup, setIsHelpUsPopup] = useState(false);
    const { isMobile } = useMediaContext();
    const { changePage } = useRouteControl();
    const bookACallPopupControl = usePopup();
    const helpUsPopupControl = usePopup();
    const createPasswordPopupControl = usePopup();
    const donePopupControl = usePopup();

    useEffect(() => {
        if (isPenMode) {
            resetPenMode();
        }
    }, []);

    const onEditStep = (step: ProjectStep, elementId?: string) => {
        setStep({ step });
        setPenMode({ isPenMode: true, targetElementId: elementId });
    };

    const renderButtonPost = () => (
        <Button
            className="button-post"
            label="Post Project"
            onClick={onSubmit}
            isSubmitted={isSubmitting}
            isDisabled={isSubmittingSaveExit}
        />
    );

    const renderButtonBookACall = () => (
        <Button
            className="button-book-call"
            label="Book Call"
            variant="outlined"
            onClick={() => {
                setIsHelpUsPopup(!projectData.idealAgencyDescription);
                setSelectMeeting(false);
                bookACallPopupControl.open();
            }}
            isDisabled={isSubmitting || isSubmittingSaveExit}
        />
    );

    const renderFinishProjectQuestion = () => (
        <ActionQuestion
            question="Want to finish later?"
            onClick={onSaveExit}
            linkTitle="Save your project"
            className="save-project-question"
        />
    );

    const renderMobileFooter = () => (
        <StyledFooterMobile>
            {renderButtonBookACall()}
            {renderButtonPost()}
        </StyledFooterMobile>
    );

    const onNextBookCall = () => {
        if (isHelpUsPopup) {
            helpUsPopupControl.open();
        } else if (needsPassword) {
            createPasswordPopupControl.open();
        } else {
            donePopupControl.open();
        }
        bookACallPopupControl.close();
    };

    const onSuccessHelpUs = (values: PreferencesFormType) => {
        methodsAgencyPreferences.reset(values);
        onNextHelpUs();
    };
    const onNextHelpUs = () => {
        (!needsPassword ? donePopupControl : createPasswordPopupControl).open();
        helpUsPopupControl.close();
    };
    const onNextCreatePassword = () => {
        donePopupControl.open();
        createPasswordPopupControl.close();
    };

    const onBackHelpUs = () => {
        bookACallPopupControl.open();
        helpUsPopupControl.close();
    };
    const onBackCreatePassword = () => {
        if (isHelpUsPopup) {
            helpUsPopupControl.open();
        } else {
            bookACallPopupControl.open();
        }
        createPasswordPopupControl.close();
    };

    const redirectToDashboard = () => changePage(PROJECTS_ROUTE);

    return (
        <Fragment>
            <Global styles={globalStyles} />
            {bookACallPopupControl.isOpen && (
                <BookACallModifiedPopup
                    onClose={bookACallPopupControl.close}
                    onSelectMeeting={isSucceeded =>
                        setSelectMeeting(isSucceeded)
                    }
                    selectMeeting={isSelectMeeting}
                    onNext={onNextBookCall}
                />
            )}
            {helpUsPopupControl.isOpen && (
                <HelpUsPopup
                    onBack={onBackHelpUs}
                    projectData={projectData}
                    projectId={projectId}
                    handleServerErrors={handleServerErrors}
                    onSuccessCallbackFn={onSuccessHelpUs}
                    onClose={helpUsPopupControl.close}
                />
            )}
            {createPasswordPopupControl.isOpen && (
                <CreatePasswordPopup
                    close={createPasswordPopupControl.close}
                    onBack={onBackCreatePassword}
                    onClose={createPasswordPopupControl.close}
                    onSuccessCallback={onNextCreatePassword}
                />
            )}
            {donePopupControl.isOpen && (
                <SuccessPopup
                    title="Done!"
                    subtitle="We look forward to connecting soon."
                    buttonTitle="Go to Dashboard"
                    onClick={redirectToDashboard}
                    onClose={donePopupControl.close}
                />
            )}
            <StyledReviewStep>
                <div className="header">
                    <h1>Your Project Scope</h1>
                    <p>
                        Finalize your scope to get pitches from the best
                        agencies.
                    </p>
                </div>
                <div className="review-body-wrapper">
                    <div className="review-section">
                        <ReviewProjectCreation
                            data={{
                                ...projectData,
                                name: projectData.projectTitle,
                            }}
                            onEdit={onEditStep}
                            brandLead={brandLead}
                            className="review-project-scope"
                        />
                        <ActionQuestion
                            question="Want to make changes?"
                            onClick={() =>
                                setStep({ step: ProjectStep.PROJECT_SCOPE })
                            }
                            linkTitle="Edit your scope"
                            className="edit-project-question"
                        />
                    </div>
                    <div className="right-section">
                        <div className="next-step">
                            <span className="next-step-title">Next Step:</span>
                            <span className="next-step-content">
                                Select an option to finish your scope
                            </span>
                        </div>
                        <ActionTip
                            className="tip-post"
                            icon={<Pitches27x27Icon />}
                            title="Post your project"
                            description="Post your project to receive agency pitches in < 5 days. Breef invites the best agencies to your project."
                        >
                            {renderButtonPost()}
                        </ActionTip>
                        <ActionTip
                            className="tip-book-call"
                            icon={<Call27x27Icon />}
                            title="Book a call"
                            description="Finalize your project with a Breef Strategist. This is a great option if this is your first time using Breef."
                        >
                            {renderButtonBookACall()}
                        </ActionTip>
                        {renderFinishProjectQuestion()}
                    </div>
                </div>
                {isMobile && renderFinishProjectQuestion()}
                {renderMobileFooter()}
            </StyledReviewStep>
        </Fragment>
    );
};

export default ReviewStep;
