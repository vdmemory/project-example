import { SocialLinkType } from '@breef/shared/types';
import { removeSpaceSymbol } from '@breef/shared/utils';

export const useSocialLinkHandlers = ({
    handleChange,
    value,
    defaultLinksTitles,
    lengthDefaultFields,
}: {
    handleChange: (links: SocialLinkType[]) => void;
    value: SocialLinkType[];
    defaultLinksTitles: string[];
    lengthDefaultFields: number;
}) => {
    const handleAddLink = ({
        title,
        link,
    }: {
        title: string;
        link: string;
    }) => {
        const newListLinks = [
            ...value,
            { title: title, link: removeSpaceSymbol(link) },
        ];
        handleChange(newListLinks as SocialLinkType[]);
    };

    const handleEditLink = ({
        title,
        link,
        idx,
    }: {
        title: string;
        link: string;
        idx: number;
    }) => {
        const newListLinks = (value as SocialLinkType[]).map((item, i) => {
            if (i === idx) {
                return { ...item, link: removeSpaceSymbol(link), title: title };
            } else {
                return item;
            }
        });
        handleChange(newListLinks);
    };

    const handleDeleteLink = (idx: number) => {
        let newListLinks: SocialLinkType[] = [];
        if (
            idx <= lengthDefaultFields &&
            defaultLinksTitles.includes(
                (value as SocialLinkType[])[idx].title?.toLowerCase() as string,
            )
        ) {
            newListLinks = (value as SocialLinkType[]).map((item, i) => {
                if (i === idx) {
                    return { ...item, title: item.title, link: '' };
                } else {
                    return item;
                }
            });
        } else {
            newListLinks = (value as SocialLinkType[]).filter(
                (_, i) => i !== idx,
            );
        }

        handleChange(newListLinks);
    };

    return {
        handleAddLink,
        handleEditLink,
        handleDeleteLink,
    };
};
