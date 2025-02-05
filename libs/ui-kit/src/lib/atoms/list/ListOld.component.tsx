import { FC, ReactNode, RefObject } from 'react';
import { StyledListOld } from './ListOld.styled';

interface ListItemProps {
    children: ReactNode;
    className?: string;
    ref?: RefObject<HTMLUListElement>;
}

const ListOld: FC<ListItemProps> = ({ children, className, ref }) => {
    return (
        <StyledListOld className={className} ref={ref}>
            {children}
        </StyledListOld>
    );
};

export default ListOld;
