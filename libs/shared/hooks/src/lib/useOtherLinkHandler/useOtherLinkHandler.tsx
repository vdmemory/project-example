import { SocialLinkType } from '@breef/shared/types';

export const useOtherLinkHandler = ({
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
    const handleAddOtherLink = ({
        title,
        link,
    }: {
        title: string;
        link: string;
    }) => {
        const newListLinks = [...value, { title: title, link: link }];
        handleChange(newListLinks as SocialLinkType[]);
    };

    const handleEditOtherLink = ({
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
                return { ...item, link: link, title: title };
            } else {
                return item;
            }
        });
        handleChange(newListLinks);
    };

    const handleDeleteOtherLink = (idx: number) => {
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
        handleAddOtherLink,
        handleEditOtherLink,
        handleDeleteOtherLink,
    };
};
