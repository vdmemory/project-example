import { PlusIcon } from '@breef/shared/assets';
import { AvatarImage, UploadLogoIcon } from '@breef/ui-kit';
import Spinner from '../../spinner/Spinner';

interface ButtonLogoProps {
    onClick: () => void;
    value?: string;
    isLoading: boolean;
    isDisabled: boolean;
    isLoadingSpinner?: boolean;
    emptyButtonText?: string;
}

export const ButtonLogo = ({
    onClick,
    value,
    isLoading,
    isLoadingSpinner = true,
    isDisabled,
    emptyButtonText = 'Upload Here',
}: ButtonLogoProps) => {
    if (isLoading && isLoadingSpinner) return <Spinner />;

    return (
        <button
            type="button"
            className={value ? 'button-image' : 'button-upload'}
            onClick={onClick}
            disabled={isDisabled}
        >
            {!isDisabled && (
                <div className="plus-wrapper">
                    <PlusIcon className="plus-icon" />
                </div>
            )}
            <div className="empty-upload">
                <UploadLogoIcon />
                {emptyButtonText}
            </div>
            {value && (
                <AvatarImage
                    src={value}
                    alt="Logo Icon"
                    width={96}
                    height={96}
                    className="image-cropped"
                />
            )}
        </button>
    );
};

export default ButtonLogo;
