import { fireEvent, render } from '@testing-library/react';

import CropperContainer from './CropperContainer';

const onCropComplete = jest.fn();
const showCroppedImage = jest.fn();
const close = jest.fn();

const props = {
    isOpenPopup: true,
    onCropComplete,
    showCroppedImage,
    close,
};
describe('CropperContainer', () => {
    it('should render successfully CropperContainer with imageSrc', () => {
        const { baseElement, getByRole } = render(
            <CropperContainer imageSrc="https://www.image.com" {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByRole('img').getAttribute('src')).toEqual(
            'https://www.image.com',
        );
    });
    it('should render successfully CropperContainer without imageSrc', () => {
        const { queryByRole } = render(
            <CropperContainer imageSrc="" {...props} />,
        );
        expect(queryByRole('img')).toBeNull();
    });
    it('should render successfully CropperContainer with actions', () => {
        const { getByText } = render(
            <CropperContainer imageSrc="https://www.image.com" {...props} />,
        );
        fireEvent.click(getByText('save'));
        expect(showCroppedImage).toBeCalledTimes(1);
    });
});
