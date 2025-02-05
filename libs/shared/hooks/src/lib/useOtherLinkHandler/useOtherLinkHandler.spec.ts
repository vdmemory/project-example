import { renderHook } from '@testing-library/react-hooks';
import { useOtherLinkHandler } from './useOtherLinkHandler';
import { SocialLinkType } from '@breef/shared/types';

describe('useOtherLinkHandler', () => {
    const defaultLinksTitles = ['Facebook', 'Twitter', 'Instagram'];
    const lengthDefaultFields = defaultLinksTitles.length;

    it('should add a new link when handleAddOtherLink is called', () => {
        const handleChangeMock = jest.fn();
        const value = [] as SocialLinkType[];
        const { result } = renderHook(() =>
            useOtherLinkHandler({
                handleChange: handleChangeMock,
                value,
                defaultLinksTitles,
                lengthDefaultFields,
            }),
        );
        const title = 'LinkedIn';
        const link = 'https://www.linkedin.com/in/my-profile';

        result.current.handleAddOtherLink({ title, link });

        expect(handleChangeMock).toHaveBeenCalledWith([
            { title: title, link: link },
        ]);
    });

    it('should edit a link when handleEditOtherLink is called', () => {
        const handleChangeMock = jest.fn();
        const value = [
            {
                title: 'LinkedIn',
                link: 'https://www.linkedin.com/in/my-profile',
            },
        ] as SocialLinkType[];
        const { result } = renderHook(() =>
            useOtherLinkHandler({
                handleChange: handleChangeMock,
                value,
                defaultLinksTitles,
                lengthDefaultFields,
            }),
        );
        const newTitle = 'My LinkedIn Profile';
        const newLink = 'https://www.linkedin.com/in/new-profile';
        const idx = 0;

        result.current.handleEditOtherLink({
            title: newTitle,
            link: newLink,
            idx,
        });

        expect(handleChangeMock).toHaveBeenCalledWith([
            { title: newTitle, link: newLink },
        ]);
    });

    it('should delete a link when handleDeleteOtherLink is called', () => {
        const handleChangeMock = jest.fn();
        const value = [
            {
                title: 'LinkedIn',
                link: 'https://www.linkedin.com/in/my-profile',
            },
            { title: 'Twitter', link: 'https://twitter.com/my-handle' },
        ] as SocialLinkType[];
        const { result } = renderHook(() =>
            useOtherLinkHandler({
                handleChange: handleChangeMock,
                value,
                defaultLinksTitles,
                lengthDefaultFields,
            }),
        );
        const idx = 1;

        result.current.handleDeleteOtherLink(idx);

        expect(handleChangeMock).toHaveBeenCalledWith([
            {
                title: 'LinkedIn',
                link: 'https://www.linkedin.com/in/my-profile',
            },
        ]);
    });
});
