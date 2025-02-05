import { render, screen } from '@testing-library/react';
import Accordion from './Accordion';

window.scrollTo = jest.fn();

const props = {
    title: 'title collapse',
    children: <div>Children collapse</div>,
};

describe('Accordion', () => {
    it('should render successfully Accordion', () => {
        const { baseElement } = render(<Accordion {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('title collapse')).toBeInTheDocument();
        expect(screen.getByText('Children collapse')).toBeInTheDocument();
    });
    it('should render successfully Accordion with props  isOpen', () => {
        const { baseElement } = render(
            <Accordion defaultIsOpen={true} {...props} />,
        );
        const collapseIsOpen = baseElement.getElementsByClassName(
            'accordion-inner-section-open',
        )[0];
        expect(collapseIsOpen).toBeDefined();
    });
    it('should render successfully Accordion without props  isOpen', () => {
        const { baseElement } = render(
            <Accordion defaultIsOpen={false} {...props} />,
        );
        const collapseIsOpen = baseElement.getElementsByClassName(
            'accordion-inner-section-open',
        )[0];
        expect(collapseIsOpen).not.toBeDefined();
    });
    it('should render successfully Accordion with props isTriangle and defaultIsOpen ', () => {
        const { baseElement } = render(
            <Accordion defaultIsOpen={true} isClosedEffect={true} {...props} />,
        );
        const collapseIsOpen = baseElement.getElementsByClassName(
            'accordion-header-triangle-hide',
        )[0];
        expect(collapseIsOpen).toBeDefined();
    });
    it('should render successfully Accordion with props isTriangle and without defaultIsOpen ', () => {
        const { baseElement } = render(
            <Accordion
                defaultIsOpen={false}
                isClosedEffect={true}
                {...props}
            />,
        );
        const collapseIsOpen = baseElement.getElementsByClassName(
            'accordion-header-triangle-hide',
        )[0];
        expect(collapseIsOpen).not.toBeDefined();
    });
});
