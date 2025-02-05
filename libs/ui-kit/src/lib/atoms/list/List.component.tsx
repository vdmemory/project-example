import React, { FC, ReactNode, RefObject } from 'react';
import { StyledList } from './List.styled';

interface ListItemProps {
    children: ReactNode;
    className?: string;
    ref?: RefObject<HTMLUListElement>;
}

const List: FC<ListItemProps> = ({ children, className, ref }) => {
    return (
        <StyledList className={className} ref={ref}>
            {children}
        </StyledList>
    );
};

export default List;
