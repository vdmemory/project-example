import { render, screen } from '@testing-library/react';

import { NextStep } from './NextStep';
import { CalendarIcon } from '@breef/shared/assets';

const props = {
    icon: <CalendarIcon />,
    label: 'label',
};
describe('NextStep onboarding', () => {
    it('should render successfully NextStep with numberStep 1', () => {
        const { baseElement } = render(<NextStep numberStep={1} {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('label')).toBeInTheDocument();
        expect(screen.getByText('001')).toBeInTheDocument();
    });
    it('should render successfully NextStep with numberStep 1', () => {
        render(<NextStep numberStep={2} {...props} />);
        expect(screen.getByText('002')).toBeInTheDocument();
    });
});
