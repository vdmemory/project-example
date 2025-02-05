import { render, screen } from '@testing-library/react';
import { AnimationOpacity } from './AnimationOpacity';

const props = {
    children: <div>children AnimationOpacity</div>,
    className: 'animate class',
};
describe('AnimationOpacity', () => {
    it('should render successfully AnimationOpacity', () => {
        const { baseElement } = render(<AnimationOpacity {...props} />);
        expect(baseElement).toBeTruthy();

        expect(
            screen.getByText('children AnimationOpacity'),
        ).toBeInTheDocument();
        expect(
            baseElement.getElementsByClassName('animate class')[0],
        ).toBeDefined();
    });
});
