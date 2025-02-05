import { render, screen } from '@testing-library/react';
import PayInformation from './PayInformation';

const onClick = jest.fn();
const props = {
    projectName: 'project name',
    price: 1000,
    discountPrice: 300,
    couponName: null,
    onClick,
};
const children = <div>test children</div>;
describe('PayInformation', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<PayInformation {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getAllByText('$1000')[0]).toBeInTheDocument();
    });
    it('should render successfully with total block', () => {
        const { baseElement } = render(
            <PayInformation {...props} discountPrice={700} />,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('$700'));
    });

    it('should render successfully with coupon block', () => {
        const { baseElement } = render(
            <PayInformation
                {...props}
                discountPrice={700}
                couponName="WELCOME"
            />,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('-$300'));
    });
    it('should render with discount successfully', () => {
        const { baseElement, getByText } = render(
            <PayInformation
                {...props}
                discountPrice={500}
                couponName="WELCOME"
            />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('$500')).toBeInTheDocument();
    });
});
