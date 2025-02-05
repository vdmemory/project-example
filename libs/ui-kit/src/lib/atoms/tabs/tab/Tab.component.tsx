import { StyledTab } from './Tab.styled';

interface TabProps {
    children?: React.ReactNode;
    title: string;
    icon?: React.ReactNode;
    value: string;
    onClick: (key: string) => void;
    isActive?: boolean;
    className?: string;
}

export const Tab = ({
    children,
    title,
    icon,
    value,
    onClick,
    className,
    isActive,
}: TabProps) => {
    return (
        <StyledTab
            className={className}
            isActive={isActive}
            onClick={() => onClick(value)}
        >
            {icon ?? null}
            {title ? <p>{title}</p> : null}
            {children ?? null}
        </StyledTab>
    );
};
