import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledScheduledCallsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    .list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 0;
        padding: 0;
        list-style-type: none;

        @media (max-width: 768px) {
            gap: 12px;
        }

        > .status {
            ${mixinTypography.label.lS.labelSMedium};
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 15px;
            margin-bottom: 8px;

            svg {
                min-width: 28px;
            }

            & .success {
                margin-left: -6px;
            }
        }
    }
`;

export const StyledItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 95px;
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #d3d3d3;
    position: relative;

    @media (${mediaScreen.tablet}) {
        flex-direction: column;
        align-items: flex-start;
        height: fit-content;
    }

    .company-info {
        flex: 0.7;

        .company-content-wrapper h3 {
            max-width: 340px;

            @media (max-width: 512px) {
                max-width: 200px;
            }
        }

        .company-content-wrapper .group {
            max-width: 340px;
            justify-content: start;
        }

        @media (${mediaScreen.tablet}) {
            flex: 0.6;
        }
    }

    & .group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;

        @media (${mediaScreen.tablet}) {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            padding-left: 70px;
        }
    }

    .company-content-wrapper {
        margin-right: 30px;

        @media (${mediaScreen.tablet}) {
            margin-right: 16px;

            .group {
                display: flex;
                align-items: flex-start;
                padding-left: 0;
            }

            h3 {
                line-height: 20px;
            }

            .link {
                display: none !important;
            }
        }
    }

    .status {
        ${mixinTypography.label.lS.labelSMedium};
        display: flex;
        align-items: center;
        gap: 12px;

        svg {
            min-width: 28px;
        }

        & .success {
            margin-left: -6px;
        }

        @media (${mediaScreen.tablet}) {
            margin-bottom: 15px;
        }
    }

    .buttons {
        display: flex;
        gap: 14px;
        margin-left: 6px;

        @media (${mediaScreen.tablet}) {
            width: 100%;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 20px;
        }

        .action-btn,
        .select-btn,
        .archive-placeholder {
            ${mixinTypography.text.tMd.textMdMedium};
            height: 40px;
            border-radius: 4px;

            @media (${mediaScreen.tablet}) {
                min-width: 100px;
            }

            @media (max-width: 512px) {
                font-size: 12px;
                height: 32px;
            }
        }

        .archive-placeholder {
            display: flex;
            align-items: center;
            color: ${colors.grey.grey400};
        }

        .select-btn {
            border-color: transparent;
        }
    }
`;
