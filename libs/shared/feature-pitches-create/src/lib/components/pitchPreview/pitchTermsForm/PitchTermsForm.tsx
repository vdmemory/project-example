import {
    TERMS_OF_USE_PROJECT,
    TERMS_OF_USE_ROUTE,
} from '@breef/shared/constants';
import { StyledPitchTermsForm } from './PitchTermsForm.styled';
import { useRouteControl } from '@breef/shared/hooks';
import { Checkbox } from '@breef/ui-kit';
import { ChangeEvent } from 'react';

const list = [
    {
        title: 'Accept Terms',
        description:
            'To access the project scope, please review Breef’s Terms below.',
    },
    {
        title: 'Review Scope',
        description:
            'Take a look at the project scope to get a better sense of the project.',
    },
    {
        title: 'Submit Pitch',
        description:
            'Pitch in ~20 mins! Share more about your team, expertise + approach.',
    },
];

type PitchTermsType = {
    onChange: (checked: boolean) => void;
    checked: boolean;
    isSubmitted?: boolean;
};

export const PitchTermsForm = ({
    onChange,
    checked,
    isSubmitted,
}: PitchTermsType) => {
    const { router } = useRouteControl();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        onChange?.(event.target.checked);
    };

    return (
        <StyledPitchTermsForm className="terms">
            <div className="list">
                {list.map((item, index) => (
                    <div className="item">
                        <h3 className="title">
                            {index + 1}.&nbsp;&nbsp;{item.title}
                        </h3>
                        <div className="description">{item.description}</div>
                    </div>
                ))}
            </div>
            <p className="terms">
                <Checkbox
                    type="checkbox"
                    onChange={handleChange}
                    checked={checked}
                    disabled={isSubmitted}
                />
                <span>
                    I accept Breef’s &nbsp;
                    <a
                        href={router.basePath + TERMS_OF_USE_PROJECT}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Terms of Use
                    </a>
                    &nbsp; + &nbsp;
                    <a
                        href={router.basePath + TERMS_OF_USE_ROUTE}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Project Terms
                    </a>
                    .
                </span>
            </p>
        </StyledPitchTermsForm>
    );
};
