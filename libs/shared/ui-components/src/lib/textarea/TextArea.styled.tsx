import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledTextArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    font-family: 'NeueHaasDisplay', sans-serif;
    font-size: 12px;

    label {
        text-transform: uppercase;
        color: ${colors.mainPlaceholder};
        margin-bottom: 10px;
        font-family: 'SuisseIntlMono', serif;
    }
    textarea {
        overflow: auto;
        resize: none;
        font-size: 24px;
        border: none;
        letter-spacing: 0.002em;
        padding: 0 0 12px 0;
        margin-top: 10px;
        height: 100%;
        max-height: 100%;
        @media (${mediaScreen.tablet}) {
            font-size: 22px;
        }
        :focus-visible {
            outline: none;
        }
        ::placeholder {
            color: ${colors.mainPlaceholder};
        }
    }
    .count {
        height: 60px;
        display: flex;
        margin-top: auto;
        align-items: center;
        justify-content: flex-end;
        padding: 10px 25px 10px 0;
        font-size: 14px;
        color: ${colors.mainPlaceholder};
        position: -webkit-sticky;
        position: sticky;
        bottom: 80px;
    }
`;
