import { PageLoader } from '../page-loader/PageLoader';
import { StyledBlurPageLoader } from './BlurPageLoader.styled';

interface BlurPageLoaderProps {
    errorMessage?: string;
    allowRedirect?: string;
    delay?: number;
    isPageFooter?: boolean;
}

export const BlurPageLoader = ({
    isPageFooter = true,
    ...props
}: BlurPageLoaderProps) => {
    return (
        <StyledBlurPageLoader isPageFooter={isPageFooter}>
            <PageLoader {...props} />
        </StyledBlurPageLoader>
    );
};

export default BlurPageLoader;
