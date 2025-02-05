import { render, waitFor, screen } from '@testing-library/react';
import SideBar from './SideBar';
import { mockConfiguredStore } from '../../../store/mockStore';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';

const renderWithProvider = (children: ReactNode) => (
    <Provider store={mockConfiguredStore}>{children}</Provider>
);

describe('SideBar', () => {
    it('should render with step 1 successfully', () => {
        render(renderWithProvider(<SideBar step={1} />));
        expect(screen.getByText('Let’s create your project'));
        expect(
            screen.getByText(
                'To start, tell us more about what type of agency support you’re looking for. We’ll build a project scope based on your goals, budget and preferences.',
            ),
        );
    });
    it('should render with step 2 successfully', () => {
        render(renderWithProvider(<SideBar step={2} />));
        expect(screen.getByText('Your ideal agency'));
        expect(
            screen.getByText(
                'Share more about your ideal agency. What’s important to you? We consider various factors to ensure that your agency pitches are the perfect fit.',
            ),
        );
    });
    it('should render with step 3 successfully', () => {
        render(renderWithProvider(<SideBar step={3} />));
        expect(screen.getByText('Your project scope'));
    });
    it('should render with step 4 successfully', () => {
        render(renderWithProvider(<SideBar step={4} />));
        expect(screen.getByText('Last step: your company'));
    });
});
