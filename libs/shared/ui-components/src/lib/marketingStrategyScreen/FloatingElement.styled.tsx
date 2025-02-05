import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

interface StyledFloatingElementProps {
    desktop: React.CSSProperties;
    mobile: React.CSSProperties;
}

export const StyledFloatingElement = styled.div<StyledFloatingElementProps>`
    position: absolute;

    top: ${props => props.desktop.top};
    left: ${props => props.desktop.left};
    right: ${props => props.desktop.right};
    bottom: ${props => props.desktop.bottom};
    z-index: ${props => props.desktop.zIndex};
    transform: ${props => props.desktop.transform};

    @media screen and (${mediaScreen.tablet}) {
        top: ${props => props.mobile.top};
        left: ${props => props.mobile.left};
        right: ${props => props.mobile.right};
        bottom: ${props => props.mobile.bottom};
        z-index: ${props => props.mobile.zIndex};
        transform: ${props => props.mobile.transform};
    }
`;
