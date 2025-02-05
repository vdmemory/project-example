import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
    Choice,
    Filters,
    PitchProjectStatuses,
    PitchProjectTagsValues,
} from '@breef/shared/constants';
import CardForAgency from './CardForAgency';

const actionButtonClick = jest.fn();
const handleClickCard = jest.fn();

const props = {
    actionButtonClick,
    handleClickCard,
    status: PitchProjectStatuses.shortlisted,
    buttonTitle: <p>SHORTLISTED</p>,
    name: 'New balance',
    clientName: 'Client name',
    clientLogoUrl: '',
    isDisabledButton: false,
    tag: PitchProjectTagsValues.dueToday,
    submissionDeadline: '2023-03-27T02:45:35.922318-04:00',
    paymentTotalAmount: {
        ongoingPaymentAmount: '110.00',
        oneTimePaymentsPaidAmount: '20.00',
        oneTimePaymentsTotalAmount: '130.00',
    },
    budget: 'less_then_seven' as Choice,
};
describe('CardForAgency New Projects', () => {
    const propsWithFilterNewProjects = {
        ...props,
        filterProjects: Filters.new_projects,
        hoursToSubmissionDeadline: 1,
    };
    it('should render successfully CardForAgency', () => {
        const { baseElement } = render(
            <CardForAgency {...propsWithFilterNewProjects} />,
        );
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully CardForAgency with correct props', () => {
        const { getByText } = render(
            <CardForAgency {...propsWithFilterNewProjects} />,
        );
        expect(getByText('Submission deadline: 3/27')).toBeInTheDocument();
        expect(getByText('$5,000 - $7,000')).toBeInTheDocument();
        expect(getByText('New balance')).toBeInTheDocument();
        expect(getByText('Due in 1 hour')).toBeInTheDocument();
        expect(getByText('SHORTLISTED')).toBeInTheDocument();
    });

    it('should render successfully CardForAgency with action', () => {
        const { baseElement } = render(
            <CardForAgency {...propsWithFilterNewProjects} />,
        );
        const card = baseElement.getElementsByClassName('project-card')[0];
        fireEvent.click(card);
        expect(handleClickCard).toBeCalledTimes(1);
    });
    it('should render successfully CardForAgency with action', () => {
        const { getByRole } = render(
            <CardForAgency {...propsWithFilterNewProjects} />,
        );
        fireEvent.click(getByRole('button'));
        expect(actionButtonClick).toBeCalledTimes(1);
    });
});

describe('CardForAgency Submitted', () => {
    const propsWithFilterSubmitted = {
        ...props,
        filterProjects: Filters.submitted,
        hoursToSubmissionDeadline: 1,
    };
    it('should render successfully CardForAgency', () => {
        const { baseElement } = render(
            <CardForAgency {...propsWithFilterSubmitted} />,
        );
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully CardForAgency with correct agency and company name', () => {
        const { getByText } = render(
            <CardForAgency {...propsWithFilterSubmitted} />,
        );
        expect(getByText('New balance')).toBeInTheDocument();
        expect(getByText('Client name')).toBeInTheDocument();
    });
});

describe('CardForAgency In Progress', () => {
    const propsWithFilterInProgress = {
        ...props,
        filterProjects: Filters.in_progress,
        hoursToSubmissionDeadline: 1,
    };
    it('should render successfully CardForAgency', () => {
        const { baseElement } = render(
            <CardForAgency {...propsWithFilterInProgress} />,
        );
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully CardForAgency with correct agency name and Client name', () => {
        const { getByText } = render(
            <CardForAgency {...propsWithFilterInProgress} />,
        );
        expect(getByText('New balance')).toBeInTheDocument();
        expect(getByText('Client name')).toBeInTheDocument();
    });

    it('should render successfully CardForAgency with correct paymentTotalAmount', () => {
        const { getByText } = render(
            <CardForAgency {...propsWithFilterInProgress} />,
        );
        expect(getByText('$20.00')).toBeInTheDocument();
        expect(getByText('/ $130.00')).toBeInTheDocument();
        expect(getByText('+ $110.00 ongoing')).toBeInTheDocument();
    });
});
