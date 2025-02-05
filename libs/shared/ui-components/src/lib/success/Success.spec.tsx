import { render, screen } from '@testing-library/react';

import { Success } from './Success';

const props = {
    text: 'text success',
    subtext: 'text subtext',
    isShowImage: false,
};

// isShowImage: true,

describe('Success', () => {
    it('should render successfully Success with default props', () => {
        const { baseElement } = render(<Success />);
        expect(baseElement).toBeTruthy();
        const maunText = screen.getByText(
            'We’ve sent the sign in link to your inbox :)',
        );
        const subtext = screen.getByText('Click on the link we sent to login.');
        const img = screen.getByRole('img');
        expect(maunText).toBeInTheDocument();
        expect(subtext).toBeInTheDocument();
        expect(img.getAttribute('src')).toEqual('src');
    });
    it('should render successfully Success with custom props', () => {
        const { baseElement } = render(<Success {...props} />);
        expect(baseElement).toBeTruthy();
        const maunText = screen.getByText('text success');
        const subtext = screen.getByText('text subtext');
        const img = screen.queryByRole('img');
        expect(maunText).toBeInTheDocument();
        expect(subtext).toBeInTheDocument();
        expect(img).toBeNull();
    });
});
