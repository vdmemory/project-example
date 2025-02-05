import { render, screen } from '@testing-library/react';
import { StatusTag } from './StatusTag.component';
import { StatusTagType } from '@breef/shared/types';

const props = {
    sentiment: 'neutral',
    title: 'title tag',
} as StatusTagType;
describe('StatusTag', () => {
    it('StatusTag should render successfully ', () => {
        const { baseElement } = render(<StatusTag {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('title tag')).toBeInTheDocument();
    });
});
