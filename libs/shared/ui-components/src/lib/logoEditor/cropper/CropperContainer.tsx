import { useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { Button } from '../../button/Button';
import Runner from '../../runner/Runner';
import { StyledCropperContainer } from './CropperContainer.styled';
import { Popup } from '../../popup/Popup';
import { useMediaContext } from '@breef/shared/hooks';

interface CropperContainerProps {
    close: () => void;
    imageSrc: string | null;
    onCropComplete: (croppedAreaPixels: Area) => void;
    showCroppedImage: () => void;
}

export const CropperContainer = ({
    close,
    imageSrc,
    onCropComplete,
    showCroppedImage,
}: CropperContainerProps) => {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const { isMobile } = useMediaContext();
    const popupStylePreset = {
        overflow: 'hidden',
        minWidth: isMobile ? '100%' : '37rem',
    };

    return (
        <Popup style={popupStylePreset} close={close} isLightCross>
            <StyledCropperContainer>
                <Cropper
                    image={imageSrc as unknown as string}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onCropComplete={(_: Area, croppedAreaPixels: Area) =>
                        onCropComplete(croppedAreaPixels)
                    }
                    onZoomChange={setZoom}
                />
                <div className="controls">
                    <span>-</span>
                    <Runner
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        ariaLabelledByForHandle="zoom-handle"
                        onChange={value => setZoom(value as number)}
                    />
                    <span>+</span>
                    <Button
                        type="button"
                        title="save"
                        className="normal"
                        onClick={e => showCroppedImage()}
                    />
                </div>
            </StyledCropperContainer>
        </Popup>
    );
};

export default CropperContainer;
