// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { mediaScreen } from '@breef/shared/assets/variables';
import {
    useLazyGetPublicSinglePitchQuery,
    useLazyGetSharedProjectQuery,
} from '@breef/shared/data-access-project';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    AgencyPitch,
    PageLoader,
    ReviewPitch,
    ReviewPitchPublic,
} from '@breef/shared/ui-components';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const StyledListDetail = styled.div`
    position: relative;

    .agency-pitch {
        margin: auto;
        padding: 40px 75px;
        max-width: 925px;

        @media (${mediaScreen.maxMobile}) {
            padding: 40px 20px;
            flex-direction: column;
            max-width: 540px;
        }
    }

    .button-dashboard {
        height: 100%;
        border: 0;
        border-left: 1px solid;

        .label {
            font-size: 12px;
        }
    }
`;

const ERROR_MESSAGE = 'Company has closed access to the pitch information.';

const PublicPitchPage = () => {
    const router = useRouter();
    const {
        query: { token },
    } = router;
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isClosingSharing, setIsClosingShared] = useState(false);

    const [fetchSinglePitch, { data: agencyPitch }] =
        useLazyGetPublicSinglePitchQuery();
    const [fetchSharedProject, { data: sharedProjectData }] =
        useLazyGetSharedProjectQuery();

    const fetchData = async () => {
        setIsLoadingPage(true);
        try {
            await Promise.all([
                fetchSinglePitch({ token: token as string }).unwrap(),
                fetchSharedProject({ token: token as string }).unwrap(),
            ]);
        } catch (err) {
            setIsClosingShared(true);
        } finally {
            setIsLoadingPage(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    if (isClosingSharing) {
        return <PageLoader errorMessage={ERROR_MESSAGE} />;
    }

    if (isLoadingPage) return <PageLoader />;

    return (
        <ReviewPitchPublic
            pitchData={agencyPitch}
            projectData={sharedProjectData}
        />
    );
};

export default PublicPitchPage;
