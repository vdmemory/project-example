import { ListType } from '@breef/shared/types';
import { urlToDefaultFormat } from '@breef/shared/utils';
import { ChangeHandler } from 'react-hook-form';

export const useDocumentController = ({
    documentsValue,
    onChange,
}: {
    documentsValue: ListType[];
    onChange: ChangeHandler;
}) => {
    const saveDocument = (
        fileLink: ListType[],
        currentFileId?: number | string,
    ) => {
        if (currentFileId) {
            return onChange({
                target: {
                    value: documentsValue.map(item => {
                        if (item.id === currentFileId) {
                            return {
                                ...item,
                                ...fileLink[0],
                            };
                        }

                        return item;
                    }),
                },
            });
        }

        return onChange({
            target: {
                value: [...documentsValue, ...fileLink],
            },
        });
    };

    const handleDeleteLink = (id: number | string) => {
        onChange({
            target: {
                value: documentsValue.filter(link => link.id !== id),
            },
        });
    };

    const handleEditLink = (
        id: number | string,
        title: string,
        link: string,
    ) => {
        onChange({
            target: {
                value: documentsValue.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            title,
                            link,
                        };
                    }
                    return item;
                }),
            },
        });
    };

    const handleAddLink = ({
        title,
        link,
    }: {
        title: string;
        link: string;
    }) => {
        onChange({
            target: {
                value: [
                    ...documentsValue,
                    {
                        id: +new Date(),
                        title,
                        link: urlToDefaultFormat(link),
                        type: 'link',
                    },
                ],
            },
        });
    };

    return { saveDocument, handleDeleteLink, handleEditLink, handleAddLink };
};
