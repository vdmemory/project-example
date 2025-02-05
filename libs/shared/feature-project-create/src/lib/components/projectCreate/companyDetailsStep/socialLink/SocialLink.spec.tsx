import SocialLink from './SocialLink';
import { fireEvent, render, screen } from '@testing-library/react';
import { SocialNameEnum } from '@breef/shared/constants';

const onChange = jest.fn();
const onBlur = jest.fn();
const props = {
    socialName: SocialNameEnum.Tiktok,
    value: '',
    onChange,
    onBlur,
    error: '',
};

describe('SocialLink', () => {
    it('should render successfully', () => {
        render(<SocialLink {...props} />);
        expect(screen.getByText('TikTok')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    });
    it('should call remove link functionality successfully', () => {
        render(<SocialLink {...props} />);
        const buttonRemove = document.getElementsByClassName('trash')[0];
        fireEvent.click(buttonRemove);
        expect(onChange).toBeCalledWith(null);
    });
    it('should change value successfully', () => {
        render(<SocialLink {...props} />);
        const input = screen.getByPlaceholderText('Username');
        fireEvent.change(input, { target: { value: '@test' } });
        expect(onChange).toBeCalledWith('@test');
    });
    it('should render with error successfully', () => {
        render(<SocialLink {...props} error="test error" />);
        expect(screen.getByText('test error')).toBeInTheDocument();
    });
});
