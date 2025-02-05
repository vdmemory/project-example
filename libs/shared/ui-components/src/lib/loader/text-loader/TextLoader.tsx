import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export const StyledTextLoader = styled.div`
    position: relative;
    margin-right: 23px;
    padding-left: 23px;

    .dots {
        position: absolute;
        left: 100%;
        z-index: 1;
    }
`;

interface TextLoaderProps {
    loadingText?: string;
}

export const TextLoader = ({ loadingText = 'Loading' }: TextLoaderProps) => {
    const [dots, setDots] = useState('.');

    useEffect(() => {
        const timeoutDots = setTimeout(() => {
            if (dots.length < 3) {
                setDots(dots + '.');
            } else {
                setDots('');
            }
        }, 500);

        return () => clearTimeout(timeoutDots);
    }, [dots]);
    return (
        <StyledTextLoader>
            {loadingText}
            <span className="dots">{dots}</span>
        </StyledTextLoader>
    );
};

export default TextLoader;
