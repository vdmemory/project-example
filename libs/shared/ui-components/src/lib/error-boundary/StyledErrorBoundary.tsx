import styled from '@emotion/styled';
import { fonts } from '@breef/shared/assets';

export const StyledErrorBoundary = styled.div`
    display: flex;
    width: 100%;
    flex: 1;

    .error {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        align-items: center;

        h1 {
            margin-top: 23px;
            font-size: 12px;
            line-height: 16px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-family: ${fonts.accent};
            font-weight: 400;
            white-space: pre-wrap;
            text-align: center;
        }
        img {
            margin-left: 20px;
            width: 200px;
            height: auto;
        }
    }

    @keyframes type {
        from {
            box-shadow: inset -3px 0px 0px #888;
        }
        to {
            box-shadow: inset -3px 0px 0px transparent;
        }
    }
`;
