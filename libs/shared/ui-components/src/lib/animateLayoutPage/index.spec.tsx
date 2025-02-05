import { render, screen } from '@testing-library/react';
import AnimateLayoutPage from './AnimateLayoutPage';

const props = {
    headTitle: 'title AnimateLayoutPage',
    children: <div>AnimateLayoutPage children</div>,
};
describe('AnimateLayoutPage', () => {
    it('should render successfully AnimateLayoutPage', async () => {
        const { baseElement } = render(<AnimateLayoutPage {...props} />);
        expect(baseElement).toBeTruthy();
        expect(
            screen.getByText('AnimateLayoutPage children'),
        ).toBeInTheDocument();
    });
});
