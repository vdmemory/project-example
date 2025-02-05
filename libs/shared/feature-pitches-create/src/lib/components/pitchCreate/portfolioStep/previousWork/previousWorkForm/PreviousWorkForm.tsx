import { PreviousWorkType } from '@breef/shared/types';
import {
    Button,
    CloseIcon,
    colors,
    Input,
    InputOld,
    Label,
    LabelOld,
    LinkUi,
    mixinTypography,
    Textarea,
    TextareaOld,
} from '@breef/ui-kit';
import styled from '@emotion/styled';
import { usePrevWorkFormControl } from './usePrevWorkFormControl';
import {
    Dropzone,
    EditableLink,
    EditableLinkOld,
    File,
} from '@breef/shared/ui-components';
import {
    FieldArrayWithId,
    UseFieldArrayRemove,
    UseFieldArrayUpdate,
} from 'react-hook-form';
import { useState } from 'react';
import { mediaScreen } from '@breef/shared/assets/variables';
import { DEFAULT_UPLOAD_TEXT_SIZE } from '@breef/shared/constants';

export const StyledPreviousWorkForm = styled.div`
    .form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
            letter-spacing: 0em;
            margin: 0;
            text-transform: uppercase;
        }
        .close-wrapper {
            display: flex;
            width: 30px;
            height: 28px;
            border: 1px solid ${colors.grey.grey900};
            background-color: ${colors.white};
            position: relative;

            :hover {
                opacity: 0.6;
            }

            .close-button {
                cursor: pointer;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 38px;
                height: 38px;
            }
        }
    }
    .divider {
        width: 100%;
        border-bottom: 1px solid ${colors.grey.grey900};
        margin: 12px 0 40px;

        @media screen and (${mediaScreen.maxMobile}) {
            margin-bottom: 20px;
        }
    }
    .form-body {
        display: flex;
        flex-direction: column;
        gap: 26px;

        .form-label .label-text,
        .form-label .optional-text {
            ${mixinTypography.label.lMd.labelMdMedium};
            color: ${colors.grey.grey400};
        }

        .form-label {
            width: 100%;

            & > span {
                padding-bottom: 6px;
            }

            & .input-wrapper + span {
                padding-top: 5px;
            }
        }

        input,
        textarea {
            padding-left: 20px;
            padding-right: 20px;
        }

        .files-wrapper {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 16px;

            .trash-btn {
                & > img {
                    min-width: 40px;
                }

                & > span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-wrap: break-word;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;

                    :hover {
                        text-decoration: underline;
                    }
                }

                .trash-btn svg {
                    margin-left: -12px;
                }
            }
        }

        .project-links-wrapper {
            display: flex;
            flex-direction: column;
            gap: 12px;

            margin-top: 8px;

            .editable-link a {
                letter-spacing: 0em;
                margin: 0;
                font-family: 'Helvetica Neue', sans-serif;
                -webkit-text-decoration: none;
                text-decoration: none;
                white-space: nowrap;

                &:hover {
                    text-decoration: underline;
                }
            }

            .editable-link {
                margin-bottom: 10px;
            }

            .editable-link > .input {
                .input-wrapper span {
                    padding-top: 5px;
                }
            }
        }
    }
    .form-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;

        .button-save {
            height: 31px;

            span.label {
                ${mixinTypography.text.tMd.textMdMedium};
            }
        }
    }
    .group {
        display: flex;
        justify-content: space-between;
        gap: 16px;

        @media screen and (${mediaScreen.maxMobile}) {
            flex-direction: column;
            gap: 26px;
        }
    }

    @media screen and (${mediaScreen.maxMobile}) {
        .input-wrapper .input-title {
            max-width: 140px;
        }
        .input-wrapper .input-link {
            max-width: 200px;
        }
    }

    @media screen and (max-width: 512px) {
        .input-wrapper .input-title {
            max-width: 110px;
            padding: 12px;
        }

        .input-wrapper .input-link {
            max-width: 170px;
            padding: 12px;
        }

        .dropzone-wrapper {
            max-width: 100%;

            .dropzone {
                border-radius: 4px;
            }
        }

        .form-footer .button-save {
            height: 50px;
            width: 100%;
            margin-top: 20px;
            border-radius: 4px;
        }
    }

    @media screen and (max-width: 411px) {
        .input-wrapper .input-title {
            max-width: 100px;
        }

        .input-wrapper .input-link {
            max-width: 150px;
        }
    }
`;

const StyledAdditionalLinks = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
`;

interface PreviousWorkFormProps {
    className?: string;
    formData?: PreviousWorkType;
    onClick?: (form: PreviousWorkType) => void;
    onClose?: () => void;
}

export const PreviousWorkForm = ({
    className,
    formData,
    onClick,
    onClose,
}: PreviousWorkFormProps) => {
    const {
        clientName,
        projectName,
        website,
        description,
        documents,
        projectLinks,
        handleSave,
    } = usePrevWorkFormControl({
        formData,
        onClick,
    });

    const formClassName = className
        ? `previous-work-form ${className}`
        : 'previous-work-form';

    const idDisabledDropzone =
        !!documents.length && documents.length >= documents.MAX;

    return (
        <StyledPreviousWorkForm className={formClassName}>
            <div className="form-header">
                <h3>+Add previous experience</h3>
                <div className="close-wrapper">
                    <CloseIcon
                        className="close-button"
                        role="button"
                        onClick={onClose}
                    />
                </div>
            </div>
            <div className="divider"></div>
            <div className="form-body">
                <div className="group">
                    <LabelOld className="form-label" text="Client Name">
                        <InputOld
                            {...clientName.field}
                            placeholder="Client Name"
                            error={clientName.error?.message}
                            maxLength={255}
                        />
                    </LabelOld>
                    <LabelOld className="form-label" text="Website" isOptional>
                        <InputOld
                            {...website.field}
                            placeholder="Website"
                            error={website.error?.message}
                            maxLength={2000}
                        />
                    </LabelOld>
                </div>
                <LabelOld className="form-label" text="Project Name">
                    <InputOld
                        {...projectName.field}
                        placeholder="Project Name"
                        error={projectName.error?.message}
                        maxLength={255}
                    />
                </LabelOld>
                <LabelOld className="form-label" text="Description" isOptional>
                    <TextareaOld
                        {...description.field}
                        placeholder="Description"
                        error={description.error?.message}
                        maxLength={2000}
                    />
                </LabelOld>
                <LabelOld
                    className="form-label"
                    text="Documents"
                    isOptional
                    forId=""
                >
                    <Dropzone
                        tip={DEFAULT_UPLOAD_TEXT_SIZE}
                        className="dropzone-wrapper"
                        onChange={documents.change}
                        uploading={documents.uploading}
                        disabled={idDisabledDropzone}
                    />
                    {documents.isExist && (
                        <div className="files-wrapper">
                            {documents.field.value &&
                                documents.field.value.map(item => (
                                    <File
                                        showIcon
                                        key={item.id}
                                        name={item.title}
                                        link={item.link}
                                        onRemove={() =>
                                            documents.delete(item.id)
                                        }
                                    />
                                ))}
                        </div>
                    )}
                </LabelOld>
                <LabelOld
                    className="form-label"
                    text="Project Links"
                    isOptional
                >
                    <div className="project-links-wrapper">
                        {projectLinks.isExist &&
                            projectLinks.fields.map((field, index) => (
                                <ProjectLinks
                                    key={field.id}
                                    field={field}
                                    update={projectLinks.update}
                                    remove={projectLinks.remove}
                                    index={index}
                                    length={projectLinks.length}
                                />
                            ))}
                        {projectLinks.length < projectLinks.MAX && (
                            <LinkUi
                                title="+ Add Link"
                                variant="button"
                                size="medium"
                                onClick={() =>
                                    projectLinks.append(projectLinks.init)
                                }
                            />
                        )}
                    </div>
                </LabelOld>
            </div>
            <div className="form-footer">
                <Button
                    label={'SAVE'}
                    size="small"
                    isUppercase
                    isSubmitted={false}
                    onClick={handleSave}
                    className="button-save"
                />
            </div>
        </StyledPreviousWorkForm>
    );
};

export const ProjectLinks = ({
    field,
    update,
    remove,
    index,
    length,
}: {
    field: FieldArrayWithId<PreviousWorkType, 'projectLinks', 'id'>;
    update: UseFieldArrayUpdate<PreviousWorkType, 'projectLinks'>;
    remove: UseFieldArrayRemove;
    index: number;
    length: number;
}) => {
    const [isEditable, setIsEditable] = useState(
        !!field && (!field.link || !field.title),
    );

    const updateField = (value: { title: string; link: string } | null) => {
        if (!value) return;
        update(index, value);
    };

    const isOnlyOne = length === 1;

    return (
        <StyledAdditionalLinks>
            <EditableLinkOld
                key={field.id}
                isEditable={isEditable}
                setIsEditable={setIsEditable}
                onSave={updateField}
                onRemove={() => remove(index)}
                preValue={field}
                isLastItem={isOnlyOne}
            />
        </StyledAdditionalLinks>
    );
};
