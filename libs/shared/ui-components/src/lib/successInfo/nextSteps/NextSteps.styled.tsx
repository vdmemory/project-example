import styled from '@emotion/styled';
import { fonts } from '@breef/shared/assets';

export const StyledNextSteps = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 40px 30px 60px 75px;
    .image-wrapper {
        display: flex;
        height: 150px;
        max-width: 250px;

        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
            object-position: left;
        }
    }
    .title {
        font-size: 32px;
        margin-top: 15px;
        text-transform: uppercase;
    }
    .note {
        margin-top: 10px;
        font-size: 18px;
        padding-right: 50px;
        font-family: ${fonts.defaultText};
        line-height: 22.4px;
    }

    @media screen and (max-width: 1024px) {
        padding: 40px 30px 60px;
        .note {
            padding-right: 0;
        }
    }

    @media screen and (max-width: 1024px) {
        padding: 20px 15px 30px;

        .image-wrapper {
            display: flex;
            align-items: center;
            height: 130px;
        }
    }
`;
