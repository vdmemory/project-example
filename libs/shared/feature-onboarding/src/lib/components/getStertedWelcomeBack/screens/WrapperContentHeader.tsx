import { colors, fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledWrapContentHead = styled.div`
    text-align: center;
    white-space: pre-wrap;

    .wrap-title {
        text-transform: uppercase;
        font-size: 48px;

        @media screen and (${mediaScreen.tablet}) {
            font-size: 32px;
        }
    }
    .wrap-description {
        margin-top: 20px;
        text-transform: uppercase;
        font-size: 12px;
        font-family: ${fonts.accent};
        color: ${colors.blackGrey};

        @media screen and (${mediaScreen.tablet}) {
            width: 188px;
            margin: 20px auto 0;
        }
    }
`;

interface WrapContentHeadProps {
    children: React.ReactNode;
    title: string;
    description?: string;
}

export const WrapContentHead = ({
    children,
    title,
    description,
}: WrapContentHeadProps) => {
    return (
        <StyledWrapContentHead>
            <h2 className="wrap-title">{title}</h2>
            {description && <h2 className="wrap-description">{description}</h2>}
            {children}
        </StyledWrapContentHead>
    );
};

export default WrapContentHead;
