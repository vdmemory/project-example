import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledProfile = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const StyledProfileContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    background-color: ${colors.mainPurple};
    padding-top: 70px;
    padding-bottom: 70px;
    overflow: hidden;
    position: relative;

    .form-card .content-section {
        gap: 12px;
    }

    @media (${mediaScreen.tablet}) {
        padding-top: 40px;
        > section {
            width: 100%;
        }
    }

    .member-list {
        margin: auto;
        position: relative;
    }

    .accordion {
        .accordion-inner-section {
            overflow: hidden;
        }
        .accordion-inner-section.accordion-inner-section-open {
            overflow: visible;
            animation-duration: 1s;
            animation-name: open;
        }

        @keyframes open {
            from {
                overflow: hidden;
            }

            to {
                overflow: visible;
            }
        }
    }

    .accordion + .accordion {
        margin-top: 25px;
    }
`;

export const StyledReferralsPage = styled.div`
    ul,
    li {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    ul {
        width: 300px;
        display: flex;
        flex-direction: column;
        background: white;
        padding: 20px;
        border-radius: 25px;
    }

    li {
        background-color: rgba(214, 214, 214, 0.5);
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
        overflow: hidden;
        cursor: pointer;
    }

    li:last-child {
        margin-bottom: 0px;
    }

    .avatar {
        width: 40px;
        height: 40px;
        background-color: #666;
        border-radius: 20px;
    }

    .row {
        width: 100%;
        height: 8px;
        background-color: #999;
        border-radius: 10px;
        margin-top: 12px;
    }
`;
