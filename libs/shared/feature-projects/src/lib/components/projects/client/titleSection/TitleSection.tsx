import { mediaScreen } from '@breef/shared/assets/variables';
import { mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

const StyledTitleSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;

    max-width: 1130px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;

    .name {
        ${mixinTypography.display.dXl.displayXlMedium}
        margin: 0;
    }

    .date {
        ${mixinTypography.text.tXl.textXlMedium}
        margin: 0;
    }

    @media (${mediaScreen.tablet}) {
        margin-bottom: 5px;

        .name {
            font-size: 32px;
            line-height: 36px;
        }
        .date {
            font-size: 16px;
            line-height: 18px;
        }
    }
`;

interface TitleSectionProps {
    name: string;
    date?: string;
}

export const TitleSection = ({ name, date }: TitleSectionProps) => {
    return (
        <StyledTitleSection className="title">
            {!!date && <h2 className="date">{date}</h2>}
            <h1 className="name">{`Welcome, ${name}`}</h1>
        </StyledTitleSection>
    );
};
