import { breefText } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledWelcomeScreen = styled.div`
    text-align: center;
    white-space: pre-wrap;

    @media screen and (${mediaScreen.tablet}) {
        white-space: normal;
    }

    h2.title {
        text-transform: uppercase;
        font-size: 75px;

        @media screen and (${mediaScreen.tablet}) {
            font-size: 50px;
            line-height: 1;
        }
    }
    h2.description {
        margin-top: 10px;
        font-size: 28px;

        @media screen and (${mediaScreen.tablet}) {
            font-size: 18px;
            width: 300px;
            margin: 20px auto 0;
        }
    }
    .title-row {
        display: flex;
        justify-content: center;
    }

    .relative-text {
        position: relative;
        width: 380px;
        display: block;
        height: 85px;

        @media screen and (${mediaScreen.tablet}) {
            width: 258px;
            height: 34px;
        }

        img {
            position: absolute;
            top: -48px;
            left: -23px;
            width: 430px;

            @media screen and (${mediaScreen.tablet}) {
                top: -38px;
                left: 4px;
                width: 258px;
            }
        }
    }
    .mobile {
        display: none;

        @media screen and (${mediaScreen.tablet}) {
            display: block;
        }
    }
    .desktop {
        display: block;

        @media screen and (${mediaScreen.tablet}) {
            display: none;
        }
    }
`;

interface WelcomeScreenProps {
    description: string;
}

export const WelcomeScreen = ({ description }: WelcomeScreenProps) => {
    return (
        <StyledWelcomeScreen>
            <h2 className="title desktop">Welcome to</h2>
            <h2 className="title mobile">Welcome to A New</h2>
            <div className="title-row">
                <h2 className="title desktop">A New</h2>
                <span className="relative-text">
                    <img src={breefText.src} alt="Breef Text" />
                </span>
            </div>
            <h2 className="title">Experience</h2>
            <h2 className="description">{description}</h2>{' '}
        </StyledWelcomeScreen>
    );
};

export default WelcomeScreen;
