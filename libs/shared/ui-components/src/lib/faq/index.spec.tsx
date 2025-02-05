import { render, screen } from '@testing-library/react';
import Faq from './Faq';

describe('Faq', () => {
    it('should render successfully Faq with role public', () => {
        // eslint-disable-next-line jsx-a11y/aria-role
        const { baseElement } = render(<Faq role="public" />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Privacy Policy').getAttribute('href')).toEqual(
            '/public/privacy-policy',
        );
    });
    it('should render successfully Faq with role agency', () => {
        // eslint-disable-next-line jsx-a11y/aria-role
        const { baseElement } = render(<Faq role="agency" />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Privacy Policy').getAttribute('href')).toEqual(
            '/agency/privacy-policy',
        );
    });
    it('should render successfully Faq with role client', () => {
        // eslint-disable-next-line jsx-a11y/aria-role
        const { baseElement } = render(<Faq role="client" />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Privacy Policy').getAttribute('href')).toEqual(
            '/client/privacy-policy',
        );
    });

    describe('Faq section titles', () => {
        const testCases = [
            { expectedTitle: 'About', expectedId: 'about' },
            { expectedTitle: 'Pricing', expectedId: 'pricing' },
            { expectedTitle: 'Clients', expectedId: 'clients' },
            { expectedTitle: 'Agencies', expectedId: 'agencies' },
            { expectedTitle: 'Policies', expectedId: 'policies' },
        ];

        testCases.forEach((testCase, i) => {
            it(`should render successfully title section-${
                i + 1
            }`, async () => {
                const { getByText, baseElement } = render(
                    // eslint-disable-next-line jsx-a11y/aria-role
                    <Faq role="public" />,
                );
                expect(getByText(testCase.expectedTitle)).toBeTruthy();
                const idAttr = baseElement
                    .querySelectorAll('.anchor')
                    [i].getAttribute('id');
                expect(idAttr).toBe(testCase.expectedId);
            });
        });
    });

    describe('Faq navigation titles', () => {
        const testCases = [
            { expectedTitle: 'about', expectedHref: '#about' },
            { expectedTitle: 'pricing', expectedHref: '#pricing' },
            { expectedTitle: 'clients', expectedHref: '#clients' },
            { expectedTitle: 'agencies', expectedHref: '#agencies' },
            { expectedTitle: 'policies', expectedHref: '#policies' },
        ];

        testCases.forEach((testCase, i) => {
            it(`should render successfully title section-${
                i + 1
            }`, async () => {
                const { getByText, baseElement } = render(
                    // eslint-disable-next-line jsx-a11y/aria-role
                    <Faq role="public" />,
                );
                const hrefAttr = baseElement
                    .querySelectorAll('a')
                    [i].getAttribute('href');
                expect(getByText(testCase.expectedTitle)).toBeTruthy();
                expect(hrefAttr).toBe(testCase.expectedHref);
            });
        });
    });
});
