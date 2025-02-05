import { GetIsSharingType, SharingResponseType } from '@breef/shared/types';

export function isSharingAdapter(
    values: SharingResponseType,
): GetIsSharingType {
    return {
        id: values.id,
        isSharing: values.is_shared,
        token: values.token,
    };
}
