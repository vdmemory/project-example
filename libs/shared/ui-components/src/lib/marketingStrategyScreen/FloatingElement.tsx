import { StyledFloatingElement } from './FloatingElement.styled';

interface FloatingElementProps {
    children: React.ReactNode;
    desktopStyle?: React.CSSProperties;
    mobileStyle?: React.CSSProperties;
}

export const FloatingElement = ({
    children,
    desktopStyle = {},
    mobileStyle = {},
}: FloatingElementProps) => {
    return (
        <StyledFloatingElement desktop={desktopStyle} mobile={mobileStyle}>
            {children}
        </StyledFloatingElement>
    );
};

export default FloatingElement;
