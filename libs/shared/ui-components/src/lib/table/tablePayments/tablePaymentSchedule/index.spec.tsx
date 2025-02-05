import { render, screen } from '@testing-library/react';
import TablePaymentSchedule from './TablePaymentSchedule';

const props = {
    payments: [
        {
            type: 'milestone',
            invoiceDate: 'invoiceDate',
            payBy: 'payBy',
            deliverable: 'deliverable',
            amount: 'amount',
            teamTake: 'teamTake',
        },
    ],
    isHideTypeColumn: false,
    isHideTeamTakeColumn: false,
};

describe('TablePaymentSchedule', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TablePaymentSchedule {...props} />);
        expect(baseElement).toBeTruthy();
        const teamTakeColumn = screen.getByText(/Team Take/gi);
        expect(teamTakeColumn).toBeTruthy();
        const typeColumn = screen.getByText(/Type/gi);
        expect(typeColumn).toBeTruthy();
        const firstPaymentSerialNumber = screen.getByText('0001');
        expect(firstPaymentSerialNumber).toBeTruthy();
    });
});
