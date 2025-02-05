import { render } from '@testing-library/react';
import SocialLinksPopup from './SocialLinksPopup';

const handleAddLink = jest.fn();
const handleEditLinks = jest.fn();
const defaultProps = {
    title: 'test title',
    url: 'url.com',
    isNotEditTitle: false,
    isEdit: false,
    handleEditLinks,
    handleAddLink,
    idx: 0,
    maxLengthLink: 1000,
    isNotSocialLink: false,
    close: jest.fn(),
};
describe('SocialLinksPopup', () => {
    it('should render successfully', () => {
        const {
            baseElement,
            getByText,
            getByDisplayValue,
            getByPlaceholderText,
        } = render(<SocialLinksPopup {...defaultProps} />);
        expect(baseElement).toBeTruthy();
        expect(getByDisplayValue('test title')).toBeInTheDocument();
        expect(getByText('Handle + URL')).toBeInTheDocument();
        expect(
            getByPlaceholderText('Add your @ or www...'),
        ).toBeInTheDocument();
    });
    it('should render with true isNotSocialLink param successfully', () => {
        const { getByText, getByPlaceholderText } = render(
            <SocialLinksPopup {...defaultProps} isNotSocialLink={true} />,
        );
        expect(getByText('URL')).toBeInTheDocument();
        expect(getByPlaceholderText('URL')).toBeInTheDocument();
    });
    it('should disable edit title link if isNotEditTitle prop is true', () => {
        const { getByPlaceholderText } = render(
            <SocialLinksPopup {...defaultProps} isNotEditTitle={true} />,
        );
        expect(getByPlaceholderText('Enter your title...')).toBeDisabled();
    });
});
