import React, { FC, ReactNode, useState } from 'react';
import { StyledServiceCard, StyledServiceField } from './ServiceCard.styled';
import { TrashIcon } from '@breef/ui-kit';
import {
    LinkButton,
    usePopup,
    WorkCard,
    WorkCardOld,
    WorkImage,
    WorkPopup,
} from '@breef/shared/ui-components';
import { FormPricing } from './formPricing/FormPricing';
import { FormPastWork } from './formPastWork/FormPastWork';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';
import { ServicesFormType } from '../ServicesForm';
import {
    BillingStructureType,
    CapabilityPricingRetainerType,
    CapabilityPricingType,
} from '@breef/shared/constants';
import { urlToDefaultFormat } from '@breef/shared/utils';
import { PastWorkFormType, PricingFormType } from '@breef/shared/types';

interface ServiceCardProps {
    name: string;
    children?: ReactNode;
    onRemove: () => void;
    index: number;
}
export const ServiceCard: FC<ServiceCardProps> = ({
    children,
    onRemove,
    index,
    name,
}) => {
    const [activePastWorkIndex, setActivePastWorkIndex] = useState<
        number | null
    >(null);
    const { control } = useFormContext<ServicesFormType>();
    const pricingField = useController({
        control,
        name: `services.${index}.pricing`,
    });
    const portfolioFieldArray = useFieldArray({
        control,
        name: `services.${index}.portfolio`,
    });

    const pricingPopup = usePopup();
    const pastWorkPopup = usePopup();

    const renderHeader = () => (
        <div className="header-section">
            <span>{name}</span>
            <button onClick={onRemove}>
                <TrashIcon />
            </button>
        </div>
    );

    const handleSavePricing = (pricingData: PricingFormType) => {
        pricingField.field.onChange(pricingData);
    };

    const handleSavePastWork = (pastWorkData: PastWorkFormType) => {
        if (activePastWorkIndex !== null) {
            portfolioFieldArray.update(activePastWorkIndex, pastWorkData);
        } else {
            portfolioFieldArray.append(pastWorkData);
        }
    };

    const handleOpenPastWorkPopup = (index?: number) => {
        setActivePastWorkIndex(index ?? null);
        pastWorkPopup.open();
    };

    const renderPricingWorkCard = () => {
        if (!pricingField.field.value) {
            return (
                <LinkButton
                    icon="plus"
                    name="Add Pricing"
                    onClick={pricingPopup.open}
                    className="link-button"
                />
            );
        }
        const {
            packageName,
            description,
            projectAmount,
            maxProjectAmount,
            minProjectAmount,
            retainerType,
            billingStructure,
            pricingStructure,
        } = pricingField.field.value;

        const priceValue = `$${
            pricingStructure === CapabilityPricingType.PACKAGE
                ? projectAmount
                : minProjectAmount
        }${
            pricingStructure === CapabilityPricingType.RANGE
                ? ` - $${maxProjectAmount}`
                : ''
        }`;
        const priceType = `${
            retainerType === CapabilityPricingRetainerType.BIWEEKLY
                ? 'Bi-weekly'
                : retainerType ?? ''
        } ${
            billingStructure === BillingStructureType.ONE_TIME
                ? 'Project Fee'
                : 'Retainer'
        }`.trim();

        return (
            <WorkCardOld
                workData={{
                    titleFirst: packageName || `${name} Pricing`,
                    description,
                    rate: {
                        price: priceValue,
                        type: priceType,
                    },
                }}
                imageType={WorkImage.Coins}
                isRemoveButton={false}
                onClick={pricingPopup.open}
            />
        );
    };

    return (
        <StyledServiceCard>
            {renderHeader()}
            <div className="card-body-wrapper">
                <ServiceField label="Pricing">
                    {renderPricingWorkCard()}
                </ServiceField>
                <ServiceField label="Portfolio">
                    {portfolioFieldArray.fields.map((item, index) => (
                        <WorkCardOld
                            workData={{
                                titleFirst: item.clientName,
                                titleLast: item.projectName,
                                website: item.clientWebsite,
                                description: item.projectDescription,
                                documents: item.documents,
                                projectLinks: item.linkUrl
                                    ? [
                                          {
                                              title: `${name} for ${item.clientName}`,
                                              link: item.linkUrl,
                                          },
                                      ]
                                    : [],
                            }}
                            isRemoveButton={false}
                            onClick={() => handleOpenPastWorkPopup(index)}
                        />
                    ))}
                    <LinkButton
                        icon="plus"
                        name="Add Work"
                        onClick={e => handleOpenPastWorkPopup()}
                        className="link-button"
                    />
                </ServiceField>
            </div>
            {children}
            {pricingPopup.isOpen && (
                <WorkPopup
                    title={`${name} - Pricing`}
                    close={pricingPopup.close}
                >
                    <FormPricing
                        onSave={handleSavePricing}
                        onClose={pricingPopup.close}
                        preValue={pricingField.field.value}
                    />
                </WorkPopup>
            )}
            {pastWorkPopup.isOpen && (
                <WorkPopup
                    title={`${name} - Past Work`}
                    close={pastWorkPopup.close}
                >
                    <FormPastWork
                        onSave={handleSavePastWork}
                        onClose={pastWorkPopup.close}
                        preValue={
                            activePastWorkIndex !== null
                                ? portfolioFieldArray.fields[
                                      activePastWorkIndex
                                  ]
                                : null
                        }
                    />
                </WorkPopup>
            )}
        </StyledServiceCard>
    );
};

const ServiceField = ({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) => (
    <StyledServiceField>
        <span className="label">{label}</span>
        {children}
    </StyledServiceField>
);

export default ServiceCard;
