import { Global } from '@emotion/react';
import { Fragment } from 'react';
import { PlacesAutocomplete } from '../../autocomplete/Autocomplete';
import ChipButton from '../../button/chipButton/ChipButton';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import { withPopup } from '../../popup/Popup';
import {
    globalCssPopUp,
    StyledSearchLocationPopup,
} from './SearchLocationPopup.styled';

interface SearchLocationProps {
    listPopular?: { name: string; id: number }[];
    onClick: (action: 'remove' | 'add', id: number, name: string) => void;
    error?: string;
}

const SearchLocation = ({
    listPopular,
    onClick,
    error,
}: SearchLocationProps) => {
    return (
        <Fragment>
            <Global styles={globalCssPopUp} />
            <StyledSearchLocationPopup>
                <span>Location:</span>
                <PlacesAutocomplete
                    onClick={(id, name) => onClick('add', id, name)}
                />
                {error && (
                    <ErrorMessage className="error-location">
                        {error}
                    </ErrorMessage>
                )}
                {listPopular && listPopular.length !== 0 && (
                    <div className="popular">
                        <label>Most searched</label>
                        <div className="list">
                            {listPopular.map(({ name, id }) => (
                                <ChipButton
                                    key={id}
                                    id={id}
                                    name={name}
                                    action="add"
                                    icon={false}
                                    onClick={(e, action, id) =>
                                        onClick(action, id, name)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}
            </StyledSearchLocationPopup>
        </Fragment>
    );
};

export default withPopup(SearchLocation);
