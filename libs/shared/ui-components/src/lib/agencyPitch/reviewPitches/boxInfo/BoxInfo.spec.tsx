import { render } from '@testing-library/react';
import { BoxInfo } from './BoxInfo';
import 'intersection-observer';

const props = {
    label: 'Why They Fit',
    logo: 'https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/aff2c7c41798a9e8d510293d676b1308.png',
    name: 'Ninety Two Agency',
    adminNote: `Ninety Two has a great mix of experience, from real estate and automotive to retail and management. \n\r\nDue to their experience with both B2C and B2B brands, Ninety Two.`,
    brandLead: {
        name: 'Aditi D.',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs015Age8hka5yLPLaU51Wpm58YRwUPG5zdQ&usqp=CAU',
    },
};

describe('BoxInfo', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BoxInfo {...props} />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render BoxInfo', () => {
        const testCases = [
            { name: 'label', expected: props.label },
            {
                name: 'agency-name',
                expected: props.name,
            },
            { name: 'note', expected: /Ninety Two has/i },
            { name: 'brand-lead-name', expected: props.brandLead.name },
            { name: 'brand-lead-label', expected: 'Your Strategist' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully SideBar with ${testCase.name}`, async () => {
                const { getByText } = render(<BoxInfo {...props} />);
                expect(getByText(testCase.expected)).toBeInTheDocument();
            });
        });
    });

    it('should render successfully agency logo', () => {
        const { getByAltText } = render(<BoxInfo {...props} />);
        expect(getByAltText('Agency Logo')).toBeInTheDocument();
    });

    it('should render successfully brand lead avatar', () => {
        const { getByAltText } = render(<BoxInfo {...props} />);
        expect(getByAltText('Brand Lead Avatar')).toBeInTheDocument();
    });
});
