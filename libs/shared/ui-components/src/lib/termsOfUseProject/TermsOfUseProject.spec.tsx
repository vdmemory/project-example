import { render } from '@testing-library/react';
import TermsOfUseProject from './TermsOfUseProject';

describe('TermsOfUseProject', () => {
    it('should render successfully component', () => {
        // eslint-disable-next-line jsx-a11y/aria-role
        const { baseElement } = render(<TermsOfUseProject role="public" />);
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully content title', () => {
        // eslint-disable-next-line jsx-a11y/aria-role
        const { getByText } = render(<TermsOfUseProject role="public" />);
        expect(getByText('Breef’s project terms')).toBeTruthy();
    });

    it('should render successfully last update date', () => {
        // eslint-disable-next-line jsx-a11y/aria-role
        const { getByText } = render(<TermsOfUseProject role="public" />);
        expect(getByText('Last Updated: March 22, 2023')).toBeTruthy();
    });

    describe('TermsOfUsePage section titles', () => {
        const testCases = [
            { expected: 'LONG VERSION (The legal)' },
            { expected: '2. PROJECT PITCH' },
            { expected: '3. PROJECT CONTRACT' },
            { expected: '4. PAYMENTS AND NON-CIRCUMVENTION' },
            { expected: '5. BREEF FEES' },
            { expected: '6. CONFIDENTIALITY' },
            { expected: '7. WHAT’S NEXT?' },
        ];

        testCases.forEach((testCase, i) => {
            it(`should render successfully title section-${
                i + 1
            }`, async () => {
                // eslint-disable-next-line jsx-a11y/aria-role
                const { getByText } = render(
                    <TermsOfUseProject role="public" />,
                );
                expect(getByText(testCase.expected)).toBeTruthy();
            });
        });
    });

    it(`should render successfully link when role = 'public'`, () => {
        const { baseElement } = render(
            // eslint-disable-next-line jsx-a11y/aria-role
            <TermsOfUseProject role="public" />,
        );
        const hrefAttr = baseElement.querySelector('a')?.getAttribute('href');
        expect(hrefAttr).toBe('/public/terms-of-use');
    });

    it(`should render successfully link when role = 'client'`, () => {
        const { baseElement } = render(
            // eslint-disable-next-line jsx-a11y/aria-role
            <TermsOfUseProject role="client" />,
        );
        const hrefAttr = baseElement.querySelector('a')?.getAttribute('href');
        expect(hrefAttr).toBe('/client/terms-of-use');
    });

    it(`should render successfully link when role = 'agency'`, () => {
        const { baseElement } = render(
            // eslint-disable-next-line jsx-a11y/aria-role
            <TermsOfUseProject role="agency" />,
        );
        const hrefAttr = baseElement.querySelector('a')?.getAttribute('href');
        expect(hrefAttr).toBe('/agency/terms-of-use');
    });
});
