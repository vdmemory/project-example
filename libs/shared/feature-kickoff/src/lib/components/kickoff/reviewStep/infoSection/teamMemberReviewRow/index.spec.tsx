import { render, screen } from '@testing-library/react';
import TeamMemberReviewRow from './TeamMemberReviewRow';

const props = {
    firstName: 'name',
    lastName: 'surname',
    email: 'test@gmail.com',
    phoneNumber: '+234235235',
};

describe('TeamMemberReviewRow', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TeamMemberReviewRow {...props} />);
        expect(baseElement).toBeTruthy();
        const phoneIconWrapper = screen.getByTestId('icon-phone-wrapper');
        expect(phoneIconWrapper).toBeTruthy();
    });
});
