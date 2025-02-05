import {
    CreateObjectFilesRequestType,
    CreateObjectFilesResponse,
    TransformCreateObjectResponse,
} from '@breef/shared/types';

export function prepareCreateObjectData(values: CreateObjectFilesRequestType) {
    return [
        {
            name: values.name,
        },
    ];
}

export function transformCreateObjectFilesData(
    values: CreateObjectFilesResponse[],
): TransformCreateObjectResponse {
    return {
        id: values[0].id,
        name: values[0].name,
        uploadUrl: values[0].upload_url,
        readUrl: values[0].read_url,
        thumbnail: values[0].thumbnail_url,
    };
}
