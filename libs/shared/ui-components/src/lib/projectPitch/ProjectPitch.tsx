import { BrandLinksType } from '@breef/shared/types';

import React from 'react';
import { BrandDocuments } from '../listDocuments/documentPreview/BrandDocuments';
import { CardView } from '../select/cardSelect/cardController/cardView/CardView';
import { StyledProjectPitchSections } from './ProjectPitch.styled';

type ProjectPitchProps = {
    pitchText: string;
    emojis: string[] | [];
    values: string;
    files: BrandLinksType[] | [];
    miscNotesGif: string | null;
    miscNotes: string;
    companyName: string;
};

const ProjectPitch: React.FC<ProjectPitchProps> = ({
    pitchText,
    emojis = [],
    values = '',
    files = [],
    miscNotes,
    miscNotesGif,
    companyName = '',
}) => {
    return (
        <StyledProjectPitchSections className="cc">
            {pitchText && (
                <CardView
                    label="Pitch Summary"
                    id="pitch-summary"
                    className="card-pitch-summary"
                    description={pitchText}
                />
            )}

            {!!emojis.length && (
                <CardView
                    label={`Emojis representing ${companyName}`}
                    id="emoji"
                    className="card-emoji"
                >
                    <div
                        data-testid="emojis-wrapper"
                        className="card-emoji--item"
                    >
                        {emojis.length
                            ? emojis.map((item, i) => (
                                  <span
                                      key={`emoji--item-${i}`}
                                      role="img"
                                      aria-label={`emoji-${i}`}
                                  >
                                      {item}
                                  </span>
                              ))
                            : ''}
                    </div>
                </CardView>
            )}
            {values && (
                <CardView
                    label="Values"
                    id="values"
                    className="card-emoji"
                    description={values}
                />
            )}

            {!!files.length && (
                <CardView
                    label="Additional Information"
                    id="additional-information"
                    className="card-documents"
                    description=""
                >
                    <BrandDocuments documents={files} />
                </CardView>
            )}
            {(miscNotes || miscNotesGif) && (
                <CardView
                    label="Notes to client"
                    id="notes"
                    className="card-notes"
                    description={miscNotes}
                >
                    {miscNotesGif && (
                        <img
                            data-testid="misc-notes-gif-image"
                            className="gif-image"
                            src={miscNotesGif}
                            alt="gif"
                        />
                    )}
                </CardView>
            )}
        </StyledProjectPitchSections>
    );
};
export default ProjectPitch;
