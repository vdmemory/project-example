import { IconDoc } from '@breef/shared/assets';
import { useGetLoadingImage } from '@breef/shared/hooks';
import { useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import { StyledPreviewImage } from './PreviewImage.styled';

export const PreviewImage = ({ link }: { link: string }) => {
    const { loading, image, getImage } = useGetLoadingImage();

    useEffect(() => {
        if (!link) return;
        getImage(link);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);

    const renderContent = () => {
        if (loading) return <Spinner />;
        if (image) return <img src={image} alt="document" />;
        return <IconDoc className="stub-icon" />;
    };

    return (
        <StyledPreviewImage className="thumbnail">
            {renderContent()}
        </StyledPreviewImage>
    );
};

export default PreviewImage;
