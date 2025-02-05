import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledSkills = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 150px 30px 80px;
    border-top: 1px solid ${colors.mainBlack};
    .title-section {
        display: flex;
        text-transform: uppercase;
        font-size: 32px;
        padding-bottom: 20px;
    }

    @media screen and (max-width: 1200px) {
        padding-right: 80px;
    }

    @media screen and (${mediaScreen.tablet}) {
        padding: 20px 0 20px 0;
        overflow-x: auto;

        .title-section {
            padding: 0 10px 20px;
            font-size: 24px;
            line-height: 22px;
            letter-spacing: 0.015em;
        }
    }
`;
