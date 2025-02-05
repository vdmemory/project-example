import React, { useEffect, useRef } from 'react';
import {
    InnerAutocomplete,
    DefaultInnerInput,
    HeaderReview,
    InnerFieldsBox,
    InnerFieldWrapper,
    SimpleHeaderInfo,
    InnerInvitesMembers,
    InnerContractsWrapper,
} from '@breef/shared/ui-components';
import { useController, useFormContext } from 'react-hook-form';
import { StyledBillingDataStep } from './BillingDataStep.styled';
import { useGetTeamMembersKickoffQuery } from '@breef/shared/data-access-profile';
import { replaceExtraBreakSpaces } from '@breef/shared/utils';
import { useKickoffActions } from '../../../store/hooks';
import { BillingDataFormType } from '../../../types/kickoffTypes';
import { card_bg_9 } from '@breef/shared/assets';

interface BillingDataStepProps {
    userType: 'client' | 'agency';
}

export const BillingDataStep: React.FC<BillingDataStepProps> = ({
    userType,
}) => {
    const billingAddressRef = useRef<HTMLLabelElement>(null);
    const { control, getValues } = useFormContext<BillingDataFormType>();

    const teamMembersQuery = useGetTeamMembersKickoffQuery();
    const teamMembersList =
        teamMembersQuery.data?.teamMembers.filter(
            item => !item.position.match(/owner/i),
        ) || [];
    const teamInvitesList = teamMembersQuery.data?.invites || [];

    const { setBillingFormData } = useKickoffActions();

    const fieldLegalName = useController({ control, name: 'legalName' }).field;
    const fieldBillingAddress = useController({
        control,
        name: 'billingAddress',
    }).field;
    const fieldBillingAddressAdditional = useController({
        control,
        name: 'billingAddressAdditional',
    }).field;
    const fieldTeamMembers = useController({
        control,
        name: 'teamMembers',
    }).field;
    const fieldTeamInvites = useController({
        control,
        name: 'teamInvites',
    }).field;
    const fieldInvitations = useController({
        control,
        name: 'invites',
    }).field;
    const fieldFiles = useController({
        control,
        name: 'files',
    });

    useEffect(() => {
        return () => {
            setBillingFormData(getValues());
        };
        //eslint-disable-next-line
    }, []);

    return (
        <StyledBillingDataStep>
            <SimpleHeaderInfo
                title="company info"
                backgroundImageUrl={card_bg_9.src}
            >
                <span>
                    {
                        'Complete the info below to streamline \ncontracting and payments.'
                    }
                </span>
            </SimpleHeaderInfo>
            <div className="step-main-content-wrapper">
                <HeaderReview
                    title={`${
                        userType === 'agency' ? 'Agency' : 'Company'
                    } info:`}
                />
                <InnerFieldsBox>
                    <InnerFieldWrapper labelText="Company legal name">
                        <DefaultInnerInput
                            value={fieldLegalName.value}
                            onChange={e =>
                                fieldLegalName.onChange(
                                    replaceExtraBreakSpaces(e.target.value),
                                )
                            }
                            placeholder="Legal Name"
                            maxLength={255}
                        />
                    </InnerFieldWrapper>
                    <InnerFieldWrapper
                        labelText="Billing Address"
                        setRef={billingAddressRef}
                    >
                        <InnerAutocomplete
                            parentRef={billingAddressRef}
                            value={fieldBillingAddress.value}
                            onChange={fieldBillingAddress.onChange}
                            placeholder="Billing Address"
                        />
                    </InnerFieldWrapper>
                    <InnerFieldWrapper labelText="Billing Address 2 (optional)">
                        <DefaultInnerInput
                            value={fieldBillingAddressAdditional.value}
                            onChange={e =>
                                fieldBillingAddressAdditional.onChange(
                                    replaceExtraBreakSpaces(e.target.value),
                                )
                            }
                            placeholder="Apartment # / PO Box / Suite #..."
                            maxLength={255}
                        />
                    </InnerFieldWrapper>
                    <InnerFieldWrapper
                        labelText="Payments Contact"
                        isDisableLabelClick
                        toolTipText={
                            userType === 'agency'
                                ? 'Add colleagues who should receive notifications for any payment \nupdates for this project.'
                                : 'Include team members who should receive payments updates: invoicing, receipts, etc'
                        }
                    >
                        <InnerInvitesMembers
                            teamInvitesList={teamInvitesList}
                            teamMembersList={teamMembersList}
                            teamInvites={fieldTeamInvites.value}
                            onSelectTeamInvites={fieldTeamInvites.onChange}
                            teamMembers={fieldTeamMembers.value}
                            onSelectTeamMember={fieldTeamMembers.onChange}
                            invitations={fieldInvitations.value}
                            onAddInvitations={fieldInvitations.onChange}
                        />
                    </InnerFieldWrapper>
                </InnerFieldsBox>
                {userType === 'agency' && (
                    <React.Fragment>
                        <HeaderReview title="Contract / SOW:" />
                        <InnerFieldsBox>
                            <InnerContractsWrapper
                                labelMain="Signed Contract"
                                labelAdditional="Misc documents"
                                value={fieldFiles.field.value}
                                onChange={fieldFiles.field.onChange}
                                isDisableFileLinks={userType === 'agency'}
                            />
                        </InnerFieldsBox>
                    </React.Fragment>
                )}
            </div>
        </StyledBillingDataStep>
    );
};
export default BillingDataStep;
