import { render } from '@testing-library/react';
import { CalendlyWidget, CalendlyEvents } from './CalendlyWidget';

describe('CalendlyWidget', () => {
    it('renders CalendlyWidget component', () => {
        const { baseElement } = render(
            <CalendlyWidget
                onChange={(events: CalendlyEvents, email: string) => undefined}
            />,
        );

        const calendlyWidget = baseElement.querySelector(
            '.calendly-inline-widget',
        );
        expect(calendlyWidget).toBeInTheDocument();
    });
});
