import { DelayPageLoader } from '../delay-page-loader/DelayPageLoader';
import { PageLoader } from '../page-loader/PageLoader';

export function LoaderWrapper({
    isDashboard = false,
    hideLoader,
    isLoading = false,
    isEmpty = false,
    errorMessage,
}: {
    isDashboard?: boolean;
    hideLoader?: (hide: boolean) => void;
    isLoading?: boolean;
    isEmpty?: boolean;
    errorMessage?: string;
}) {
    if (isDashboard) {
        return (
            <DelayPageLoader
                isEmpty={isEmpty}
                isDashboard
                userType="agency"
                hideLoader={hideLoader}
                errorMessage={errorMessage}
            />
        );
    }
    return (
        <PageLoader
            isEmpty={isEmpty}
            isLoading={isLoading}
            setIsShowLoader={hideLoader}
            errorMessage={errorMessage}
        />
    );
}
