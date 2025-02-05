import { render, screen } from '@testing-library/react';
import InfoSection from './InfoSection';

const memberName = 'name';
const memberSurname = 'surname';
const props = {
    members: [
        {
            firstName: memberName,
            lastName: memberSurname,
            email: 'test@gmail.com',
            phoneNumber: '+234235235',
        },
    ],
    legalName: 'Legal Name',
};

describe('InfoSection', () => {
    it('should render with client user type successfully', () => {
        const { baseElement } = render(
            <InfoSection {...props} userType="client" />,
        );
        expect(baseElement).toBeTruthy();
        const headerComponent = screen.getByText(/Company info/gi);
        expect(headerComponent).toBeTruthy();
        const firstMemberInfoElem = screen.getByText(
            `${memberName} ${memberSurname}`,
        );
        expect(firstMemberInfoElem).toBeTruthy();
    });
    it('should render with agency user type successfully', () => {
        const { baseElement } = render(
            <InfoSection {...props} userType="agency" />,
        );
        expect(baseElement).toBeTruthy();
        const headerComponent = screen.getByText(/Agency info/gi);
        expect(headerComponent).toBeTruthy();
    });
});
