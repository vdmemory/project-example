import { render } from '@testing-library/react';
import { Answers } from './Answers';
import { magnifierBlueImage } from '@breef/shared/assets';

const props = {
    title: 'FAQ Example',
    image: {
        src: magnifierBlueImage.src,
        position: {
            right: 15,
            bottom: 0,
        },
    },
    answersData: [
        {
            title: 'Test title',
            description: 'Test description',
        },
    ],
};
describe('Answers', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId, getByText } = render(
            <Answers {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('answers-wrapper').childElementCount).toEqual(1);
        expect(getByText('Test title')).toBeInTheDocument();
        expect(getByText('FAQ Example')).toBeInTheDocument();
    });
});
