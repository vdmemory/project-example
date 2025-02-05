import { ReactNode } from 'react';
import { StyledScreenWrapper } from './ScreenWrapper.styled';

interface ScreenWrapperProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export const ScreenWrapper = ({
    title,
    description,
    children,
}: ScreenWrapperProps) => {
    return (
        <StyledScreenWrapper
            className="screen-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="header">
                <div className="title">{title}</div>
                {description ? (
                    <div className="description">{description}</div>
                ) : null}
            </div>
            <div className="content">{children}</div>
        </StyledScreenWrapper>
    );
};
