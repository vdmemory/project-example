import styled from '@emotion/styled';

export const StyledMoreAuthOptions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .more-btn-wrapper {
        display: flex;
        white-space: nowrap;
        align-items: center;
        font-size: 14px;
        font-weight: 450;
        line-height: 16.02px;
        letter-spacing: 0;
        text-align: center;
        color: #d96e34;
        cursor: pointer;
        user-select: none;
        margin-top: 8px;
    }

    .children-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 12px 0 12px;
        box-sizing: content-box;
        overflow: hidden;

        .separator {
            margin-bottom: 24px;
        }
    }
`;
