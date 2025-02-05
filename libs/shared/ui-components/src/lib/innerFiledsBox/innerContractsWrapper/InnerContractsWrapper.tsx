import React from 'react';
import { StyledInnerContractsWrapper } from './InnerContractsWrapper.styled';
import InnerFieldWrapper from '../innerFieldWrapper/InnerFieldWrapper';
import FileComponent from './fileComponent/FileComponent';
import DropzoneOld from '../../dropzone/DropzoneOld';
import TipBothParts from './tipBothParts/TipBothParts';
import { useDocumentController, useSaveDocument } from '@breef/shared/hooks';

import { ChangeHandler } from 'react-hook-form';
import { ListType } from '@breef/shared/types';

interface InnerContractsWrapperProps {
    labelMain: string;
    labelAdditional: string;
    value: {
        id?: number | string | null;
        title: string;
        link: string;
        type?: string;
        loading?: boolean;
    }[];
    onChange: (e: React.SyntheticEvent) => void;
    maxCount?: number;
    isDisableFileLinks?: boolean;
}

export const InnerContractsWrapper = ({
    labelMain,
    labelAdditional,
    value,
    onChange,
    maxCount = 2,
    isDisableFileLinks = false,
}: InnerContractsWrapperProps) => {
    const isDisableMouseActions = value.some(item => item.loading);
    const { saveDocument, handleDeleteLink } = useDocumentController({
        documentsValue: value as ListType[],
        onChange: onChange as ChangeHandler,
    });
    const { uploadDocument } = useSaveDocument({
        saveDocument,
        deleteDocument: handleDeleteLink,
    });

    const addFiles = (files: File[], currentFileId?: number) => {
        const fileLink = files.map(file => ({
            id: +new Date(),
            title: file.name,
            link: URL.createObjectURL(file),
            type: 'file',
            loading: true,
        }));
        saveDocument(fileLink, currentFileId);
        uploadDocument(files[0], currentFileId, fileLink[0].id);
    };

    const renderInnerDropzone = () => (
        <div className="inner-dropzone-wrapper">
            <DropzoneOld
                data-testid="dropzone"
                tip="*Max file size 10MB. PDF only."
                placeholder="Upload or Drag and Drop"
                onChange={addFiles}
                acceptFileTypes="only-pdf"
                disabled={isDisableMouseActions}
            />
            {!value.length && renderBothPartiesTip()}
        </div>
    );
    const renderBothPartiesTip = () => (
        <div className="both-parts-tip-wrapper">
            <TipBothParts />
        </div>
    );

    return (
        <StyledInnerContractsWrapper>
            {value.map((item, key) => (
                <InnerFieldWrapper
                    key={key}
                    labelText={
                        key === 0 ? labelMain : `${labelAdditional} (optional)`
                    }
                    isDisableLabelClick
                >
                    <div className="inner-dropzone-wrapper">
                        <FileComponent
                            isLoading={item.loading}
                            link={!isDisableFileLinks ? item.link : undefined}
                            name={item.title}
                            isDisableRemove={isDisableMouseActions}
                            onRemove={() => handleDeleteLink(Number(item.id))}
                        />
                        {maxCount === 1 && renderBothPartiesTip()}
                    </div>
                </InnerFieldWrapper>
            ))}
            {value.length < maxCount && (
                <InnerFieldWrapper
                    labelText={
                        value.length === 0
                            ? labelMain
                            : `${labelAdditional} (optional)`
                    }
                    isDisableLabelClick
                >
                    {renderInnerDropzone()}
                </InnerFieldWrapper>
            )}
        </StyledInnerContractsWrapper>
    );
};

export default InnerContractsWrapper;
