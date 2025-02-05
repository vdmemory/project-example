import { colors, ScrollNavIcon } from '@breef/shared/assets';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export const StyledBackButton = styled.button`
    display: flex;
    align-items: center;
    font-size: 24px;
    border: none;
    background: none;
    text-transform: uppercase;
    gap: 10px;

    :hover {
        cursor: pointer;
        text-decoration: underline;
    }

    .arrow {
        transition: stroke 300ms ease;
        path:first-of-type {
            fill: ${colors.mainBlack};
        }
        path:last-of-type {
            stroke: ${colors.mainBlack};
        }
    }
`;

interface BackButtonProps {
    name?: string;
    iconButton?: ReactNode;
    arrowLeft?: boolean;
    isSubmitting?: boolean;
    onClick?: () => void;
}

export const BackButton = ({
    name,
    iconButton,
    arrowLeft = true,
    isSubmitting = false,
    onClick,
}: BackButtonProps) => {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
        router.back();
    };

    const getIconButton = (classNameBtn: string) =>
        iconButton ? (
            iconButton
        ) : (
            <ScrollNavIcon
                className={classNameBtn ? `${classNameBtn} arrow` : 'arrow'}
            />
        );

    return (
        <StyledBackButton
            data-testid="button-back"
            type="button"
            onClick={handleClick}
            className="btn-back"
        >
            {arrowLeft && !isSubmitting ? getIconButton('arrow-left') : null}
            {name}
        </StyledBackButton>
    );
};

export default BackButton;
