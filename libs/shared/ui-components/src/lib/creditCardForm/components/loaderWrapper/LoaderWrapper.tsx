import { StyledLoaderWrapper } from './LoaderWrapper.styled';

interface LoaderWrapperProps {
    isLoading: boolean;
    children: React.ReactNode;
}

export const LoaderWrapper = ({ isLoading, children }: LoaderWrapperProps) => {
    return (
        <StyledLoaderWrapper isLoading={isLoading}>
            <div className="preview">{children}</div>
            <div className="loader"></div>
        </StyledLoaderWrapper>
    );
};
