import { mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledTipBothParts = styled.div`
    position: relative;
    width: 260px;
    height: 115px;

    .tip {
        position: absolute;
        right: 0;
    }
    .drawn-arrow {
        position: absolute;
        left: 0;
        top: 75px;
    }

    @media screen and (${mediaScreen.tablet}) {
        width: auto;
        height: 140px;

        .tip {
            top: 85px;
            left: 50%;
            transform: translateX(-50%);
        }

        .drawn-arrow {
            top: 30px;
            left: 50%;
            transform: translateX(-50%) rotate(115deg);
        }
    }
`;
