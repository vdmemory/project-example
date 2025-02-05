import { render } from '@testing-library/react';
import { ChoiceOfInterestForm } from './ChoiceOfInterestForm';
import { mockPassReasonsList } from '../../../store/mockStore';

const props = {
    className: 'classNameCustom',
    onSubmit: () => {},
    onClose: () => {},
    list: mockPassReasonsList,
};

describe('ChoiceOfInterestForm', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ChoiceOfInterestForm {...props} />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render ChoiceOfInterestForm', () => {
        const testCases = [
            { name: 'title', expected: 'Here’s to the next!' },
            {
                name: 'description',
                expected:
                    'We’re sorry this wasn’t the perfect fit. Tell us why — your feedback informs future projects we invite you to, so that we get it right next time.',
            },
            { name: 'button submit', expected: 'SUBMIT' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully ChoiceOfInterestForm with ${testCase.name}`, () => {
                const { getByText } = render(
                    <ChoiceOfInterestForm {...props} />,
                );
                const element = getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });
    });

    it(`should render successfully ChoiceOfInterestForm with title card select`, () => {
        const { getAllByText } = render(<ChoiceOfInterestForm {...props} />);
        const element = getAllByText('Budget Too Low');
        expect(element).toHaveLength(6);
    });

    const text =
        'We’re sorry this wasn’t the perfect fit. Tell us why — your feedback informs future projects we invite you to, so that we get it right next time.';

    it(`should render successfully ChoiceOfInterestForm with title card select`, () => {
        const { getAllByText } = render(<ChoiceOfInterestForm {...props} />);
        const element = getAllByText(text);
        expect(element).toHaveLength(1);
    });

    it(`should render successfully ChoiceOfInterestForm with custom className`, () => {
        render(<ChoiceOfInterestForm {...props} />);
        const element = document.querySelector('.classNameCustom');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully ChoiceOfInterestForm with close button`, () => {
        render(<ChoiceOfInterestForm {...props} />);
        const element = document.querySelector('.close-button');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully ChoiceOfInterestForm with close button`, () => {
        render(<ChoiceOfInterestForm {...props} />);
        const element = document.querySelectorAll('.checkbox');
        expect(element).toHaveLength(6);
    });

    it(`should render successfully ChoiceOfInterestForm with close button`, () => {
        const updateProps = {
            ...props,
            isSubmitted: true,
        };
        render(<ChoiceOfInterestForm {...updateProps} />);
        const element = document.querySelector('.loader');
        expect(element).toBeInTheDocument();
    });
});
