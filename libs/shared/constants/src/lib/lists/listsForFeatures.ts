import moment from 'moment';
import { timezonesList } from '../timezones/timezones';
import _ from 'lodash';

export const listKindsOfProjects = [
    {
        id: 'one_time',
        name: 'One-Time',
        description:
            'A single project that is completed within a defined timeframe.',
    },
    {
        id: 'strategy_execution',
        name: 'Strategy + Retainer',
        description:
            'A project with an upfront strategy, followed by an ongoing retainer.',
    },
    {
        id: 'ongoing_or_retainer',
        name: 'Ongoing',
        description:
            'A project that requires an ongoing retainer or management. ',
    },
];

export const listCompanySize = [
    {
        value: 'just_me',
        label: 'It’s just me',
    },
    {
        value: '2_10',
        label: '2-10',
    },
    {
        value: '11_50',
        label: '11-50',
    },
    {
        value: '51_200',
        label: '51-200',
    },
    {
        value: '201_1000',
        label: '201-1000',
    },
    {
        value: '1000+',
        label: '1000+',
    },
];

export const listSpendBudget = [
    {
        value: 'less_than_five',
        label: 'Less than $5k',
    },
    {
        value: 'between_five_to_fifty',
        label: 'Between $5k - 50k',
    },
    {
        value: 'more_than_fifty',
        label: 'More than $50k',
    },
];

export const listRoleInCompany = [
    {
        value: 'founder_ceo',
        label: 'Founder/Ceo',
    },
    {
        value: 'product',
        label: 'Product',
    },
    {
        value: 'marketing',
        label: 'Marketing',
    },
    {
        value: 'operations',
        label: 'Operations',
    },
    {
        value: 'finance',
        label: 'Finance',
    },
];

export const listSocialLinks = [
    {
        title: 'Instagram',
        link: '',
    },
    {
        title: 'Twitter',
        link: '',
    },
    {
        title: 'TikTok',
        link: '',
    },
];

export const listBudget = [
    {
        value: '2.5k-5k',
        label: '$2,500 - $5,000',
    },
    {
        value: '5k-7k',
        label: '$5,000 - $7,000',
    },
    {
        value: '7k-10k',
        label: '$7,000 - $10,000',
    },
    {
        value: '10k-15k',
        label: '$10,000 - $15,000',
    },
    {
        value: '15k-20k',
        label: '$15,000 - $20,000',
    },
    {
        value: '20k-30k',
        label: '$20,000 - $30,000',
    },
    {
        value: '30k-40k',
        label: '$30,000 - $40,000',
    },
    {
        value: '40k-50k',
        label: '$40,000 - $50,000',
    },
    {
        value: '50k-75k',
        label: '$50,000 - $75,000',
    },
    {
        value: '75k-100k',
        label: '$75,000 - $100,000',
    },
    {
        value: '100k-150k',
        label: '$100,000 - $150,000',
    },
    {
        value: '150k-200k',
        label: '$150,000 - $200,000',
    },
    {
        value: '200k+',
        label: '$200,000+',
    },
];
export const listNumberOfEmployees = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '2-10',
        label: '2-10',
    },
    {
        value: '11-25',
        label: '11-25',
    },
    {
        value: '26-50',
        label: '26-50',
    },
    {
        value: '50',
        label: '50+',
    },
];

export const listPaymentFrequency = [
    {
        value: 'monthly',
        label: 'Monthly',
    },
    {
        value: 'quarterly',
        label: 'Quarterly',
    },
];

export const listNumberOfPayments = [
    {
        value: '0',
        label: 'Ongoing',
    },
    {
        value: '2',
        label: '2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
    {
        value: '5',
        label: '5',
    },
    {
        value: '6',
        label: '6',
    },
    {
        value: '7',
        label: '7',
    },
    {
        value: '8',
        label: '8',
    },
    {
        value: '9',
        label: '9',
    },
    {
        value: '10',
        label: '10',
    },
    {
        value: '11',
        label: '11',
    },
    {
        value: '12',
        label: '12',
    },
];

export const listNumberOfPaymentsWithoutOngoing = [
    {
        value: '2',
        label: '2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
    {
        value: '5',
        label: '5',
    },
    {
        value: '6',
        label: '6',
    },
    {
        value: '7',
        label: '7',
    },
    {
        value: '8',
        label: '8',
    },
    {
        value: '9',
        label: '9',
    },
    {
        value: '10',
        label: '10',
    },
    {
        value: '11',
        label: '11',
    },
    {
        value: '12',
        label: '12',
    },
];

export const listPaymentTerms = [
    {
        value: 'upon_receipt',
        label: 'Upon receipt (net 0)',
    },
    {
        value: '7_days',
        label: '7 days from invoice',
    },
    {
        value: '15_days',
        label: '15 days from invoice',
    },
    {
        value: '30_days',
        label: '30 days from invoice',
    },
    {
        value: '45_days',
        label: '45 days from invoice',
    },
    {
        value: '60_days',
        label: '60 days from invoice',
    },
];

export const listProjectPlanning = [
    {
        id: 1,
        name: 'Social-First Content',
    },
    {
        id: 2,
        name: 'Growth Marketing',
    },
    {
        id: 3,
        name: 'Email + SMS',
    },
    {
        id: 4,
        name: 'Creative + Brand',
    },
    {
        id: 5,
        name: 'Organic Social Media ',
    },
    {
        id: 6,
        name: 'TikTok Strategy',
    },
    {
        id: 7,
        name: 'Web + Development',
    },
    {
        id: 8,
        name: 'PR + Influencer',
    },
    {
        id: 9,
        name: 'eComm + Amazon',
    },
];

export enum ProjectStartDay {
    Now = 'now',
    LessThirty = 'less_than_thirty_days',
    OneThreeMonths = 'one_three_months',
    ThreeSixMonths = 'three_six_months',
    MoreThanSixMonths = 'more_than_six_months',
}

export const listProjectStartDay = [
    {
        value: ProjectStartDay.Now,
        label: 'Now',
    },
    {
        value: ProjectStartDay.LessThirty,
        label: 'Less than 30 days',
    },
    {
        value: ProjectStartDay.OneThreeMonths,
        label: '1–3 months',
    },
    {
        value: ProjectStartDay.ThreeSixMonths,
        label: '3–6 months',
    },
    {
        value: ProjectStartDay.MoreThanSixMonths,
        label: 'More than 6 months',
    },
];

export const listTimezones = timezonesList.map(timezone => ({
    value: timezone.identifier,
    label: timezone.name,
    group: timezone.group,
}));

export function generateTimeSlotList(): { value: string; label: string }[] {
    const list: { value: string; label: string }[] = [];

    for (let hour = 0; hour < 24; hour++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
            const timeValue = `${hour.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}`;
            const formattedTime = moment(timeValue, 'HH:mm')
                .format('LT')
                .toLocaleLowerCase();
            list.push({ value: timeValue, label: formattedTime });
        }
    }

    return list;
}

export const listBudgetPitch = [
    {
        value: 'in_range',
        name: 'Within range',
    },
    {
        value: 'outside_range',
        name: 'Outside Range',
    },
];

export const listExperience = [] as typeof listBudgetPitch;
for (let i = 1; i < 6; i++) {
    listExperience.push({
        value: String(i),
        name: String(i),
    });
}

export const listYearsInBusiness = [
    {
        value: '1-2',
        label: '1-2',
    },
    {
        value: '3-5',
        label: '3-5',
    },
    {
        value: '6-10',
        label: '6-10',
    },
    {
        value: '10+',
        label: '10+',
    },
];

export const monthsList = [
    {
        value: 'January',
        label: 'January',
    },
    {
        value: 'February',
        label: 'February',
    },
    {
        value: 'March',
        label: 'March',
    },
    {
        value: 'April',
        label: 'April',
    },
    {
        value: 'May',
        label: 'May',
    },
    {
        value: 'June',
        label: 'June',
    },
    {
        value: 'July',
        label: 'July',
    },
    {
        value: 'August',
        label: 'August',
    },
    {
        value: 'September',
        label: 'September',
    },
    {
        value: 'October',
        label: 'October',
    },
    {
        value: 'November',
        label: 'November',
    },
    {
        value: 'December',
        label: 'December',
    },
];

export const yearsList = _.range(new Date().getFullYear(), 1999).map(year => ({
    value: year + '',
    label: year + '',
}));
