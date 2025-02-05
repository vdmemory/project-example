import React, { useEffect, useState } from 'react';
import {
    addDefaultDomain,
    addSocialDomain,
    calculationCharacterLength,
} from '@breef/shared/utils';
import { useErrorHandler } from './useErrorHandler';
import { DefaultPopup } from '../DefaultPopup';
import PopupField from '../../popupField/PopupField';
import { withPopup } from '../../Popup';

type SocialLinksPopupType = {
    title?: string;
    url?: string;
    isNotEditTitle?: boolean;
    isEdit: boolean;
    idx?: number;
    handleEditLinks?: ({
        title,
        link,
        idx,
    }: {
        title: string;
        link: string;
        idx: number;
    }) => void;
    handleAddLink?: ({ title, link }: { title: string; link: string }) => void;
    maxLengthLink?: number;
    isNotSocialLink?: boolean;
    close: () => void;
};

const SocialLinksPopup: React.FC<SocialLinksPopupType> = ({
    title,
    url,
    isNotEditTitle = false,
    isEdit,
    handleEditLinks,
    handleAddLink,
    idx,
    maxLengthLink = 1000,
    isNotSocialLink = false,
    close,
}) => {
    maxLengthLink = calculationCharacterLength(1000, title);

    const [titleLink, setTitleLink] = useState<string>(title || '');
    const [link, setLink] = useState<string>(url || '');
    const [linkError, setLinkError] = useState<boolean>(false);
    const [titleError, setTitleError] = useState<boolean>(false);

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setTitleLink(value);
    };

    const handleChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setLink(value);
    };

    const { checkValidateSocialLinks, checkValidationTitleLink } =
        useErrorHandler();

    useEffect(() => {
        setLinkError(
            checkValidateSocialLinks({
                link: link,
                maxLinkLength: 1000,
                titleLink: titleLink,
            }),
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);

    useEffect(() => {
        setTitleError(
            checkValidationTitleLink({
                maxLengthTitle: 30,
                titleLink: titleLink,
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [titleLink]);

    const handleEditSocialLinks = () => {
        handleEditLinks &&
            handleEditLinks({
                link: addDefaultDomain(addSocialDomain(titleLink, link)),
                title: titleLink,
                idx: idx || 0,
            });
        close();
    };
    const handleAddSocialLink = () => {
        handleAddLink &&
            handleAddLink({
                link: addDefaultDomain(addSocialDomain(titleLink, link)),
                title: titleLink,
            });
        close();
    };
    const onSubmit = () => {
        if (isEdit) {
            handleEditSocialLinks();
        } else {
            handleAddSocialLink();
        }
    };

    return (
        <DefaultPopup
            label="Add a link"
            isDisabledBtn={linkError || titleError}
            onClick={onSubmit}
            typeButton="button"
        >
            <PopupField
                type="text"
                label="Link Name"
                value={titleLink ? titleLink : ''}
                onChange={handleChangeTitle}
                placeholder="Enter your title..."
                minLength={1}
                maxLength={30}
                disabled={isNotEditTitle}
            />
            <PopupField
                type="text"
                label={isNotSocialLink ? 'URL' : 'Handle + URL'}
                value={link ? link : ''}
                onChange={handleChangeLink}
                placeholder={isNotSocialLink ? 'URL' : 'Add your @ or www...'}
                minLength={1}
                maxLength={maxLengthLink}
            />
        </DefaultPopup>
    );
};
export default withPopup(SocialLinksPopup);
