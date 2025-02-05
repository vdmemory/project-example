import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledDocumentPreviewer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: calc(100% / 2 - 25px);
    min-width: calc(100% / 2 - 25px);
    margin-bottom: 15px;
    flex: 1;
    &:nth-of-type(2n) {
        margin-left: 50px;
    }
    .preview-image-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid ${colors.shadowGray};

        //TODO: when preview mode - remove height
        height: 335px;

        .thumbnail {
            height: 260px;
        }

        > svg {
            width: 140px;
            height: auto;
        }

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .document-info-wrapper {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-top: 20px;
        font-weight: 450;
        font-size: 24px;
        line-height: 29px;
        align-items: center;
        letter-spacing: 0.015em;

        a {
            color: ${colors.mainOrange} !important;
            display: flex;
            text-decoration: none;
            word-break: break-word;
            :hover {
                text-decoration: underline;
            }
        }
        > span {
            display: flex;
        }

        svg {
            path:nth-of-type(1) {
                fill: ${colors.mainOrange};
            }

            path:nth-of-type(2) {
                stroke: ${colors.mainOrange};
            }

            path:nth-of-type(3) {
                stroke: ${colors.mainOrange};
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        max-width: 100%;
        min-width: 100%;
        .preview-image-wrapper {
            > svg {
                width: 100px;
                height: auto;
            }
        }
        .document-info-wrapper {
            font-size: 22px;
            line-height: 120%;
        }

        & + .document-previewer {
            margin-left: 0;
            margin-top: 20px;
        }
    }
`;
