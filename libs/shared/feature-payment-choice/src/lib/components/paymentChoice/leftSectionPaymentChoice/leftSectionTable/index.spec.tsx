import { screen, render, fireEvent } from '@testing-library/react';
import LeftSectionTable from './LeftSectionTable';
import 'intersection-observer';

const handleDownloadInvoice = jest.fn();

const props = {
    invoiceCode: '1111',
    agencyLogo: 'https://logo.url',
    agencyName: 'NB',
    dueDate: '22/02/22',
    amount: '$2000',
    deliverable: 'deliverable',
    paymentType: 'milestone',
    handleDownloadInvoice: handleDownloadInvoice,
};
describe('LeftSectionTable', () => {
    it('LeftSectionTable should render successfully with props', () => {
        const { baseElement } = render(<LeftSectionTable {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('1111')).toBeInTheDocument();
        expect(screen.getByText('NB')).toBeInTheDocument();
        expect(screen.getByText('22/02/22')).toBeInTheDocument();
        expect(screen.getByText('Deliverable')).toBeInTheDocument();
        expect(screen.getByText('milestone')).toBeInTheDocument();
        const amountElement = baseElement.getElementsByClassName(
            'table-body-services-deliverable-amount',
        )[0];
        expect(amountElement.textContent).toEqual('$2000');
    });
    it('LeftSectionTable should render successfully with props', () => {
        const { baseElement } = render(<LeftSectionTable {...props} />);

        const iconElement = baseElement.getElementsByClassName(
            'table-header-invoice-download',
        )[0];
        fireEvent.click(iconElement);
        expect(handleDownloadInvoice).toBeCalledTimes(1);
    });
});
