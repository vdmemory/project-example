import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { BackgroundCompanyLogo, colors } from '@breef/shared/assets';

interface StyledLogoProps {
    isLogo: boolean;
}

const checkIsLogo = ({ isLogo }: StyledLogoProps) => {
    if (!isLogo) {
        return css`
            background-color: ${colors.mainPurple};
            background-image: url(${BackgroundCompanyLogo.src});
        `;
    }
    return null;
};

export const StyledLogo = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: relative;
    background-color: white;
    border: 1px solid #e5ddf0;
    overflow: hidden;

    ${checkIsLogo}
    > img {
        object-fit: cover;
        width: inherit;
        height: inherit;
    }
`;
