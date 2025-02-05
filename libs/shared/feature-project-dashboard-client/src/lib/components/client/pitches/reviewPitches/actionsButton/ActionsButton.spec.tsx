import { ReviewDecisionNames } from '@breef/shared/constants';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ActionsButtons } from './ActionsButtons';

const props = {
    onClick: jest.fn(),
    isSubmitted: false,
    currentType: undefined,
};

describe('ActionsButtons', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ActionsButtons {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it(`should render successfully buttons group`, () => {
        render(<ActionsButtons {...props} />);
        const element = document.querySelector('.buttons-group');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully count button`, () => {
        const { getAllByTestId } = render(<ActionsButtons {...props} />);
        const element = getAllByTestId('button-container');
        expect(element).toHaveLength(2);
    });

    it(`should render successfully Skip button`, () => {
        const { getByText } = render(<ActionsButtons {...props} />);
        const element = getByText('Skip');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully Add to Shortlist button`, () => {
        const { getByText } = render(<ActionsButtons {...props} />);
        const element = getByText('Add to Shortlist');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully icons`, () => {
        render(<ActionsButtons {...props} />);
        const element = document.querySelectorAll('.icon-wrapper');
        expect(element).toHaveLength(2);
    });

    it(`should render successfully Add to Shortlist Active`, () => {
        const updateProps = {
            ...props,
            currentType: ReviewDecisionNames.ACCEPTED,
        };
        render(<ActionsButtons {...updateProps} />);
        const element = document.querySelector('.active-view');
        expect(element).toBeInTheDocument();
    });
});
