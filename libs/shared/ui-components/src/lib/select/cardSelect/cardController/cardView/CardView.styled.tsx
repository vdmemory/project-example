import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';

export const StyledCardView = styled.div`
    position: relative;
    background: transparent;
    padding: 28px 41px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 120px;

    .group {
        display: flex;
        align-items: flex-end;

        .name,
        .estimate,
        .fee {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
    }

    &:hover {
        background: ${colors.mainWhite};
        cursor: pointer;
        & > .edit-label {
            opacity: 1;
            transition: opacity 0.5s;
        }
    }
    .card {
        &-label {
            display: flex;
            align-items: center;
            font-family: SuisseIntlMono;
            font-weight: 400;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
            color: ${colors.mainBlack};
            margin-bottom: 18px;
            &--item {
                opacity: 0.3;
                text-transform: uppercase;
                margin-right: 6px;
            }
        }
        &-description {
            font-weight: 450;
            font-size: 1.5rem;
            line-height: 1.7rem;
            letter-spacing: 0.015em;
            word-break: break-word;
            color: ${colors.mainBlack};
            white-space: break-spaces;
        }
    }
    > .edit-label {
        opacity: 0;
        position: absolute;
        right: 30px;
        top: 26px;
        transition: opacity 0.3s;
        font-family: ${fonts.accent};
        font-size: 12px;
        line-height: 14px;
        color: ${colors.mainOrange};
        text-decoration: underline;
        letter-spacing: 0.015em;
        text-transform: uppercase;
    }

    @media (${mediaScreen.tablet}) {
        padding: 27px 21px 17px 21px;
    }
`;
