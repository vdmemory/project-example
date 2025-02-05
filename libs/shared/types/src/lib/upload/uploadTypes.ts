// save file to aws server
export type SetFilesRequestType = {
    file: Blob;
    path: string;
};

// create object for upload files to aws server
export type CreateObjectFilesRequestType = {
    name: string;
};

export type CreateObjectFilesResponse = {
    id: number;
    name: string;
    upload_url: string;
    read_url: string;
    thumbnail_url?: string;
};

export type TransformCreateObjectResponse = {
    id: number;
    name: string;
    uploadUrl: string;
    readUrl: string;
    thumbnail?: string;
};
