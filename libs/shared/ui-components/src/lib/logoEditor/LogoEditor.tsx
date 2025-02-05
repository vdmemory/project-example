import { useCallback, useEffect, useRef, useState } from 'react';
import { StyledLogoEditor } from './LogoEditor.styled';
import { Area } from 'react-easy-crop';
import { getCroppedImg } from './canvasUtils';
import { useFileProcessing } from './hooks/useFileProcessing';
import ButtonLogo from './buttonLogo/ButtonLogo';
import CropperContainer from './cropper/CropperContainer';
import { CautionIcon } from '@breef/shared/assets';
import { usePopup } from '../popup/usePopup';

interface LogoEditorProps {
    onChange: (croppedImage: Blob) => void;
    logoUrl?: string;
    tip?: string;
    isDisabled?: boolean;
    isLoadingSpinner?: boolean;
    emptyButtonText?: string;
}

export const LogoEditor = ({
    onChange,
    logoUrl,
    tip = 'png, jpeg < 10mb',
    isDisabled = false,
    isLoadingSpinner = true,
    emptyButtonText,
}: LogoEditorProps) => {
    const { imageSrc, error, processingFile } = useFileProcessing();
    const refInput = useRef<HTMLInputElement | null>(null);
    const cropperPopup = usePopup();
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null,
    );
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleShowFiles = () => {
        const inputEl = refInput.current;
        if (inputEl) {
            inputEl.click();
        }
    };

    const onCropComplete = useCallback((croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    useEffect(() => {
        if (imageSrc) cropperPopup.open();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageSrc]);

    const handleShowCropper = async (fileList: FileList | null) => {
        processingFile(fileList);
    };

    const showCroppedImage = useCallback(async () => {
        if (imageSrc && croppedAreaPixels) {
            setIsLoading(true);
            try {
                const croppedImage = await getCroppedImg(
                    imageSrc,
                    croppedAreaPixels,
                );
                cropperPopup.close();
                if (croppedImage) {
                    onChange(croppedImage.file);
                    setCroppedImage(croppedImage.url);
                    setIsLoading(false);
                }
            } catch (e) {
                setIsLoading(false);
                console.error(e);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageSrc, croppedAreaPixels]);

    return (
        <StyledLogoEditor
            data-testid="logo-editor"
            className="logo-editor"
            isDisabled={isDisabled}
        >
            <ButtonLogo
                data-testid="button-logo"
                isLoading={isLoading}
                isLoadingSpinner={isLoadingSpinner}
                isDisabled={isDisabled}
                onClick={handleShowFiles}
                value={(croppedImage as unknown as string) || logoUrl}
                emptyButtonText={emptyButtonText}
            />
            {tip && !error && <p className="tip-upload">{tip}</p>}
            {error && (
                <p className="error-upload">
                    <CautionIcon />
                    {error}
                </p>
            )}
            <input
                className="input-file-upload"
                data-testid="input-file-upload"
                ref={refInput}
                type="file"
                id="imageFile"
                onChange={e => handleShowCropper(e.target.files)}
                accept=".png, .jpg, .jpeg"
                style={{ display: 'none' }}
            />
            {cropperPopup.isOpen && (
                <CropperContainer
                    close={cropperPopup.close}
                    imageSrc={imageSrc}
                    onCropComplete={onCropComplete}
                    showCroppedImage={showCroppedImage}
                />
            )}
        </StyledLogoEditor>
    );
};

export default LogoEditor;
