import React from 'react';
import { CardView, HeaderReview } from '@breef/shared/ui-components';
import TeamMemberReviewRow from './teamMemberReviewRow/TeamMemberReviewRow';

interface InfoSectionProps {
    userType: 'agency' | 'client';
    members: {
        firstName?: string;
        lastName?: string;
        email: string;
        phoneNumber?: string;
    }[];
    legalName: string;
}

export const InfoSection: React.FC<InfoSectionProps> = ({
    userType,
    members,
    legalName,
}) => {
    const userTypePrefix = userType === 'agency' ? 'Agency' : 'Company';
    return (
        <React.Fragment>
            <HeaderReview title={`${userTypePrefix} info`} />
            <div className="review-cards-box">
                <CardView
                    label={`${userTypePrefix} Legal name`}
                    description={legalName}
                    className="card-review-kickoff"
                />
                {members.map((item, key) => (
                    <CardView
                        key={key}
                        label={`${userTypePrefix} contact ${key + 1}`}
                        description=""
                        className="card-review-kickoff"
                    >
                        <TeamMemberReviewRow
                            email={item.email}
                            phoneNumber={item.phoneNumber}
                            firstName={item.firstName}
                            lastName={item.lastName}
                        />
                    </CardView>
                ))}
            </div>
        </React.Fragment>
    );
};
export default InfoSection;
