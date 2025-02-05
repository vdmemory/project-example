import { render } from '@testing-library/react';
import PrivacyPolicy from './PrivacyPolicy';

const renderElement = () => {
    const methods = render(<PrivacyPolicy />);
    return { ...methods };
};

describe('PrivacyPolicy', () => {
    it('should render successfully', () => {
        const { baseElement } = renderElement();
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully title', () => {
        const { getByText } = renderElement();
        expect(getByText('Breef’s Privacy policy')).toBeTruthy();
    });

    it('should render successfully link', () => {
        const { getAllByText } = renderElement();
        expect(
            getAllByText('support@breef.com')[0].getAttribute('href'),
        ).toEqual('mailto:support@breef.com');
    });

    describe('TermsOfUsePage section titles', () => {
        const testCases = [
            { expected: 'Information Breef Collects' },
            { expected: 'How Breef uses your Information' },
            { expected: 'Who we share your Information with' },
            { expected: 'Project and Pitch Details' },
            { expected: 'Client and Agency Talent Account details' },
            { expected: 'Who you may share user Content with' },
            { expected: 'Marketing Communications' },
            { expected: 'Advertisements' },
            { expected: 'Cookies, Log Data, Gifs/web beacons' },

            { expected: 'Links to third party websites' },
            { expected: 'Managing your Account information' },
            { expected: 'Security' },
            { expected: 'Passwords and Account Protection' },

            { expected: 'Information Storage and Transfer' },
            { expected: 'Change in Control' },
            { expected: 'How long we keep User Information' },

            { expected: 'Compliance with Laws' },
            { expected: "Children's Privacy and Age" },
            { expected: 'Contacting Us' },
        ];

        testCases.forEach((testCase, i) => {
            it(`should render successfully title section-${
                i + 1
            }`, async () => {
                const { getByText } = renderElement();
                expect(getByText(testCase.expected)).toBeTruthy();
            });
        });
    });
});
