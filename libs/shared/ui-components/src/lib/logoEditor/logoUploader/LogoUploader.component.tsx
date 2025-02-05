import { useMediaContext, useSaveLogoImage } from '@breef/shared/hooks';
import { SpinnerIcon } from '@breef/ui-kit';
import { useEffect } from 'react';
import { LogoEditor } from '../LogoEditor';
import { StyledLogoUploader } from './LogoUploader.styled';
import { ObjectImageType } from '@breef/shared/types';

interface LogoUploaderProps {
    className?: string;
    logoUrl?: string;
    onChange?: (logoObj: ObjectImageType) => void;
    isDisabled?: boolean;
    isVisibleLoader?: boolean;
    setIsLoading?: (value: boolean) => void;
}

export const LogoUploader = ({
    logoUrl,
    className,
    onChange,
    isDisabled,
    isVisibleLoader = false,
    setIsLoading,
}: LogoUploaderProps) => {
    const { uploadCroppedImage, objectImage, isLoading } = useSaveLogoImage();

    useEffect(() => {
        setIsLoading?.(isLoading);
    }, [isLoading]);

    useEffect(() => {
        if (objectImage) {
            onChange?.(objectImage[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objectImage]);

    return (
        <StyledLogoUploader className={className}>
            {isLoading && isVisibleLoader && (
                <SpinnerIcon className="loader" data-testid="loader" />
            )}
            <LogoEditor
                tip={''}
                onChange={uploadCroppedImage}
                logoUrl={logoUrl ? logoUrl : undefined}
                isDisabled={isDisabled || isLoading}
                isLoadingSpinner={false}
                emptyButtonText="Upload Logo"
            />
        </StyledLogoUploader>
    );
};
