import { ACCESS_TOKEN } from '@breef/shared/constants';
import { getCookie } from '../storage-service/cookie';

const token = getCookie(ACCESS_TOKEN) || '';

export const getLinkDownloadContracts = ({
    projectId,
    fileId,
    hostName,
}: {
    projectId: string;
    hostName: string;
    fileId?: string;
}) => {
    return `${hostName}/api/projects/${projectId}/kick-off/contracts?access_token=${token}${
        fileId ? `&file_id=${fileId}` : ''
    }`;
};
