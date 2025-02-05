import { renderHook, act } from '@testing-library/react-hooks';
import { useSocialLinkHandlers } from './useSocialLinkHandlers';
import { SocialLinkType } from '@breef/shared/types';

describe('useSocialLinkHandlers', () => {
    it('should add a social link', () => {
        const handleChange = jest.fn();
        const value = [
            { title: 'Facebook', link: 'https://www.facebook.com' },
        ] as SocialLinkType[];
        const defaultLinksTitles = ['Facebook'];
        const lengthDefaultFields = 1;
        const { result } = renderHook(() =>
            useSocialLinkHandlers({
                handleChange,
                value,
                defaultLinksTitles,
                lengthDefaultFields,
            }),
        );

        const newLink = {
            title: 'Instagram',
            link: 'https://www.instagram.com',
        };

        act(() => {
            result.current.handleAddLink(newLink);
        });

        expect(handleChange).toHaveBeenCalledWith([
            ...value,
            { ...newLink, link: 'https://www.instagram.com' },
        ]);
    });

    it('should edit a social link', () => {
        const handleChange = jest.fn();
        const value = [
            { title: 'Facebook', link: 'https://www.facebook.com' },
        ] as SocialLinkType[];
        const defaultLinksTitles = ['Facebook'];
        const lengthDefaultFields = 1;
        const { result } = renderHook(() =>
            useSocialLinkHandlers({
                handleChange,
                value,
                defaultLinksTitles,
                lengthDefaultFields,
            }),
        );

        const updatedLink = {
            title: 'Facebook',
            link: 'https://www.facebook.com/new-link',
            idx: 0,
        };

        act(() => {
            result.current.handleEditLink(updatedLink);
        });

        expect(handleChange).toHaveBeenCalledWith([
            { title: 'Facebook', link: 'https://www.facebook.com/new-link' },
        ]);
    });

    it('should delete a social link', () => {
        const handleChange = jest.fn();
        const value = [
            { title: 'Facebook', link: 'https://www.facebook.com' },
            { title: 'Instagram', link: 'https://www.instagram.com' },
        ] as SocialLinkType[];
        const defaultLinksTitles = ['Facebook'];
        const lengthDefaultFields = 1;
        const { result } = renderHook(() =>
            useSocialLinkHandlers({
                handleChange,
                value,
                defaultLinksTitles,
                lengthDefaultFields,
            }),
        );

        act(() => {
            result.current.handleDeleteLink(1);
        });

        expect(handleChange).toHaveBeenCalledWith([
            { title: 'Facebook', link: 'https://www.facebook.com' },
        ]);
    });
});
