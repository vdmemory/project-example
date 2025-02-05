import { render } from '@testing-library/react';
import 'intersection-observer';
import TipCard from './TipCard';

const props = {
    tip: {
        title: 'test tip title',
        description: 'test tip description',
    },
    leadFirstName: 'LeadFirstName',
    leadLastName: 'LeadLastName',
};
const multipleTips = [
    {
        title: 'test first tip title',
        description: 'test first tip description',
    },
    {
        title: 'test second tip title',
        description: 'test second tip description',
    },
];

describe('TipCard', () => {
    it('should render successfully ', () => {
        const { baseElement, getByText } = render(<TipCard {...props} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('test tip title')).toBeInTheDocument();
        expect(getByText('test tip description')).toBeInTheDocument();
        expect(getByText('LeadFirstName LeadLastName')).toBeInTheDocument();
        expect(document.getElementsByClassName('fixed')[0]).toBeDefined();
    });
    it('should render TipCard with multiple tips successfully ', () => {
        const { getByText } = render(<TipCard {...props} tip={multipleTips} />);
        expect(getByText('test first tip title')).toBeInTheDocument();
        expect(getByText('test first tip description')).toBeInTheDocument();
        expect(getByText('test second tip title')).toBeInTheDocument();
        expect(getByText('test second tip description')).toBeInTheDocument();
    });
});
