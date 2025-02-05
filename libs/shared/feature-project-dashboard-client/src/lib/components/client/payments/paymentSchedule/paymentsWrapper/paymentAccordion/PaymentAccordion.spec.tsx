import { fireEvent, render } from '@testing-library/react';
import { PaymentAccordion, RowPaymentData } from './PaymentAccordion';
import {
    PaymentScheduleTag,
    PaymentScheduleTagRequest,
} from '@breef/shared/constants';
import { configTablePaymentsClientMobile } from '../../../configTablePaymentsClient';

const onMakePaymentClick = jest.fn();
const onDownloadClick = jest.fn();
const onActionListClick = jest.fn();

export const mockPaymentAccordionMobileButtons = {
    id: 1,
    button: {
        title: 'Make Payment',
        onClick: onMakePaymentClick,
    },
    link: {
        title: 'Download Contract',
        onClick: onDownloadClick,
    },
    actionsList: {
        onClick: onActionListClick,
        list: [
            {
                value: 'action',
                label: 'Do Action',
            },
        ],
    },
};

const props = {
    data: {
        id: 1,
        invoiceCode: 'CP1',
        description: 'test description',
        status: PaymentScheduleTag[PaymentScheduleTagRequest.paymentDue],
        type: 'Retainer',
    },
    columns: configTablePaymentsClientMobile,
    buttons: mockPaymentAccordionMobileButtons,
    editableRow: null,
    isEditable: false,
};
window.scrollTo = jest.fn();

describe('PaymentAccordion', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, queryByText } = render(
            <PaymentAccordion {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('CP1')).toBeInTheDocument();
        expect(getByText('test description')).toBeInTheDocument();
        expect(queryByText('Retainer')).toBe(null);
        expect(queryByText('Make Payment')).toBe(null);
        expect(queryByText('Download Contract')).toBe(null);
    });

    it('should open accordion on header click successfully', () => {
        const { getByText } = render(<PaymentAccordion {...props} />);
        const header = getByText('CP1');
        fireEvent.click(header);
        expect(getByText('Retainer')).toBeInTheDocument();
        expect(getByText('Make Payment')).toBeInTheDocument();
        expect(getByText('Download Contract')).toBeInTheDocument();
        expect(
            document.getElementsByClassName('drop-button')[0],
        ).toBeInTheDocument();
    });

    it('should call onDownloadClick and onMakePaymentClick on buttons click successfully', () => {
        const { getByText } = render(<PaymentAccordion {...props} />);
        fireEvent.click(getByText('CP1'));
        const buttonDownload = getByText('Download Contract');
        const buttonMakePayment = getByText('Make Payment');
        const buttonActionList =
            document.getElementsByClassName('drop-button')[0];
        fireEvent.click(buttonDownload);
        expect(onDownloadClick).toBeCalled();
        fireEvent.click(buttonMakePayment);
        expect(onMakePaymentClick).toBeCalled();
        fireEvent.click(buttonActionList);
        const actionItem = getByText('Do Action');
        expect(actionItem).toBeInTheDocument();
        fireEvent.click(actionItem);
        expect(onActionListClick).toBeCalledWith('action');
    });
});

const propsRowPaymentData = {
    title: 'Test Title',
    value: 'Test Value',
    tooltip: 'Tooltip Text',
};
describe('RowPaymentData', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, getByTestId } = render(
            <RowPaymentData {...propsRowPaymentData} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByText('Test Value')).toBeInTheDocument();
        expect(getByTestId('icon-question')).toBeInTheDocument();
    });

    it('should render without successfully', () => {
        const { queryByTestId } = render(
            <RowPaymentData {...propsRowPaymentData} tooltip="" />,
        );
        expect(queryByTestId('icon-question')).toBe(null);
    });
});
