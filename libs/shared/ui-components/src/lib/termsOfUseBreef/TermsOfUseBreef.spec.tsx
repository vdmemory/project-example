import { render } from '@testing-library/react';
import TermsOfUseBreef from './TermsOfUseBreef';

describe('TermsOfUseBreef', () => {
    it('should render successfully component', () => {
        // eslint-disable-next-line jsx-a11y/aria-role
        const { baseElement } = render(<TermsOfUseBreef role="public" />);
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully content title', () => {
        // eslint-disable-next-line jsx-a11y/aria-role
        const { getByText } = render(<TermsOfUseBreef role="public" />);
        expect(getByText('Breef’s Terms of Use')).toBeTruthy();
    });

    it('should render successfully last update date', () => {
        // eslint-disable-next-line jsx-a11y/aria-role
        const { getByText } = render(<TermsOfUseBreef role="public" />);
        expect(getByText('Last Updated: March 1, 2020')).toBeTruthy();
    });

    describe('TermsOfUsePage section titles', () => {
        const testCases = [
            { expected: '1. General' },
            { expected: '2. The Breef Service' },
            { expected: '3. Eligibility to Access the Service' },
            { expected: '4. Term' },
            { expected: '5. Payments' },
            {
                expected:
                    '6. Introductions, Non-Circumvention and Audit Rights',
            },
            { expected: '7. Warranty Disclaimer' },
            { expected: '8. Service Content and Proprietary Rights' },
            { expected: '9. Account Details and Security' },
            { expected: '10. Email and Telephone Consent' },
            { expected: '11. Privacy' },
            { expected: '12. Confidential Information' },
            { expected: '13. Links to External Websites' },
            { expected: '14. Limitation of Liability' },
            { expected: '15. Indemnification' },
            { expected: '16. Dispute Resolution' },
            { expected: '17. General' },
            { expected: '18. Contact' },
        ];

        testCases.forEach((testCase, i) => {
            it(`should render successfully title section-${
                i + 1
            }`, async () => {
                // eslint-disable-next-line jsx-a11y/aria-role
                const { getByText } = render(<TermsOfUseBreef role="public" />);
                expect(getByText(testCase.expected)).toBeTruthy();
            });
        });
    });

    it(`should render successfully link when role = 'public'`, () => {
        const { baseElement } = render(
            // eslint-disable-next-line jsx-a11y/aria-role
            <TermsOfUseBreef role="public" />,
        );
        const hrefAttr = baseElement.querySelector('a')?.getAttribute('href');
        expect(hrefAttr).toBe('/public/privacy-policy');
    });

    it(`should render successfully link when role = 'client'`, () => {
        const { baseElement } = render(
            // eslint-disable-next-line jsx-a11y/aria-role
            <TermsOfUseBreef role="client" />,
        );
        const hrefAttr = baseElement.querySelector('a')?.getAttribute('href');
        expect(hrefAttr).toBe('/client/privacy-policy');
    });

    it(`should render successfully link when role = 'agency'`, () => {
        const { baseElement } = render(
            // eslint-disable-next-line jsx-a11y/aria-role
            <TermsOfUseBreef role="agency" />,
        );
        const hrefAttr = baseElement.querySelector('a')?.getAttribute('href');
        expect(hrefAttr).toBe('/agency/privacy-policy');
    });
});
