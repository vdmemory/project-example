import { FC, SyntheticEvent } from 'react';
import { StyledHeader } from './Header.styled';
import { PROJECTS_ROUTE } from '@breef/shared/constants';
import { BreefLogo } from '@breef/shared/assets';
import Link from 'next/link';
import { Button } from '@breef/ui-kit';

interface HeaderProps {
    buttonTitle?: string;
    onClick?: () => void;
    isDisabled?: boolean;
    isSubmitting?: boolean;
    hideButton?: boolean;
    onCLickLogo?: () => void;
}
export const Header: FC<HeaderProps> = ({
    buttonTitle,
    onClick,
    isSubmitting,
    isDisabled,
    hideButton,
    onCLickLogo,
}) => {
    const onClickLogoModified = onCLickLogo
        ? (e: SyntheticEvent) => {
              e.preventDefault();
              onCLickLogo();
          }
        : undefined;

    return (
        <StyledHeader className="header-nav">
            <Link
                className="link-logo"
                href={PROJECTS_ROUTE}
                onClick={onClickLogoModified}
                shallow={true}
            >
                <BreefLogo />
            </Link>
            {!hideButton && (
                <Button
                    label={buttonTitle}
                    onClick={onClick}
                    variant="outlined"
                    isSubmitted={isSubmitting}
                    isDisabled={isDisabled}
                    isUppercase
                />
            )}
        </StyledHeader>
    );
};
