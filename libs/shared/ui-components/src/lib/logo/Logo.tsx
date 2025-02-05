import { AvatarImage } from '@breef/ui-kit';
import { StyledLogo } from './Logo.styled';

/* eslint-disable-next-line */
export interface LogoProps {
    logo?: string;
}

export function Logo({ logo }: LogoProps) {
    return (
        <StyledLogo isLogo={!!logo}>
            {logo && (
                <AvatarImage
                    className="logo"
                    src={logo}
                    alt="Logo"
                    width={100}
                    height={100}
                />
            )}
        </StyledLogo>
    );
}

export default Logo;
