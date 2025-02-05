import { colors, PickDateText, starsImage } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const StyledPlaceholder = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    gap: 5px;
    position: relative;

    .image {
        width: 100%;
        max-width: 150px;
    }

    .title {
        font-size: 32px;
        line-height: 35px;
        font-weight: 400;
        color: ${colors.black};
        text-transform: uppercase;
        white-space: pre-wrap;
        margin: 0;
        text-align: center;
    }

    svg {
        position: absolute;
        left: 46px;
        margin: auto;
    }
`;

interface PlaceholderProps {
    title: string;
}

export const Placeholder = ({ title }: PlaceholderProps) => {
    return (
        <StyledPlaceholder
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="placeholder"
        >
            <img src={starsImage.src} alt="Stars" className="image" />
            <h2 className="title">{title}</h2>
            <PickDateText className="arrow-pick" />
        </StyledPlaceholder>
    );
};
