import { StyledGetStartedWrapper } from './GetStartedWrapper.styled';
import { Tip } from './tip/Tip';

type TipType = {
    icon: JSX.Element;
    label: string;
    note: string;
};

interface GetStartedWrapperProps {
    configTips: TipType[];
    isNumbering?: boolean;
}

export function GetStartedWrapper({
    configTips,
    isNumbering = false,
}: GetStartedWrapperProps) {
    return (
        <StyledGetStartedWrapper>
            {configTips.map((data, key) => (
                <Tip
                    key={key}
                    icon={data.icon}
                    label={`${isNumbering ? key + 1 + '. ' : ''}${data.label}`}
                    note={data.note}
                />
            ))}
        </StyledGetStartedWrapper>
    );
}

export default GetStartedWrapper;
