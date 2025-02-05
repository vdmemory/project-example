import { Button } from '@breef/ui-kit';
import { FC, ReactNode } from 'react';
import { StyledAuthSection } from './AuthSection.styled';

interface authSectionProps {
    title: string;
    note?: string;
    children: ReactNode;
    buttonTitle: string;
    underFormComponent?: ReactNode;
    termsNode?: ReactNode;
    formMaxWidth?: number;
    isSubmitting: boolean;
}
export const AuthSection: FC<authSectionProps> = ({
    children,
    title,
    note,
    buttonTitle,
    underFormComponent,
    termsNode,
    formMaxWidth = 480,
    isSubmitting,
}) => {
    return (
        <StyledAuthSection
            formMaxWidth={formMaxWidth}
            duration={0.25}
            isTermsNode={!!termsNode}
        >
            <h1>{title}</h1>
            {note && <p className="note">{note}</p>}
            <div className="form-block">
                <div className="fields-wrapper">{children}</div>
                <Button
                    className="auth-section-button"
                    label={buttonTitle}
                    size="small"
                    type="submit"
                    isSubmitted={isSubmitting}
                    isUppercase
                />
                {termsNode}
            </div>
            {!!underFormComponent && (
                <div className="under-form-section">{underFormComponent}</div>
            )}
        </StyledAuthSection>
    );
};
