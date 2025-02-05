import * as yup from 'yup';
import { getMaxItemsMessage, getMinItemsMessage } from '@breef/shared/utils';

export const industriesTagsSchema = yup.object({
    industries: yup.array(),
    tags: yup
        .array()
        .min(1, getMinItemsMessage('Tags', 1))
        .max(10, getMaxItemsMessage('Tags', 10)),
});
