import {
    BREEF_ARTICLES_BREEFING_ROOM_AGENCY,
    CLIENT_PITCHES_MAKE_INTRO_ROUTER,
    CLIENT_PITCHES_REVIEW_ROUTER,
    PITCH_CREATE_ROUTER,
    PITCH_EDIT_ROUTE,
    PROJECT_BOOK_MEETING_EDIT_ROUTE,
    PROJECT_DASHBOARD_PAYMENTS_ROUTE,
    PROJECT_EDIT_ROUTE,
    PROJECT_KICKOFF_EDIT_ROUTE,
    PROJECT_PAYMENT_CHOICE_ROUTE,
    DASHBOARD_PITCHES_ROUTE,
    DASHBOARD_PAYMENTS_ROUTE,
    DASHBOARD_MEET_ROUTE,
    PROJECT_CREATE_ROUTE,
} from '@breef/shared/constants';
import { useRouteControl } from '../useRouteControl/useRouteControl';
import {
    ctaBubbleImage,
    ctaCloudImage,
    ctaFlowersPinkImage,
    ctaLightningImage,
    ctaManOrangeImage,
    ctaMoneyBlueImage,
} from '@breef/shared/assets';
import {
    agencyProjectActionButtonStatusesType,
    clientProjectActionButtonStatusesType,
} from '@breef/shared/types';
import { linkClick } from '@breef/shared/utils';

enum textButtonNames {
    postProject = 'Post Project',
    reviewScope = 'Book Call',
    reviewPitches = 'Review Pitches',
    completeReview = 'Complete Review',
    shortlistAgencies = 'Meet Agencies',
    setAvailability = 'Set Availability',
    updateAvailability = 'Update Availability',
    selectAgency = 'Select Agency',
    awaitingKickoff = 'View Project',
    completeKickoff = 'Complete Kickoff',
    viewProject = 'View Project',
    submitPayment = 'Make Payment',
    completed = 'Start Project',
    other = 'Browse Articles',
}

export const useActionButtonProjectConfig = ({
    isReviewedPitches = true,
    toggleAgencySelectionPopup,
    toggleBeforeKickoffPopup,
    toggleProjectAvailabilityPopup,
    togglePitchesReviewPopup,
    firstName = '',
    calendlyLink = '',
    projectName = '',
    isDisabledPayments,
}: {
    isTablet?: boolean;
    isProjectTabs?: boolean;
    isReviewedPitches?: boolean;
    toggleAgencySelectionPopup: () => void;
    toggleBeforeKickoffPopup: () => void;
    toggleProjectAvailabilityPopup: () => void;
    togglePitchesReviewPopup: () => void;
    firstName?: string;
    calendlyLink?: string;
    projectName?: string;
    isDisabledPayments?: boolean;
}) => {
    const { changePage } = useRouteControl();

    const clientProjectActionButtonStatuses: clientProjectActionButtonStatusesType =
        {
            postProject: {
                text: textButtonNames.postProject,
                description: projectName,
                descriptionSubtext:
                    'Post your project to receive pitches from the best agencies in < 7 days.',
                brandLeadText: `Hey ${firstName}, let's chat through your project scope together!`,
                nextStep: 'Post Project',
                tag: 'PROJECT IN DRAFT',
                onClick: meta => {
                    changePage(
                        PROJECT_EDIT_ROUTE.reverse({
                            projectId: meta.projectId || 0,
                        }) || '',
                    );
                },
            },
            reviewScope: {
                text: textButtonNames.reviewScope,
                description: projectName,
                descriptionSubtext:
                    'Book a call to review agency pitches with your Marketing Strategist.',
                brandLeadText: `Hey ${firstName}, let's grab time to chat through your pitches together!`,
                nextStep: 'Pitch Review Call',
                tag: 'AWAITING PITCHES',
                onClick: () => {
                    window.open(calendlyLink, '_blank');
                },
            },
            reviewPitches: {
                text: textButtonNames.reviewPitches,
                description: projectName,
                descriptionSubtext:
                    'Your pitches are here! Review pitches and book intros with your favorite agencies.',
                brandLeadText:
                    'Book time to review your pitches together. We’re excited about these!',
                nextStep: 'Pitch Review',
                tag: 'PITCHES SHARED',
                onClick: meta => {
                    !isReviewedPitches
                        ? togglePitchesReviewPopup()
                        : changePage(
                              CLIENT_PITCHES_REVIEW_ROUTER.reverse({
                                  projectId: meta.projectId || 0,
                              }) || '',
                          );
                },
            },
            completeReview: {
                text: textButtonNames.completeReview,
                description: projectName,
                descriptionSubtext:
                    'Complete pitch review to shortlist and meet with your favorite agencies.',
                brandLeadText:
                    'Book time to review your pitches together. We’re excited about these!',
                nextStep: 'Pitch Review',
                tag: 'PITCHES SHARED',
                onClick: meta => {
                    changePage(
                        CLIENT_PITCHES_REVIEW_ROUTER.reverse({
                            projectId: meta.projectId || 0,
                        }) || '',
                    );
                },
            },
            shortlistAgencies: {
                text: textButtonNames.shortlistAgencies,
                description: projectName,
                descriptionSubtext:
                    'You’ve reviewed your pitches. Now share your top picks to schedule intro calls.',
                brandLeadText:
                    "Need help narrowing down your agencies? Let's chat!",
                nextStep: 'Shortlist Agencies',
                tag: 'SHORTLIST AGENCIES',
                onClick: meta => {
                    changePage(
                        CLIENT_PITCHES_MAKE_INTRO_ROUTER.reverse({
                            projectId: meta.projectId || 0,
                        }) || '',
                    );
                },
            },
            setAvailability: {
                text: textButtonNames.setAvailability,
                description: projectName,
                descriptionSubtext:
                    'Share your availability to meet with agencies. You’ll receive calendar invites.',
                brandLeadText:
                    'Excited to hear how your agency intros go! This is the best part.',
                nextStep: 'Meet Agencies',
                tag: 'AGENCY INTROS',
                onClick: toggleProjectAvailabilityPopup,
            },
            updateAvailability: {
                text: textButtonNames.updateAvailability,
                description: projectName,
                descriptionSubtext:
                    'Review your agency pitches + prepare for upcoming meetings.',
                brandLeadText:
                    'Excited to hear how your agency intros go! This is the best part.',
                nextStep: 'Meet Agencies',
                tag: 'AGENCY INTROS',
                onClick: ({ projectId }) => {
                    changePage(
                        DASHBOARD_MEET_ROUTE.reverse({
                            projectId,
                        }) as string,
                    );
                },
            },
            selectAgency: {
                text: textButtonNames.selectAgency,
                description: projectName,
                descriptionSubtext:
                    'Make it official! Let us know which team you’re moving forward with.',
                brandLeadText:
                    "Let's grab time to chat through next steps together.",
                nextStep: 'Agency Selection',
                tag: 'AGENCY SELECTION',
                onClick: toggleAgencySelectionPopup,
            },
            awaitingKickoff: {
                text: textButtonNames.awaitingKickoff,
                description: projectName,
                descriptionSubtext:
                    'Work with your agency to finalize contract, scope of work and payment terms.',
                brandLeadText: `Let me know if you have any questions about project kickoff!`,
                nextStep: 'Finalize Contract',
                tag: 'AWAITING KICKOFF',
                onClick: meta => {
                    changePage(
                        DASHBOARD_PITCHES_ROUTE.reverse({
                            projectId: meta.projectId,
                        }) as string,
                    );
                },
            },
            completeKickoff: {
                text: textButtonNames.completeKickoff,
                description: projectName,
                descriptionSubtext:
                    'Confirm contract details and set up payments through Breef.',
                brandLeadText: `Hi ${firstName}! Don't hesitate to reach out with questions.`,
                nextStep: 'Project Kickoff',
                tag: 'AWAITING KICKOFF',
                onClick: toggleBeforeKickoffPopup,
            },
            viewProject: {
                text: textButtonNames.viewProject,
                description: projectName,
                descriptionSubtext:
                    'Your payment is almost due. Review your contract and upcoming project payments.',
                brandLeadText: 'Excited to work on your next project soon!',
                nextStep: 'Payment Due Soon',
                tag: 'PROJECT IN PROGRESS',
                onClick: ({ projectId }) => {
                    changePage(
                        DASHBOARD_PAYMENTS_ROUTE.reverse({
                            projectId,
                        }) as string,
                    );
                },
            },
            submitPayment: {
                text: textButtonNames.submitPayment,
                description: projectName,
                descriptionSubtext:
                    'Your next payment is due. Review and make payment below.',
                brandLeadText: 'Excited to work on your next project soon!',
                nextStep: 'Payment Due',
                tag: 'PROJECT IN PROGRESS',
                onClick: meta => {
                    changePage(
                        PROJECT_PAYMENT_CHOICE_ROUTE.reverse({
                            projectId: meta.projectId || 0,
                            paymentId: meta.paymentId || 0,
                        }) || '',
                    );
                },
                isAccessDenied: isDisabledPayments,
            },
            completed: {
                text: textButtonNames.completed,
                description: projectName,
                descriptionSubtext:
                    'Scope your next project in minutes. Receive pitches from the best agencies.',
                brandLeadText:
                    "Let's jump on a call to chat about upcoming projects!",
                nextStep: '',
                tag: 'FIND AN AGENCY',
                onClick: () => changePage(PROJECT_CREATE_ROUTE),
            },
            other: {
                text: textButtonNames.other,
                description: 'BROWSE ARTICLES',
                descriptionSubtext:
                    'Learn more about marketing trends & topics on The Breefing Room!',
                brandLeadText: 'Let me know if you have any questions!',
                nextStep: '',
                tag: 'LEARN MORE',
                onClick: () => {
                    linkClick('https://breef.com/breefing-room/posts');
                },
            },
        };

    const agencyProjectActionButtonStatuses: agencyProjectActionButtonStatusesType =
        {
            reviewAndPitch: {
                text: 'Review Project',
                description: 'YOU HAVE A NEW PROJECT!',
                onClick: meta => {
                    changePage(
                        PITCH_CREATE_ROUTER.reverse({
                            projectId: meta.projectId || 0,
                        }) || '',
                    );
                },
                imageConfig: {
                    imageUrl: ctaManOrangeImage.src,
                    position: {
                        right: 0,
                        bottom: 12,
                    },
                },
            },
            finalizeAndSubmit: {
                text: 'Review Project',
                description: 'SUBMIT YOUR PITCH',
                onClick: meta => {
                    changePage(
                        PITCH_EDIT_ROUTE.reverse({
                            projectId: meta.projectId || 0,
                            pitchId: meta.pitchId || 0,
                        }) || '',
                    );
                },
                imageConfig: {
                    imageUrl: ctaBubbleImage.src,
                    position: {
                        right: -34,
                        bottom: 20,
                    },
                },
            },
            clientReview: {
                text: (
                    <span>
                        <a
                            href={BREEF_ARTICLES_BREEFING_ROOM_AGENCY}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Browse&nbsp; Articles
                        </a>
                    </span>
                ),
                description: 'NOTHING TO DO @ THE MOMENT',
                descriptionMore:
                    'Below is everything you need to keep your project on track.',
                imageConfig: {
                    imageUrl: ctaCloudImage.src,
                    position: {
                        right: -11,
                        bottom: 22,
                    },
                },
            },
            introCall: {
                text: (
                    <span>
                        <a
                            href={BREEF_ARTICLES_BREEFING_ROOM_AGENCY}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Browse&nbsp; Articles
                        </a>
                    </span>
                ),
                description: "CONGRATS, YOU'VE BEEN SHORTLISTED",
                descriptionMore:
                    'Below is everything you need to keep your project on track.',
                imageConfig: {
                    imageUrl: ctaFlowersPinkImage.src,
                    position: {
                        right: 2,
                        bottom: 4,
                    },
                },
            },
            setMeeting: {
                text: 'Book Meeting',
                description: 'BOOK INTRO CALL',
                onClick: toggleProjectAvailabilityPopup,
                descriptionMore:
                    'Below is everything you need to keep your project on track.',
                imageConfig: {
                    imageUrl: ctaFlowersPinkImage.src,
                    position: {
                        right: 2,
                        bottom: 4,
                    },
                },
            },
            updateMeeting: {
                text: 'Update Meeting',
                description: 'BOOK INTRO CALL',
                onClick: ({ projectId }) => {
                    changePage(
                        PROJECT_BOOK_MEETING_EDIT_ROUTE.reverse({
                            projectId,
                        }) || '',
                    );
                },
                descriptionMore:
                    'Below is everything you need to keep your project on track.',
                imageConfig: {
                    imageUrl: ctaFlowersPinkImage.src,
                    position: {
                        right: 2,
                        bottom: 4,
                    },
                },
            },
            finalizeContract: {
                text: 'Complete Kickoff',
                description: "CONGRATS, YOU'VE WON A PROJECT!",
                descriptionMore:
                    'Below is everything you need to keep your project on track.',
                onClick: meta => {
                    if (!meta.kickoffId) {
                        toggleBeforeKickoffPopup();
                    } else {
                        changePage(
                            PROJECT_KICKOFF_EDIT_ROUTE.reverse({
                                projectId: meta.projectId || 0,
                            }) || '',
                        );
                    }
                },
                imageConfig: {
                    imageUrl: ctaLightningImage.src,
                    position: {
                        right: 40,
                        bottom: 30,
                    },
                },
            },
            paymentDetails: {
                text: 'View Payments',
                description: 'AWAITING CLIENT KICKOFF',
                descriptionMore:
                    'Below is everything you need to keep your project on track.',
                onClick: meta => {
                    changePage(
                        PROJECT_DASHBOARD_PAYMENTS_ROUTE.reverse({
                            projectId: meta.projectId || 0,
                        }) || '',
                    );
                    const contentSectionRef = document.getElementById(
                        'tab-payments-content',
                    );
                    if (contentSectionRef) {
                        window.scrollTo(
                            0,
                            (contentSectionRef.getBoundingClientRect().top ||
                                0) -
                                document.body.getBoundingClientRect().top -
                                60,
                        );
                    }
                },
                imageConfig: {
                    imageUrl: ctaMoneyBlueImage.src,
                    position: {
                        right: 13,
                        bottom: 14,
                    },
                },
            },
            notChosen: {
                text: 'Sorry, but the client has chosen another team for this project.',
            },
            completed: {
                text: 'Project Complete',
            },
            closed: {
                text: 'Project Closed',
            },
            otherArticles: {
                text: (
                    <span>
                        <a
                            href={BREEF_ARTICLES_BREEFING_ROOM_AGENCY}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Browse&nbsp; Articles
                        </a>
                    </span>
                ),
                description: 'LEARN MORE ABOUT OUR PROCESS!',
                descriptionMore:
                    'Below is everything you need to keep your project on track.',
                imageConfig: {
                    imageUrl: ctaCloudImage.src,
                    position: {
                        right: -11,
                        bottom: 22,
                    },
                },
            },
        };

    return {
        clientProjectActionButtonStatuses,
        agencyProjectActionButtonStatuses,
    };
};
