import {
    CustomExpandedCard,
    TipCard,
    ScrollBar,
    TitleStep,
    TipsTypeKeys,
    useGetTip,
} from '@breef/shared/ui-components';
import React, { useContext } from 'react';
import { StyledAgencies } from './Agencies.styled';
import { useMediaContext } from '@breef/shared/hooks';
import { AvatarImage } from '@breef/ui-kit';

type Props = {
    step: number;
    subStep: number;
    agenciesList: {
        id: number;
        companyName: string;
        companyLogo: string;
        companyLocation: string;
    }[];
    handleSelectAgency: (id: number) => void;
    selectedItem: number[] | null;
    brandLead: {
        firstName: string;
        lastName: string;
        logoUrl: string;
    };
};

const Agencies: React.FC<Props> = ({
    step,
    subStep,
    agenciesList,
    handleSelectAgency,
    selectedItem,
    brandLead,
}) => {
    const tip = useGetTip(step, TipsTypeKeys.agencySelection);

    const { isMobile } = useMediaContext();

    return (
        <StyledAgencies className="xxx">
            <TitleStep
                className="header-title"
                step={step}
                numberSteps={subStep}
                title={'who’s your \nfinal pick? '}
            />
            <div className="body-wrapper">
                <ScrollBar scroll="horizontal" hideNavButtons={isMobile}>
                    {agenciesList.map((agency, key) => (
                        <CustomExpandedCard
                            key={agency.id}
                            cardNumber={key + 1}
                            onChange={() => {
                                handleSelectAgency(agency.id);
                            }}
                            label="Add my own"
                            buttonLabel="Save custom goal"
                            cardId={agency.id}
                            isChecked={
                                selectedItem !== null &&
                                selectedItem.findIndex(
                                    item => item === agency.id,
                                ) !== -1
                            }
                            isEditable={false}
                        >
                            <div className="card-wrapper">
                                <AvatarImage
                                    className="logo"
                                    src={agency.companyLogo}
                                    alt="Avatar"
                                    width={50}
                                    height={50}
                                />
                                <h2 className="card-title">
                                    {agency.companyName}
                                </h2>
                                <p className="card-location">
                                    {agency.companyLocation}
                                </p>
                            </div>
                        </CustomExpandedCard>
                    ))}
                </ScrollBar>
                <TipCard
                    leadFirstName={brandLead.firstName}
                    leadLastName={brandLead.lastName}
                    logoUrl={brandLead.logoUrl}
                    className="step-post"
                    tip={tip}
                />
            </div>
        </StyledAgencies>
    );
};
export default Agencies;
