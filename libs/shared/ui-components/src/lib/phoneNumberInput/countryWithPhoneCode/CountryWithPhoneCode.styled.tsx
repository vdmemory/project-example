import styled from '@emotion/styled';

export const StyledCountryWithPhoneCode = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    font-size: 24px;
    pointer-events: none;
    max-width: 100%;
    align-items: center;
    line-height: 23px;
    .country-info {
        margin-right: 15px;
        display: flex;
        width: calc(100% - 80px);
        align-items: center;
        .country-name {
            white-space: pre-wrap;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
        .emoji {
            margin-right: 10px;
        }
    }
`;
