import React, { FC } from 'react';
import { AnchorLink } from '../AnchorLink';
import { getTitleLink } from '@breef/shared/utils';
import { otherLinkTitles } from '@breef/shared/constants';

interface OtherLinkProps {
    title: string;
    link: string;
    className?: string;
}

export const OtherLink: FC<OtherLinkProps> = ({ link, title, className }) => {
    const linkChildren = getTitleLink({
        title: title.toLowerCase(),
        link,
        defaultLinkTitles: [...otherLinkTitles],
    }).toLowerCase();

    return (
        <AnchorLink href={link} className={className}>
            {linkChildren}
        </AnchorLink>
    );
};
