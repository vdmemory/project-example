import { render } from '@testing-library/react';
import { TermsAndContracts } from './TermsAndContracts';

const props = {
    paymentTerms: 0,
    linkDownloadContract: 'example.com',
    downloadText: 'Download Contracts',
};
describe('TermsAndContracts', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <TermsAndContracts {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Download Contracts')).toBeInTheDocument();
        expect(getByText('Payment Terms: NET 0')).toBeInTheDocument();
    });
    it('should render without terms successfully', () => {
        const { queryByTestId } = render(
            <TermsAndContracts {...props} paymentTerms={undefined} />,
        );
        expect(queryByTestId('payment-terms')).toBe(null);
    });
});
