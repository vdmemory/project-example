import {
    ChangeHandler,
    useController,
    useFieldArray,
    useFormContext,
} from 'react-hook-form';
import { PitchCreatePortfolioFormType } from '../../../types/pitchCreateType';
import { StyledPortfolioStep } from './PortfolioStep.styled';
import { Label, LinkUi } from '@breef/ui-kit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Dropzone, File } from '@breef/shared/ui-components';
import { useDocumentController, useSaveDocument } from '@breef/shared/hooks';
import { ListType } from '@breef/shared/types';
import { additionalLinksInitValues } from '../../../hooks/usePitchCreateFormControl';
import { AdditionalLinks } from './additionalLinks/AdditionalLinks';
import { PreviousWork } from './previousWork/PreviousWork';
import {
    DEFAULT_UPLOAD_TEXT_SIZE,
    IS_CLIENT_PLATFORM,
} from '@breef/shared/constants';
import { useEffect } from 'react';

export const PortfolioStep = () => {
    useEffect(() => {
        function updateSize() {
            if (!IS_CLIENT_PLATFORM) return;
            const widthScreen = window.screen.width;
            if (widthScreen >= 650) return;
            console.log('updateSize', widthScreen);

            const excludePadding = 32;
            const widthMain = document.querySelector('main') as HTMLElement;
            const portfolio = document.querySelector(
                '#portfolio',
            ) as HTMLElement;

            if (!widthScreen || !portfolio) return;
            portfolio.style.width = `${
                widthMain?.offsetWidth - excludePadding
            }px`;
        }

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const { control } = useFormContext<PitchCreatePortfolioFormType>();

    const {
        fields: fieldsAdditionalLinks,
        remove: removeAdditionalLinks,
        update: updateAdditionalLinks,
        append: appendAdditionalLinks,
    } = useFieldArray({
        control,
        name: 'additionalLinks',
    });

    const MAX_ADDITIONAL_LINKS = 200;
    const isExistAdditionalLinks = fieldsAdditionalLinks.length !== 0;
    const lengthAdditionalLinks = fieldsAdditionalLinks.length;

    const fieldAttachments = useController({
        control,
        name: 'attachments',
    }).field;

    const MAX_ATTACHMENTS = 5;

    const { saveDocument, handleDeleteLink } = useDocumentController({
        documentsValue: fieldAttachments.value as ListType[],
        onChange: fieldAttachments.onChange as ChangeHandler,
    });

    const { uploadDocument, uploading } = useSaveDocument({
        saveDocument,
    });

    const handleChangeDropzone = (files: File[], currentFileId?: number) =>
        uploadDocument(files[0], currentFileId);

    return (
        <StyledPortfolioStep id="portfolio">
            <Label
                text="Previous Experience"
                subtext="Add relevant past work or case studies."
                forId="previous-work"
                id="previous-work-field"
            >
                <div className="previous-work-wrapper">
                    <PreviousWork />
                </div>
            </Label>
            <Label
                text="Additional Links"
                subtext="Add links to decks, case studies, or additional relevant information."
                forId="additional-links"
                id="additional-links-label"
            >
                <div className="additional-links-wrapper">
                    {isExistAdditionalLinks &&
                        fieldsAdditionalLinks.map((field, index) => (
                            <AdditionalLinks
                                key={field.id}
                                field={field}
                                update={updateAdditionalLinks}
                                remove={removeAdditionalLinks}
                                index={index}
                                length={lengthAdditionalLinks}
                            />
                        ))}
                    {lengthAdditionalLinks < MAX_ADDITIONAL_LINKS && (
                        <LinkUi
                            title="+ Add Link"
                            variant="button"
                            onClick={() =>
                                appendAdditionalLinks(additionalLinksInitValues)
                            }
                        />
                    )}
                </div>
            </Label>
            <Label
                text="Attachments"
                subtext="Upload a portfolio, deck, or additional relevant information."
                forId="attachments"
                id="attachments-label"
            >
                <Dropzone
                    className="dropzone-wrapper"
                    tip={DEFAULT_UPLOAD_TEXT_SIZE}
                    onChange={handleChangeDropzone}
                    uploading={uploading}
                    disabled={fieldAttachments.value.length >= MAX_ATTACHMENTS}
                    isMobileView={false}
                />
                {fieldAttachments.value.length !== 0 && (
                    <div className="files-wrapper">
                        {fieldAttachments.value.map(item => (
                            <File
                                showIcon
                                key={item.id}
                                name={item.title}
                                link={item.link}
                                onRemove={() => handleDeleteLink(item.id)}
                            />
                        ))}
                    </div>
                )}
            </Label>
        </StyledPortfolioStep>
    );
};

export default PortfolioStep;
