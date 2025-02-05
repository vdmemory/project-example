import { PageLoader } from '@breef/shared/ui-components';
import { StyledIntermediateView } from './IntermediateView.styled';
import { FC } from 'react';

interface IntermediateViewProps {
    errorMessage: string;
    allowRedirect: string;
}

export const IntermediateView: FC<IntermediateViewProps> = props => (
    <StyledIntermediateView>
        <PageLoader {...props} />
    </StyledIntermediateView>
);
