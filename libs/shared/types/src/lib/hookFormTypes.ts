import { PaymentScheduleType } from './kickoff/kickoffTypes';
import { AddPaymentsType } from './payments/paymentsTypes';
import {
    AccountInfoRequestType,
    ChangePasswordRequestType,
    CompanyInfoRequestType,
    CompanyInfoType,
    CompanyRequestType,
    IndustriesTagsType,
    LinksDocsType,
    SetPasswordRequestType,
} from './profile/profileTypes';

export type ControlTypeInnerForm =
    | AccountInfoRequestType
    | CompanyInfoType
    | CompanyInfoRequestType
    | CompanyRequestType
    | SetPasswordRequestType
    | ChangePasswordRequestType
    | IndustriesTagsType
    | LinksDocsType;

export type ControlTypePaymentsForm = PaymentScheduleType | AddPaymentsType;

export type HookFormEventType = { target: { value: string } };
