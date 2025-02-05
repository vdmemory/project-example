import React, { FC } from 'react';
import { TrailingIcon } from '@breef/shared/assets';
import { StyledLinkMore } from './LinkMore.styled';

interface LinkMoreProps {
    link: string;
    title: string;
}
export const LinkMore: FC<LinkMoreProps> = ({ link, title }) => (
    <StyledLinkMore href={link}>
        {title}
        <TrailingIcon />
    </StyledLinkMore>
);

export default LinkMore;
