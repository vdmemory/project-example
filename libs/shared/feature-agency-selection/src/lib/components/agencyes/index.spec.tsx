import { fireEvent, render, screen } from '@testing-library/react';
import 'intersection-observer';
import Agencies from './Agencies';

const handleSelectAgency = jest.fn();
const props = {
    step: 1,
    subStep: 1,
    agenciesList: [
        {
            id: 123,
            companyName: 'New Balance',
            companyLogo: 'https://www.balance.com',
            companyLocation: 'New Daily',
        },
        {
            id: 124,
            companyName: 'New Company',
            companyLogo: '',
            companyLocation: 'New Daily 2',
        },
    ],
    handleSelectAgency: handleSelectAgency,

    brandLead: {
        firstName: 'Bob',
        lastName: 'Dilan',
        logoUrl: 'https://www.dilan.logo.jpg',
    },
};

const propsWithSelectedItems = {
    ...props,
    selectedItem: [123],
};

describe('Agencies', () => {
    it('should render component Agencies ', () => {
        const { baseElement } = render(
            <Agencies {...propsWithSelectedItems} />,
        );
        expect(baseElement).toBeTruthy();
    });

    it('should render component Agencies with the right step ', () => {
        render(<Agencies {...propsWithSelectedItems} />);
        const stepNumber = screen.getByText('1/1');
        expect(stepNumber).toBeInTheDocument();
    });
    it('component Agencies contains two cards  ', () => {
        const { baseElement } = render(
            <Agencies {...propsWithSelectedItems} />,
        );
        const expandedCard =
            baseElement.getElementsByClassName('expanded-card');
        expect(expandedCard).toHaveLength(2);
    });

    it('card selection is displayed correctly', () => {
        render(<Agencies {...propsWithSelectedItems} />);
        const checkbox = screen.getAllByRole('checkbox');
        expect(checkbox[0].getAttribute('value')).toEqual('true');
        expect(checkbox[1].getAttribute('value')).toEqual('false');
    });

    it('card selection is works correctly', async () => {
        render(<Agencies selectedItem={null} {...props} />);

        const checkbox = screen.getAllByRole('checkbox');
        await fireEvent.click(checkbox[0], { id: 123 });
        await fireEvent.click(checkbox[1], { id: 124 });

        expect(handleSelectAgency).toHaveBeenCalledTimes(2);
    });

    it('component Agencies have all props', () => {
        render(<Agencies {...propsWithSelectedItems} />);
        const titleFirstCompany = screen.getByText('New Balance');
        const titleSecondCompany = screen.getByText('New Company');
        const locationFirstCompany = screen.getByText('New Daily');
        const locationSecondCompany = screen.getByText('New Daily 2');

        expect(titleFirstCompany).toBeInTheDocument();
        expect(titleSecondCompany).toBeInTheDocument();
        expect(locationFirstCompany).toBeInTheDocument();
        expect(locationSecondCompany).toBeInTheDocument();
    });
});
