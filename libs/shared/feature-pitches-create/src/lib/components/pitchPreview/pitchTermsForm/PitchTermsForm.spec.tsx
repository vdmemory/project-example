import { render } from '@testing-library/react';
import { PitchTermsForm } from './PitchTermsForm';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import * as nextRouter from 'next/router';

const props = {
    onChange: () => {},
    checked: false,
};

const useRouter = jest.spyOn(nextRouter, 'useRouter');
const router = useRouter.getMockImplementation()?.() as NextRouter;
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            asPath: '/asPath',
        };
    },
}));

describe('PitchTermsForm', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <RouterContext.Provider value={router}>
                <PitchTermsForm {...props} />
            </RouterContext.Provider>,
        );
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render PitchTermsForm', () => {
        const testCases = [
            { name: 'title 1', expected: '1. Accept Terms' },
            {
                name: 'description 1',
                expected:
                    'To access the project scope, please review Breef’s Terms below.',
            },
            { name: 'title 2', expected: '2. Review Scope' },
            {
                name: 'description 2',
                expected:
                    'Take a look at the project scope to get a better sense of the project.',
            },
            {
                name: 'title 3',
                expected:
                    'Pitch in ~20 mins! Share more about your team, expertise + approach.',
            },
            { name: 'Terms of Use link', expected: 'Terms of Use' },
            { name: 'Project Terms', expected: 'Project Terms' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully PitchTermsForm with ${testCase.name}`, () => {
                const { getByText } = render(
                    <RouterContext.Provider value={router}>
                        <PitchTermsForm {...props} />
                    </RouterContext.Provider>,
                );
                const element = getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });
    });

    it(`should render successfully ChoiceOfInterestForm with close button`, () => {
        const updateProps = {
            ...props,
            checked: true,
        };
        render(
            <RouterContext.Provider value={router}>
                <PitchTermsForm {...updateProps} />
            </RouterContext.Provider>,
        );
        const element = document.querySelector('input[type="checkbox"]');
        const isChecked = element?.getAttribute('checked');
        expect(element).toBeInTheDocument();
        expect(isChecked).toBeTruthy;
    });
});
