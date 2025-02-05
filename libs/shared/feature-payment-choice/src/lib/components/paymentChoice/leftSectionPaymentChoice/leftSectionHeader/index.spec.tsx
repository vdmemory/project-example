import { screen, render } from '@testing-library/react';
import LeftSectionHeader from './LeftSectionHeader';

const props = {
    invoiceCode: '123321',
    invoiceDate: '22/02/2022',
};
describe('LeftSectionHeader', () => {
    it('LeftSectionHeader should render successfully with props', () => {
        const { baseElement } = render(<LeftSectionHeader {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Invoice Due')).toBeInTheDocument();
        expect(screen.getByText('123321')).toBeInTheDocument();
        expect(screen.getByText('22/02/2022')).toBeInTheDocument();
    });
    it('LeftSectionHeader should render successfully with out props tag', () => {
        const { baseElement } = render(<LeftSectionHeader {...props} />);
        const tagElement = baseElement.getElementsByClassName('tag-status')[0];
        expect(tagElement).toBeUndefined();
    });
    it('LeftSectionHeader should render successfully with props tag', () => {
        const { baseElement } = render(
            <LeftSectionHeader
                tag={{
                    title: 'overdue X days',
                    sentiment: 'negative',
                }}
                {...props}
            />,
        );
        const tagElement = baseElement.getElementsByClassName('tag-status')[0];
        expect(tagElement).toBeDefined();
    });
});
