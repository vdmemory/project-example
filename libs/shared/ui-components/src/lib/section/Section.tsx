import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

interface StyledSectionProps {
    mb: string;
}

export const StyledSection = styled.div<StyledSectionProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: ${({ mb }) => mb + 'px'};

    .content-section {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .label-section {
        ${mixinTypography.label.lS.labelSMedium};
        color: ${colors.grey.grey600};
        margin-bottom: 16px;

        @media (${mediaScreen.maxMobile}) {
            ${mixinTypography.mobile.label.mobileLabelSm};
        }
    }
`;

interface SectionProps {
    children: React.ReactNode;
    label?: string;
    className?: string;
    mb?: string;
}

const DEFAULT_MARGIN_BOTTOM = '24';

export const Section = ({
    children,
    label,
    className,
    mb = DEFAULT_MARGIN_BOTTOM,
}: SectionProps) => (
    <StyledSection
        data-testid={'section'}
        mb={mb}
        className={`section ${className ?? ''}`}
    >
        {!!label && <div className="label-section">{label}</div>}
        <div className="content-section">{children}</div>
    </StyledSection>
);
