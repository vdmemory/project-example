import {
    MaskType,
    replaceExtraBreakSpaces,
    stringMask,
} from './stringTransformFunctions';
import { HookFormEventType } from '@breef/shared/types';

export const modifyHandleChangeField = (
    item: {
        mask?: MaskType;
        maxLength?: number;
        removeBreakSpaces?: 'all' | 'partially';
    },
    onChange: (e: unknown) => void,
    cleanFieldError: () => void,
) => {
    if (item.mask)
        return (e: HookFormEventType) => {
            cleanFieldError();
            onChange(stringMask(item.mask || '', e.target.value));
        };
    if (item.maxLength && item.removeBreakSpaces === 'all')
        return (e: HookFormEventType) => {
            cleanFieldError();
            onChange(e.target.value.trim());
        };
    if (item.maxLength && item.removeBreakSpaces === 'partially')
        return (e: HookFormEventType) => {
            cleanFieldError();
            onChange(replaceExtraBreakSpaces(e.target.value));
        };
    return (value: unknown) => {
        cleanFieldError();
        onChange(value);
    };
};
