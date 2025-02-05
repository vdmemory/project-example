import { render } from '@testing-library/react';
import LeftSectionPaymentChoice, {
    LeftSectionPaymentPropsChoice,
} from './LeftSectionPaymentChoice';
import 'intersection-observer';

const handleDownloadInvoice = jest.fn();

const props: LeftSectionPaymentPropsChoice = {
    invoiceCode: '82412291CP1',
    agencyName: 'Lobster Creative',
    agencyLogo: 'https://logo',
    dueDate: '2023-07-02',
    deliverable: 'deliverable',
    handleDownloadInvoice: handleDownloadInvoice,
    invoiceDate: '22-02-2022',
    amount: 125.15,
    total: 125.15,
    paymentType: 'milestone',
    tag: {
        title: 'tag',
        sentiment: 'primary',
    },
};
describe('LeftSectionPaymentChoice', () => {
    it('LeftSectionPaymentChoice should render successfully with props', () => {
        const { baseElement } = render(<LeftSectionPaymentChoice {...props} />);
        expect(baseElement).toBeTruthy();
    });
});
