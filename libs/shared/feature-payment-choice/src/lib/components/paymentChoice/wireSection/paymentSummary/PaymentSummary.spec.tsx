import { fireEvent, render, screen } from '@testing-library/react';
import PaymentSummary from './PaymentSummary';

const handleUploadFile = jest.fn();
const handleDeleteDocument = jest.fn();

const props = {
    bankAccount: {
        accountNumber: '1234',
        routingNumber: '4321',
        bankName: 'Chase Bank',
    },

    isLoading: false,
    handleUploadFile: handleUploadFile,
    handleDeleteDocument: handleDeleteDocument,
};

describe('PaymentSummary', () => {
    it('should render PaymentSummary successfully', () => {
        const { baseElement } = render(
            <PaymentSummary {...props} documentTitle="" code="1111" />,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('1234')).toBeInTheDocument();
        expect(screen.getByText('4321')).toBeInTheDocument();
        expect(screen.getByText('Chase Bank')).toBeInTheDocument();
        expect(screen.getByText('1111')).toBeInTheDocument();
        expect(screen.queryByText('SWIFT')).toBeInTheDocument();
    });

    it('should render PaymentSummary successfully without props code', () => {
        render(<PaymentSummary {...props} documentTitle="" />);
        expect(screen.queryByText('SWIFT')).toBeNull();
    });

    it('should render PaymentSummary successfully with dropzone', () => {
        const { baseElement } = render(
            <PaymentSummary {...props} documentTitle="" />,
        );
        const dropzone = baseElement.getElementsByClassName(
            'payment-summary-dropzone',
        )[0];
        expect(dropzone).toBeDefined();
    });

    it('should render PaymentSummary successfully without dropzone', () => {
        const { baseElement } = render(
            <PaymentSummary {...props} documentTitle="title" />,
        );
        const dropzone = baseElement.getElementsByClassName(
            'payment-summary-dropzone',
        )[0];
        expect(dropzone).not.toBeDefined();
    });

    it('should render PaymentSummary with action handleDeleteDocument', () => {
        const { baseElement } = render(
            <PaymentSummary
                {...props}
                documentTitle="document_title.pdf"
                code="1111"
            />,
        );
        expect(screen.getByText('document_title.pdf')).toBeInTheDocument();
        const documentTitle =
            baseElement.getElementsByClassName('trash-icon')[0];
        fireEvent.click(documentTitle);
        expect(handleDeleteDocument).toBeCalled();
    });
});
