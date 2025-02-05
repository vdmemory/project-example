import { simpleAnimation } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const loaderStyles = {
    display: 'flex',
    height: '100px',
    marginBottom: '30px',
};

export const StyledCreditCardForm = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    align-items: center;
    ${simpleAnimation};

    .section {
        margin-bottom: 20px;
        flex: 0;
    }

    .text-block {
        width: 100%;

        &.edit {
            display: none;
        }
    }

    .card-number {
        margin-bottom: -1px;
        .wrapper {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;

            @media (${mediaScreen.mobile}) {
                border-radius: 4px;
            }
        }
    }

    .card-expiration {
        margin-right: -1px;

        @media (${mediaScreen.mobile}) {
            margin-right: 0;
        }

        .wrapper {
            border-bottom-left-radius: 4px;

            @media (${mediaScreen.mobile}) {
                border-radius: 4px;
            }
        }
    }

    .card-cvc .wrapper {
        border-bottom-right-radius: 4px;

        @media (${mediaScreen.mobile}) {
            border-radius: 4px;
        }
    }

    button.submit {
        width: 100%;
        border-radius: 4px;
        margin-top: 40px;

        @media (${mediaScreen.tablet}) {
            text-transform: capitalize;
            font-size: 24px;
        }

        @media (${mediaScreen.maxMobile}) {
            height: 52px;
            min-height: 52px;
            ${mixinTypography.mobile.text.mobileTextMd}
        }
    }
`;

export const StyledRow = styled.div`
    display: flex;

    @media (${mediaScreen.mobile}) {
        gap: 18px;
    }

    .row-group
`;
