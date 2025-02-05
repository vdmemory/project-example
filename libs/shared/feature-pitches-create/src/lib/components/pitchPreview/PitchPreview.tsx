import { IsInterestedProject, PROJECTS_ROUTE } from '@breef/shared/constants';
import { PitchPreviewResponse, PassReasonsListType } from '@breef/shared/types';
import {
    Header,
    HeaderNav,
    Popup,
    ReviewProjectCreation,
    StartPitchPopup,
    usePopup,
} from '@breef/shared/ui-components';
import React, { Fragment, useEffect, useState } from 'react';
import { StyledPitchPreview, StyledSection } from './PitchPreview.styled';
import { motion } from 'framer-motion';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { ChoiceOfInterestForm } from './choiceOfInterestForm/ChoiceOfInterestForm';
import { getPopupStylePreset } from './choiceOfInterestForm/ChoiceOfInterestForm.styled';
import {
    useGetPassReasonsQuery,
    useLazyGetPitchPreviewQuery,
    useSetTermsForPitchMutation,
} from '@breef/shared/data-access-pitch-create';
import { useController, useForm } from 'react-hook-form';
import { PitchTermsFormType } from '../../types/pitchTermsFormType';
import { yupResolver } from '@hookform/resolvers/yup';
import { pitchCreateModalSchema } from '../../utils/pichCreateModalSchema';
import { toast } from 'react-toastify';
import { PitchTermsForm } from './pitchTermsForm/PitchTermsForm';
import NavigationSection from '../pitchCreate/navigationSection/NavigationSection';
import { Button, CheckMarkSmallIcon, CloseSmallIcon } from '@breef/ui-kit';
import { ClockIcon, CloseIcon } from '@breef/shared/assets';

type ProjectToPitchType = {
    isAccept: boolean;
    pitchPreview: PitchPreviewResponse;
    projectId: number;
    onChoiceOfInterest: (
        isInterested: IsInterestedProject,
        passReasons?: PassReasonsListType[],
    ) => void;
    isSubmittedInterest?: boolean;
    step: number;
    stepsCount: number;
};

const PitchPreview: React.FC<ProjectToPitchType> = ({
    isAccept,
    onChoiceOfInterest,
    pitchPreview,
    projectId,
    isSubmittedInterest,
    step,
    stepsCount,
}) => {
    const { data: passReasonsList } = useGetPassReasonsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const pitchTermsPopupControl = usePopup();
    const choiceOfInterestPopupControl = usePopup();
    const [wasOpenTermsPopup, setWasOpenTermsPopup] = useState(false);
    const { changePage } = useRouteControl();
    const { isMobile } = useMediaContext();
    const [innerHeight, setInnerHeight] = useState('0px');

    // choice of interest

    const handleOpenPopup = (id?: number) => {
        setInnerHeight(window.innerHeight + 'px');
        choiceOfInterestPopupControl.open();
    };

    const handleNotInterestingPitch = (passReasons: PassReasonsListType[]) => {
        onChoiceOfInterest(IsInterestedProject.NotInterested, passReasons);
    };

    const handleSubmitPitch = () => {
        onChoiceOfInterest(IsInterestedProject.Interested);
    };

    useEffect(() => {
        if (!isAccept) {
            pitchTermsPopupControl.open();
            setWasOpenTermsPopup(true);
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!pitchTermsPopupControl.isOpen && !isAccept && wasOpenTermsPopup) {
            changePage(PROJECTS_ROUTE);
        }
        //eslint-disable-next-line
    }, [pitchTermsPopupControl.isOpen, isAccept]);

    const renderPopUpChoiceOfInterest = () => (
        <Fragment>
            <HeaderNav key="header-nav" />
            <Popup
                key={'popup-choice-of-interest'}
                isClosable={false}
                style={getPopupStylePreset(isMobile, innerHeight)}
            >
                <ChoiceOfInterestForm
                    list={passReasonsList || []}
                    onClose={choiceOfInterestPopupControl.close}
                    onSubmit={passReasons =>
                        handleNotInterestingPitch(passReasons)
                    }
                    isSubmitted={isSubmittedInterest}
                />
            </Popup>
        </Fragment>
    );

    // terms of pitch

    const title = `You’re Invited!`;
    const description = `We’re excited to share a new project opportunity.`;

    const [fetchSetTerms] = useSetTermsForPitchMutation();
    const [fetchGetPitchPreview] = useLazyGetPitchPreviewQuery();
    const [isLoadingTerms, setIsLoadingTerms] = useState(false);

    const handleConfirmAccept = async () => {
        setIsLoadingTerms(true);
        try {
            await fetchSetTerms({
                id: projectId,
                accepted_terms: acceptField.value,
                agree_with_deadline: acceptField.value,
            }).unwrap();

            const res = await fetchGetPitchPreview(projectId).unwrap();
            if (res.isAcceptedTerms) {
                setIsLoadingTerms(false);
                pitchTermsPopupControl.close();
            }
        } catch (error) {
            console.log('error', error);
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setIsLoadingTerms(false);
        }
    };

    const methods = useForm<PitchTermsFormType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            accept: false,
        },
        resolver: yupResolver(pitchCreateModalSchema),
    });

    const acceptField = useController<PitchTermsFormType>({
        name: 'accept',
        control: methods.control,
        rules: { required: true },
    }).field;

    useEffect(() => {
        methods.trigger('accept');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acceptField.value]);

    const renderPopupStartFinishPitch = () => (
        <StartPitchPopup
            title={title}
            description={description}
            onClose={() => pitchTermsPopupControl.close()}
            onSubmit={handleConfirmAccept}
            isSubmitted={isLoadingTerms}
            isDisabled={!acceptField.value}
            buttonTitle="Review Project"
        >
            <PitchTermsForm
                checked={acceptField.value}
                onChange={acceptField.onChange}
                isSubmitted={isLoadingTerms}
            />
        </StartPitchPopup>
    );

    return (
        <StyledPitchPreview isAccept={isAccept}>
            {pitchTermsPopupControl.isOpen && renderPopupStartFinishPitch()}
            <Header hideButton />
            <StyledSection>
                <div className="row-group">
                    <h2 className="title">Review Project Scope</h2>
                    <p className="subtitle">
                        {!isMobile
                            ? 'Learn more about the client and project before submitting a pitch.'
                            : 'Learn more about the client + project.'}
                    </p>
                    <div className="divider" />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ReviewProjectCreation
                        data={pitchPreview}
                        budgetTooltip="Includes Breef's 15% referral fee"
                    />
                </motion.div>
            </StyledSection>

            {isAccept && (
                <Fragment>
                    {choiceOfInterestPopupControl.isOpen &&
                        renderPopUpChoiceOfInterest()}
                    <NavigationSection
                        onBack={() => changePage(PROJECTS_ROUTE)}
                        step={step - 1}
                        stepsCount={stepsCount}
                    >
                        <div className="buttons-group">
                            <Button
                                label="Not Interested"
                                onClick={() => handleOpenPopup()}
                                variant="outlined"
                                isDisabled={false}
                                size="small"
                                icon={<CloseIcon />}
                                iconPlacement="left"
                            />
                            <Button
                                label="Submit Pitch"
                                onClick={handleSubmitPitch}
                                isDisabled={false}
                                size="small"
                                icon={<CheckMarkSmallIcon />}
                                iconPlacement="left"
                            />
                        </div>
                    </NavigationSection>
                </Fragment>
            )}
        </StyledPitchPreview>
    );
};
export default PitchPreview;
