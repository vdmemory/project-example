import { StyledImpersonateTip } from './ImpersonateTip.styled';
import { FC } from 'react';
import { API_URL } from '@breef/shared/constants';
import { resetAuth } from '@breef/shared/utils';

interface ImpersonateTipProps {
    email: string;
}
const ImpersonateTip: FC<ImpersonateTipProps> = ({ email }) => {
    const onStop = () => {
        resetAuth();
        window.location.replace(API_URL + '/admin');
    };

    return (
        <StyledImpersonateTip>
            <span>You are impersonating as a user {email}</span>
            <button onClick={onStop}>Stop Impersonate</button>
        </StyledImpersonateTip>
    );
};

export default ImpersonateTip;
