import { fireEvent, render } from '@testing-library/react';
import ExpansionPanel from './ExpansionPanel';

window.scrollTo = jest.fn();

const props = {
    title: 'title ExpansionPanel',
    description: 'descriptions ExpansionPanel',
};

describe('ExpansionPanel', () => {
    it('should render successfully ExpansionPanel with default props', () => {
        const { baseElement, getByText, getByTestId } = render(
            <ExpansionPanel {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('title ExpansionPanel')).toBeInTheDocument();
        expect(getByText('descriptions ExpansionPanel')).toBeInTheDocument();

        const expansionPanel = getByTestId('expansion-panel');
        fireEvent.click(expansionPanel);
        expect(getByText('descriptions ExpansionPanel')).toBeInTheDocument();
    });

    it('should render successfully ExpansionPanel with isMarked', () => {
        const { baseElement, getByText } = render(
            <ExpansionPanel {...props} isMarked />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('title ExpansionPanel')).toBeInTheDocument();
        expect(getByText('descriptions ExpansionPanel')).toBeInTheDocument();

        const expansionPanel = baseElement.querySelector(
            '.answer-text-wrapper',
        ) as HTMLElement;
        fireEvent.click(expansionPanel);
        expect(getByText('descriptions ExpansionPanel')).toBeInTheDocument();
    });
});
