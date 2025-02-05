import {
    useGetIdentitiesQuery,
    useGetIndustriesQuery,
} from '@breef/shared/data-access-profile';
import { useEffect, useState } from 'react';
import {
    useGetAgencyAdvantagesListQuery,
    useGetAgencyTimeFramesListQuery,
    useGetCapabilitiesQuery,
    useGetProjectGoalsListQuery,
    useGetTemplateTypesQuery,
} from '@breef/shared/data-access-project-create';
import {
    listBudget,
    listCompanySize,
    listKindsOfProjects,
    listNumberOfEmployees,
    listNumberOfPayments,
    listNumberOfPaymentsWithoutOngoing,
    listPaymentFrequency,
    listPaymentTerms,
    listRoleInCompany,
    listSocialLinks,
    listSpendBudget,
    listProjectPlanning,
    listProjectStartDay,
    generateTimeSlotList,
    listTimezones,
    listYearsInBusiness,
} from '@breef/shared/constants';

export const useGetList = (
    listType: string,
    id?: number,
    type?: 'clients' | 'agencies',
) => {
    const [activeRequest, setActiveRequest] = useState('');

    const industriesRequest = useGetIndustriesQuery(undefined, {
        skip: !(activeRequest === 'industries'),
    });

    const agencyTimeframesList = useGetAgencyTimeFramesListQuery(undefined, {
        skip: !(activeRequest === 'agencyTimeframes'),
    });

    const projectGoalsList = useGetProjectGoalsListQuery(undefined, {
        skip: !(activeRequest === 'projectGoals'),
    });

    const agencyAdvancedList = useGetAgencyAdvantagesListQuery(
        type ?? 'clients',
        {
            skip: !(activeRequest === 'agenciesAdvantages'),
        },
    );

    const templateTypesRequest = useGetTemplateTypesQuery(undefined, {
        skip: !(activeRequest === 'templateTypes'),
    });

    const identitiesRequest = useGetIdentitiesQuery(undefined, {
        skip: !(activeRequest === 'identities'),
    });

    const capabilitiesRequest = useGetCapabilitiesQuery(
        {},
        {
            skip: !(activeRequest === 'capabilities'),
        },
    );

    useEffect(() => {
        setActiveRequest(listType);
    }, [listType]);

    switch (listType) {
        case 'companySize':
            return listCompanySize;
        case 'spendBudget':
            return listSpendBudget;
        case 'roleInCompany':
            return listRoleInCompany;
        case 'industries':
            return industriesRequest.data || [];
        case 'agencyTimeframes':
            return (
                agencyTimeframesList.data?.map(item => ({
                    id: item.id,
                    name: item.text,
                    isTagged: item.is_popular,
                })) || []
            );
        case 'kindsOfProjects':
            return listKindsOfProjects;
        case 'projectPlanning':
            return listProjectPlanning;
        case 'projectGoals':
            return projectGoalsList.data || [];
        case 'identities':
            return identitiesRequest.data || [];
        case 'agenciesAdvantages':
            return (
                agencyAdvancedList.data?.map(item => ({
                    id: item.id,
                    name: item.name,
                })) || []
            );
        case 'templateTypes':
            return templateTypesRequest.data?.map(item => ({
                id: item.id,
                name: item.title,
                image: item.image,
            }));
        case 'socialLinks':
            return listSocialLinks;
        case 'listBudget':
            return listBudget;
        case 'listNumberOfEmployees':
            return listNumberOfEmployees;
        case 'paymentFrequency':
            return listPaymentFrequency;
        case 'numberOfPayments':
            return listNumberOfPayments;
        case 'numberOfPaymentsWithoutOngoing':
            return listNumberOfPaymentsWithoutOngoing;
        case 'paymentTerms':
            return listPaymentTerms;
        case 'projectStartDay':
            return listProjectStartDay;
        case 'timeSlots':
            return generateTimeSlotList();
        case 'groupedTimezones':
            return listTimezones;
        case 'listYearsInBusiness':
            return listYearsInBusiness;
        case 'capabilities':
            return (
                capabilitiesRequest.data?.map(item => ({
                    value: item.id,
                    label: item.name,
                })) ?? []
            );
        default:
            return [];
    }
};
