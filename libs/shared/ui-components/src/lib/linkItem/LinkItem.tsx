import React, { FC } from 'react';
import { LinkItemStyled } from './LinkItem.styled';
import { SquareLinkIcon } from '@breef/shared/assets';
import { urlToDefaultFormat } from '@breef/shared/utils';

interface LinkItemProps {
    title: string;
    link: string;
}
export const LinkItem: FC<LinkItemProps> = ({ title, link }) => {
    return (
        <LinkItemStyled
            href={urlToDefaultFormat(link)}
            target="_blank"
            title={title}
        >
            <SquareLinkIcon />
            <span>{title}</span>
        </LinkItemStyled>
    );
};

export default LinkItem;
