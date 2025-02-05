import { StyledPlaceholder } from './Placeholder.styled';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Notification, DefaultCardIcon } from '@breef/ui-kit';
import LinkButton from '../../button/linkButton/LinkButton';
import { useEffect, useState } from 'react';

interface PlaceholderProps {
    onClick: () => void;
    isError: boolean;
    setIsError: (value: boolean) => void;
}

export const Placeholder = ({
    onClick,
    isError,
    setIsError,
}: PlaceholderProps) => {
    const note = (
        <p>
            Note that credit card payments incur a <b>3%</b> fee
        </p>
    );

    useEffect(() => {
        return () => setIsError(false);
        //eslint-disable-next-line
    }, []);

    return (
        <StyledPlaceholder isError={isError}>
            <Notification sentiment="informative" text={note} size="small" />
            <div className="placeholder">
                <div className="placeholder-icon">
                    <DefaultCardIcon />
                </div>
                <div className="placeholder-title">no cards added yet</div>
            </div>
            <LinkButton
                name="ADD NEW CARD"
                className="button-add"
                onClick={onClick}
                icon="plus"
            />
        </StyledPlaceholder>
    );
};

export default Placeholder;
