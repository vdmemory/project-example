import React from 'react';
import {
    CardView,
    DocumentPreviewer,
    HeaderReview,
} from '@breef/shared/ui-components';
import { useKickoffSelector } from '../../../../store/hooks';
import { useRouter } from 'next/router';
import { getHostName, getLinkDownloadContracts } from '@breef/shared/utils';

interface ContractSectionProps {
    isDisableFileLinks?: boolean;
}

export const ContractSection: React.FC<ContractSectionProps> = ({
    isDisableFileLinks = false,
}) => {
    const { files } = useKickoffSelector(state => state.kickoff).kickoff;
    const router = useRouter();
    const {
        query: { projectId },
    } = router;
    const hostName = getHostName();

    return (
        <React.Fragment>
            <HeaderReview title="Contract / Sow" />
            <div className="review-cards-box">
                <CardView
                    label="Contract(S)"
                    description=""
                    className="card-review-kickoff"
                >
                    <div className="documents-review-wrapper">
                        {files.map((item, key) => (
                            <DocumentPreviewer
                                key={item.id}
                                label={item.title}
                                link={
                                    !isDisableFileLinks
                                        ? getLinkDownloadContracts({
                                              projectId: `${projectId}`,
                                              fileId: `${item.id}`,
                                              hostName: hostName,
                                          })
                                        : undefined
                                }
                                imageUrl={item.thumbnail}
                                isIcon={false}
                            />
                        ))}
                    </div>
                </CardView>
            </div>
        </React.Fragment>
    );
};
export default ContractSection;
