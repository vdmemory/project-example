import { fonts } from '@breef/shared/assets';
import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

export const TitleSection = ({
    title,
    date,
}: {
    title: string;
    date?: ReactNode;
}) => {
    return (
        <StyledTitleSection className="title-section">
            <div className="title">{title}</div>
            {date ? <div className="date">&nbsp;-&nbsp;{date}</div> : null}
        </StyledTitleSection>
    );
};

const StyledTitleSection = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 58px;
    border-bottom: 1px solid ${colors.black};
    font-family: ${fonts.accent};
    text-transform: uppercase;

    .title {
        font-size: 12px;
        line-height: 16px;
        color: ${colors.black};
        padding-left: 75px;
    }

    .date {
        font-size: 12px;
        line-height: 16px;
        color: ${colors.black};
    }
`;
