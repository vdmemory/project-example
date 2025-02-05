import styled from '@emotion/styled';

export const StyledTip = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 80px 50px 70px;

    .icon-wrapper {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: -5px;
    }

    .label-tip {
        margin-top: 6px;
        font-size: 24px;
        line-height: 28.8px;
        letter-spacing: 0.015em;
    }
    .note-tip {
        margin-top: 6px;
        font-size: 14px;
        line-height: 19.6px;
        letter-spacing: 0.01em;
    }

    @media screen and (max-width: 1024px) {
        padding: 20px;

        .note-tip {
            margin-top: 3px;
        }
    }
`;
