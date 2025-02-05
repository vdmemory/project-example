import { ReviewDecisionNames } from '@breef/shared/constants';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { NavigationList } from './NavigationList';
import 'intersection-observer';

const agenciesList = [
    {
        id: 1,
        name: 'Ninety One Agency',
        logo: 'https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/4a14e7b2de7f6eaf5a6c98cb8c00b8de.png',
        reviewDecision: ReviewDecisionNames.ACCEPTED,
        pitch: null,
    },
];

const props = {
    label: 'Agencies to Review',
    onSelect: jest.fn(),
    activeId: 4,
    list: agenciesList,
};

describe('Navigation', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<NavigationList {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully agency logo', () => {
        const { getByText } = render(<NavigationList {...props} />);
        expect(getByText(props.label)).toBeInTheDocument();
    });

    it('should render successfully agency logo', () => {
        const { getByAltText } = render(<NavigationList {...props} />);
        expect(getByAltText('Agency Logo')).toBeInTheDocument();
    });

    it(`should render successfully status`, () => {
        render(<NavigationList {...props} />);
        const element = document.querySelector('.status');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully tooltip`, () => {
        render(<NavigationList {...props} />);
        const element = document.querySelector('.tooltip');
        expect(element).toBeInTheDocument();
    });
});
