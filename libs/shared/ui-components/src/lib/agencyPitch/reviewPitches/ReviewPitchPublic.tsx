import {
    SharedProjectType,
    TransformAgencyPitchResponse,
} from '@breef/shared/types';
import { FC, Fragment } from 'react';
import { useMediaContext } from '@breef/shared/hooks';
import { urlToDefaultFormat } from '@breef/shared/utils';
import { StyledReviewPitchesPublic } from './ReviewPitchesPublic.styled';
import { HeaderInfo } from './headerInfo/HeaderInfo';
import { HeaderNav } from './headerNav/HeaderNav';
import ReviewPitch from '../reviewPitch/ReviewPitch';
import { usePopup } from '../../popup/usePopup';
import { ReviewProjectPopup } from '../../reviewProjectCreation/ReviewProjectPopup';
import { SideBar } from '../../sideBar/SideBar';
import { BoxInfo } from './boxInfo/BoxInfo';

type ReviewPitchPublicProps = {
    projectData: SharedProjectType;
    pitchData: TransformAgencyPitchResponse;
};

export const ReviewPitchPublic: FC<ReviewPitchPublicProps> = ({
    projectData,
    pitchData,
}) => {
    const { isMobile } = useMediaContext();
    const popupReviewScope = usePopup();
    const brandLeadShortData = {
        name: `${
            projectData.brandLead.firstName
        } ${projectData.brandLead.lastName.charAt(0)}.`,
        logo: projectData.brandLead.brandLead.logoUrl || '',
    };

    const renderProject = () => (
        <ReviewProjectPopup
            projectData={projectData}
            close={popupReviewScope.close}
        />
    );

    const renderWebsite = (website: string) => {
        if (!website) {
            return <span className="website-link-disabled">Website</span>;
        }

        return (
            <a
                className="website-link"
                href={urlToDefaultFormat(website)}
                target="_blank"
            >
                Website
            </a>
        );
    };

    const renderShortCompanyInfo = () => (
        <div className="key-info-item">
            <span className="title">{projectData.companyName}</span>
            <span className="value">
                {projectData.companyLocation}
                &nbsp;·&nbsp;
                {renderWebsite(projectData.companyWebsite)}
            </span>
        </div>
    );

    return (
        <StyledReviewPitchesPublic isSinglePitch>
            {!isMobile ? (
                <HeaderInfo
                    title="Agency Pitch Review"
                    popup={renderProject()}
                    popupControl={popupReviewScope}
                />
            ) : (
                <HeaderNav />
            )}
            <div className="layout">
                <SideBar
                    title={projectData.name}
                    prefixNode={renderShortCompanyInfo()}
                >
                    {!isMobile && (
                        <BoxInfo
                            className="show"
                            key="box-info"
                            logo={pitchData.companyLogo?.url ?? ''}
                            name={pitchData.companyName ?? ''}
                            adminNote={pitchData?.breefTake ?? ''}
                            brandLead={brandLeadShortData}
                            label={'Your strategist'}
                        />
                    )}
                </SideBar>
                <div className="content">
                    <ReviewPitch
                        className="pitch-details"
                        pitchData={pitchData}
                    />
                </div>
            </div>
        </StyledReviewPitchesPublic>
    );
};
