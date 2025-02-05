import React, { FC, ReactNode, MouseEvent } from 'react';
import { StyledListItem } from './ListItem.styled';

interface ListItemProps {
    onClick?: (e: MouseEvent<HTMLLIElement>) => void;
    isSelected?: boolean;
    children: ReactNode;
}

const ListItem: FC<ListItemProps> = ({
    onClick,
    children,
    isSelected = false,
}) => {
    return (
        <StyledListItem isSelected={isSelected} onClick={onClick}>
            {children}
        </StyledListItem>
    );
};

export default ListItem;
