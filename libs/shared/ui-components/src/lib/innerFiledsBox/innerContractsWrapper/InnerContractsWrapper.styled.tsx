import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledInnerContractsWrapper = styled.div`
    display: flex;
    gap: 1px;
    background-color: ${colors.mainBlack};

    .inner-dropzone-wrapper {
        display: flex;
        padding-top: 30px;
        padding-bottom: 30px;
        justify-content: space-between;
        flex: 1;

        .dropzone-wrapper {
            max-width: 350px;
            width: 100%;

            .dropzone {
                padding-top: 40px;
                padding-bottom: 40px;
            }

            .tip-drop {
                padding-right: 30px;
            }
        }
        .both-parts-tip-wrapper {
            margin-right: 50px;
            margin-top: 20px;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        flex-direction: column;

        .inner-dropzone-wrapper {
            flex-direction: column;
            align-items: center;

            .both-parts-tip-wrapper {
                margin-right: 0;
                margin-top: 15px;
            }
        }
    }
`;
