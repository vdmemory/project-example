import React from 'react';
import { AuthGoogleType } from '@breef/shared/types';
import FieldInput from '../../../fieldInput/FieldInput';
import LinkButton from '../../../button/linkButton/LinkButton';
import {
    GOOGLE_BUTTON_EVENT,
    LINK_BUTTON_EVENT,
} from '@breef/shared/constants';
import { typeFields } from '../../index';
import FieldSelectDefinesList from '../../../fieldSelect/fieldSelectDefinesList/FieldSelectDefinesList';
import CardSelectDefinesList from '../../../select/cardSelect/cardSelectDefinesList/CardSelectDefinesList';
import { Button } from '../../../button/Button';
import BookACall from '../../../widgetCalendar/bookACall/BookACall';
import { ScrollBar } from '../../../scrollers/Scrollbar';
import MultiplePlacesAutocomplete from '../../../autocomplete/multipleAutocomplete/MultipleAutocomplete';
import MultiCardSelectsController from '../../../select/cardSelect/multiCardSelectsController/MultiCardSelectsController';
import MultiChipSelectsController from '../../../select/chipSelect/multiChipSelectsController/MultiChipSelectsController';
import dynamic from 'next/dynamic';

const GoogleAuth = dynamic(
    () => import('../../../button/googleAuth/GoogleAuth'),
    {
        ssr: false,
    },
);

export const FieldDetection = (props: FieldDetectionProps) => {
    const { typeField = 'text', onClick, disabled } = props;

    const emailSocialBtnPassBtn = (
        <>
            <FieldInput {...props} value={props.value as string} />
            <div data-testid="google-auth-wrapper" className="under-field">
                <GoogleAuth
                    onClick={data => onClick(GOOGLE_BUTTON_EVENT, data)}
                />
            </div>
        </>
    );

    const emailFindPasswordBackBtn = (
        <>
            <FieldInput {...props} value={props.value as string} />
            <LinkButton
                name="Back to sign in"
                onClick={() =>
                    onClick(LINK_BUTTON_EVENT, { query: 'password' })
                }
                disabled={disabled}
            />
        </>
    );

    const passwordForgotBtn = (
        <>
            <FieldInput {...props} value={props.value as string} />
            <LinkButton
                className="forgot-password"
                name="Forgot password?"
                onClick={() =>
                    onClick(LINK_BUTTON_EVENT, { query: 'findpassword' })
                }
                disabled={disabled}
            />
        </>
    );

    const select = (
        <FieldSelectDefinesList
            {...props}
            value={props.value as string}
            listType={props.listType || ''}
        />
    );

    const cardSelect = (
        <div data-testid="card-select-wrapper" className="cardSelect">
            <ScrollBar scroll="vertical" next={props.isNextMore ? 'More' : ''}>
                <CardSelectDefinesList
                    {...props}
                    value={props.value as { id: number; name: string }[]}
                    listType={props.listType || ''}
                    isMultiple
                />
            </ScrollBar>
            <Button
                type={props.typeButton || 'button'}
                title="Next"
                arrowRight
                withAnimate
                className="normal"
                disabled={props.isDisableNextBtn}
                onClick={e => onClick('nav-event', e)}
            />
        </div>
    );

    const multiCardSelect = (
        <>
            <MultiCardSelectsController
                {...props}
                value={props.value as { id: number; name: string }[]}
                type={props.listType || ''}
            />
            <Button
                type={props.typeButton || 'button'}
                title="Next"
                arrowRight
                withAnimate
                className="normal normal-btn"
                disabled={props.isDisableNextBtn}
                onClick={e => onClick('nav-event', e)}
            />
        </>
    );

    const multiChipSelect = (
        <>
            <MultiChipSelectsController
                {...props}
                value={props.value as { id: number; name: string }[]}
                type={props.listType || ''}
                dependencyField={
                    props.dependencyFieldValue
                        ? (props.dependencyFieldValue as {
                              id: number;
                              name: string;
                          }[])
                        : undefined
                }
            />
            <Button
                type={props.typeButton || 'button'}
                title="Next"
                arrowRight
                className="normal"
                withAnimate
                disabled={props.isDisableNextBtn}
                onClick={e => onClick('nav-event', e)}
            />
        </>
    );

    const bookACall = (
        <BookACall
            isBookedCall={props.isBookedCall}
            bookCallCallback={props.bookACallCallback}
        />
    );

    const multiplePlacesAutocomplete = (
        <MultiplePlacesAutocomplete
            {...props}
            places={props.value as { location: string }[]}
        />
    );
    switch (typeField) {
        case typeFields.emailSocialBtnPassBtn:
            return emailSocialBtnPassBtn;
        case typeFields.emailFindPasswordBackBtn:
            return emailFindPasswordBackBtn;
        case typeFields.passwordForgotBtn:
            return passwordForgotBtn;
        case typeFields.select:
            return select;
        case typeFields.cardSelect:
            return cardSelect;
        case typeFields.multiCardSelect:
            return multiCardSelect;
        case typeFields.multiChipSelect:
            return multiChipSelect;
        case typeFields.bookACall:
            return bookACall;
        case typeFields.multiplePlacesAutocomplete:
            return multiplePlacesAutocomplete;

        default:
            return <FieldInput {...props} value={props.value as string} />;
    }
};

export interface FieldDetectionProps {
    onEyeIcon?: boolean;
    setValue: (value: string) => void;
    value?:
        | string
        | { location: string }[]
        | { value: string; label: string }[]
        | { id: number; name: string }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (value: any) => void;
    onClick: (
        key: string,
        data: AuthGoogleType | React.SyntheticEvent | { query: string },
    ) => void;
    typeField?: string;
    typeButton?: 'submit' | 'button';
    typeInput?: 'text' | 'password' | 'phone';
    path: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    isDisableNextBtn: boolean;
    listType?: string;
    onMouseEnter?: (e: React.SyntheticEvent, id: number) => void;
    onMouseLeave?: (id?: number) => void;
    dependencyFieldValue?: unknown;
    isBookedCall?: boolean;
    bookACallCallback?: () => void;
    isFieldArrowNextOnMobile?: boolean;
    isNextMore?: boolean;
}

export default FieldDetection;
