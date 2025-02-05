import { RefObject } from 'react';
import {
    ACCESS_TOKEN,
    BREEF_AGENCY_ONBOARDING_ROUTE,
    BREEF_ARTICLES_BREEFING_ROOM_AGENCY,
    IS_CLIENT_PLATFORM,
    PROJECT_CREATE_ROUTE,
} from '@breef/shared/constants';
import {
    ctaCactusImage,
    ctaGlobeImage,
    ctaLipsImage,
} from '@breef/shared/assets';
import {
    agencyActionButtonCtaStatusesType,
    clientActionButtonCtaStatusesType,
} from '@breef/shared/types';
import { getStorageData } from '@breef/shared/utils';
import { useRouteControl } from '../useRouteControl/useRouteControl';

export const emptyImageConfig = {
    imageUrl: '',
    position: {},
};

interface UseActionButtonCtaConfigProps {
    brandLead: {
        firstName: string;
        lastName: string;
    };
    projectsViewSettingsBarRef: RefObject<HTMLDivElement>;
    projectsCount?: number;
    toggleBookACallPopup: () => void;
}

export const useActionButtonCtaConfig = ({
    projectsViewSettingsBarRef,
    projectsCount = 0,
}: UseActionButtonCtaConfigProps) => {
    const { changePage } = useRouteControl();

    const scrollToProjectSettingsBar = () => {
        if (projectsViewSettingsBarRef.current && IS_CLIENT_PLATFORM) {
            window.scrollTo(
                0,
                projectsViewSettingsBarRef.current.getBoundingClientRect().top +
                    window.scrollY -
                    60,
            );
        }
    };

    const clientActionButtonCtaStatuses: clientActionButtonCtaStatusesType = {
        noProjects: {
            text: 'Start Project',
            description: 'CREATE YOUR FIRST PROJECT',
            descriptionSubtext:
                'Scope your next project in minutes. Receive pitches from the best agencies.',
            brandLeadText:
                "The best way to get started on Breef is on a planning call. Let's chat!",
            tag: 'FIND AN AGENCY',
            onClick: () => changePage(PROJECT_CREATE_ROUTE),
        },
    };

    const agencyActionButtonCtaStatuses: agencyActionButtonCtaStatusesType = {
        activeProjects: {
            text: 'View Projects',
            description: `YOU HAVE ${projectsCount} ACTIVE PROJECTS`,
            onClick: () => scrollToProjectSettingsBar(),
            imageConfig: {
                imageUrl: ctaGlobeImage.src,
                position: {
                    top: 0,
                    right: 20,
                },
            },
        },
        signUp: {
            text: (
                <span>
                    View&nbsp;
                    <a
                        href={BREEF_ARTICLES_BREEFING_ROOM_AGENCY}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Articles
                    </a>
                    .
                </span>
            ),
            description: 'LEARN MORE ABOUT OUR PROCESS!',
            imageConfig: {
                imageUrl: ctaCactusImage.src,
                position: {
                    right: -34,
                    bottom: 0,
                },
            },
        },
        incompleteProfile: {
            text: 'Settings',
            description: 'COMPLETE YOUR PROFILE',
            onClick: () =>
                window.location.replace(
                    BREEF_AGENCY_ONBOARDING_ROUTE.reverse({
                        token: getStorageData('cookie', ACCESS_TOKEN),
                    }) || '',
                ),
            imageConfig: {
                imageUrl: ctaLipsImage.src,
                position: {
                    right: -5,
                    bottom: 8,
                },
            },
        },
    };

    return {
        clientActionButtonCtaStatuses,
        agencyActionButtonCtaStatuses,
    };
};
