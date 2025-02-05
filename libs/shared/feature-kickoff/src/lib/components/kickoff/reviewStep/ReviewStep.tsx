/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { StyledReviewStep } from './ReviewStep.styled';
import { FieldCheckBox, SimpleHeaderInfo } from '@breef/shared/ui-components';
import InfoSection from './infoSection/InfoSection';
import { useKickoffActions, useKickoffSelector } from '../../../store/hooks';
import ContractSection from './contractSection/ContractSection';
import PaymentsSection from './paymentsSection/PaymentsSection';
import { card_bg_10 } from '@breef/shared/assets';
import { TeamMemberType } from '@breef/shared/types';
import {
    FAQ_ROUTE,
    TERMS_OF_USE_STANDARD_ROUTE,
} from '@breef/shared/constants';
import { useGetTeamMembersKickoffQuery } from '@breef/shared/data-access-profile';
import Link from 'next/link';

interface ReviewStepProps {
    userType: 'client' | 'agency';
    agencyKickoffBillingData?: {
        legalName: string;
        teamMembers: TeamMemberType[];
    };
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
    userType,
    agencyKickoffBillingData,
}) => {
    const { setIsAcceptedTerms } = useKickoffActions();
    const { isAcceptedTerms, legalName, invites, teamMembers, teamInvites } =
        useKickoffSelector(state => state).kickoff.kickoff;
    const teamMembersQuery = useGetTeamMembersKickoffQuery();

    const ownerMember = teamMembersQuery.data?.teamMembers.find(item =>
        item.position.match(/owner/i),
    );
    const isOwnerInTeamMembers = teamMembers.some(
        item => item.id === ownerMember?.id,
    );
    const allMembers = [...teamMembers, ...teamInvites, ...invites] as {
        firstName?: string;
        lastName?: string;
        email: string;
        phoneNumber?: string;
    }[];
    if (!isOwnerInTeamMembers && ownerMember) {
        allMembers.unshift(ownerMember);
    }

    return (
        <StyledReviewStep>
            {userType === 'agency' ? (
                <div className="header-step">{'Review\nProject details'}</div>
            ) : (
                <SimpleHeaderInfo
                    title="Contract & billing"
                    backgroundImageUrl={card_bg_10.src}
                >
                    <span>
                        Please review contract summary and payment terms.
                        <br />
                        <Link href={FAQ_ROUTE} legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer">
                                See common q’s here.
                            </a>
                        </Link>
                    </span>
                </SimpleHeaderInfo>
            )}
            <div className="step-main-content-wrapper">
                <InfoSection
                    userType={userType}
                    legalName={legalName}
                    members={allMembers}
                />
                {agencyKickoffBillingData && (
                    <InfoSection
                        userType="agency"
                        legalName={agencyKickoffBillingData.legalName}
                        members={agencyKickoffBillingData.teamMembers}
                    />
                )}
                <ContractSection isDisableFileLinks={userType === 'agency'} />
                <PaymentsSection userType={userType} />
                <div className="form-wrapper">
                    <FieldCheckBox
                        label=""
                        onChange={setIsAcceptedTerms}
                        value={isAcceptedTerms}
                        className="field-checkbox"
                        icon="mark"
                    >
                        <span>
                            Yes, I accept&nbsp;
                            <a
                                href={`/${userType}${TERMS_OF_USE_STANDARD_ROUTE}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Breef’s Terms of Use
                            </a>
                        </span>
                    </FieldCheckBox>
                    {userType === 'client' && (
                        <span className="get-help-note">
                            Error?&nbsp;
                            <a href="mailto:kickoff@breef.com">Get help here</a>
                        </span>
                    )}
                </div>
            </div>
        </StyledReviewStep>
    );
};
export default ReviewStep;
