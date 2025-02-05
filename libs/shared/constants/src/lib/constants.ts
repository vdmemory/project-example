import { APP_ENVIRONMENT, APP_URL } from './enviroment';

const envPrefix =
    APP_ENVIRONMENT !== 'production' ? APP_ENVIRONMENT.toUpperCase() + '_' : '';
export const ROOT_DOMAIN_COOKIE = APP_URL ? '.breef.com' : 'localhost';
export const ACCESS_TOKEN = `${envPrefix}ACCESS_TOKEN`;
export const REFRESH_TOKEN = `${envPrefix}REFRESH_TOKEN`;
export const IS_IMPERSONATE = 'IS_IMPERSONATE';
export const IS_OLD_USER = 'IS_OLD_USER';
export const AUTH_TOKEN = 'AUTH_TOKEN';
export const AUTH_TOKEN_REFRESH = 'AUTH_TOKEN_REFRESH';
export const REGISTRATION_FORM = 'REGISTRATION_FORM';
export const ONBOARDING_FORM = 'ONBOARDING_FORM';
export const LOGIN_FORM = 'LOGIN_FORM';
export const IS_CLIENT_PLATFORM = typeof window !== 'undefined';

export const PREV_PATH = 'PREV_PATH';
export const CURRENT_PATH = 'CURRENT_PATH';

export const PAYMENT_COMMISSION_BY_CREDIT_CARD = 3;

export const CREATE_PROJECT_KEY = 'CREATE_PROJECT_STATE';
export const CREATE_PITCH_KEY = 'CREATE_PITCH_KEY';

export const ONBOARDING_KEY = 'ONBOARDING_STATE';

export const DEFAULT_TIMEZONE = 'America/New_York';

export const GENERAL_ERROR_MESSAGE =
    'Sorry, cannot complete the process, an error occurred when getting user data.';

export const DEFAULT_UPLOAD_TEXT_SIZE =
    'We accept only PDFs and Word documents (doc, docx) at this time. Each file must be less than 10MB. Contact us if you have questions about acceptable file types.';

export enum NameTemplateLists {
    "Write my own's",
    Branding,
    'PR + influencer',
    'Photo editing',
    'Emerging technologies',
    'Digital marketing',
    'Creative + content',
    'Product strategy + UI/UX',
    'Mobile app design + development',
    'Website design + development',
    'Other',
    'All',
}

export const MAX_FILE_SIZE_UPLOAD = 10485760; // 10MB
export const COMPRESS_FILE_SIZE = 5242880; // 5MB
export const COMPRESSION_QUALITY_70 = 0.7; // 70%
export const COMPRESSION_QUALITY_50 = 0.5; // 50%
export const MAX_DOCUMENT_SIZE_UPLOAD = 10485760; // 10MB
export const TYPE_FILE_PNG = 'image/png';
export const TYPE_FILE_JPG = 'image/jpg';
export const TYPE_FILE_JPEG = 'image/jpeg';
export const TYPE_FILE_PDF = 'application/pdf';
export const TYPE_FILE_DOC = 'application/msword';
export const TYPE_FILE_DOCX =
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const authCookieOptions = { domain: ROOT_DOMAIN_COOKIE };

export const getFileTypeErrorMessage = (type?: 'all' | 'only-pdf' | '') => {
    if (type === 'only-pdf') {
        return 'Type must be either .pdf.';
    }
    if (type === 'all') {
        return 'Not supported file format.';
    }
    return 'Type must be either .pdf, .doc or .docx.';
};

export const BUDGET_FEE = 0.85;
export const POST_PROJECT_PRICE = 299;

export enum Choice {
    'less_then_five' = '2.5k-5k',
    'less_then_seven' = '5k-7k',
    'less_then_ten' = '7k-10k',
    'less_then_fifteen' = '10k-15k',
    'less_then_twenty' = '15k-20k',
    'less_then_thirty' = '20k-30k',
    'less_then_forty' = '30k-40k',
    'less_then_fifty' = '40k-50k',
    'less_then_seventy_five' = '50k-75k',
    'less_then_hundred' = '75k-100k',
    'less_then_hundred_and_fifty' = '100k-150k',
    'less_then_two_hundred' = '150k-200k',
    'more_then_two_hundred' = '200k+',
    'tbd' = 'TBD',
    '2.5k-5k' = 'less_then_five',
    '5k-7k' = 'less_then_seven',
    '7k-10k' = 'less_then_ten',
    '10k-15k' = 'less_then_fifteen',
    '15k-20k' = 'less_then_twenty',
    '20k-30k' = 'less_then_thirty',
    '30k-40k' = 'less_then_forty',
    '40k-50k' = 'less_then_fifty',
    '50k-75k' = 'less_then_seventy_five',
    '75k-100k' = 'less_then_hundred',
    '100k-150k' = 'less_then_hundred_and_fifty',
    '150k-200k' = 'less_then_two_hundred',
    '200k+' = 'more_then_two_hundred',
    'TBD' = 'tbd',
}

export enum BudgetRangeNormalised {
    '2.5k-5k' = '$2,500 - $5,000',
    '5k-7k' = '$5,000 - $7,000',
    '7k-10k' = '$7,000 - $10,000',
    '10k-15k' = '$10,000 - $15,000',
    '15k-20k' = '$15,000 - $20,000',
    '20k-30k' = '$20,000 - $30,000',
    '30k-40k' = '$30,000 - $40,000',
    '40k-50k' = '$40,000 - $50,000',
    '50k-75k' = '$50,000 - $75,000',
    '75k-100k' = '$75,000 - $100,000',
    '100k-150k' = '$100,000 - $150,000',
    '150k-200k' = '$150,000 - $200,000',
    '200k+' = '$200,000+',
    'TBD' = 'TBD',
}

export enum AgencyProjectStatus {
    review_project = 'reviewProject',
    pitch_submitted = 'pitchSubmitted',
    wait_shortlist = 'waitShortlist',
    shortlisted = 'shortlisted',
    kickoff = 'kickoff',
}

export type StatusError = {
    status: number;
    data: {
        detail: string;
    };
};

export enum ReviewDecisionNames {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    UNREVIEWED = 'unreviewed',
    VIEWED = 'viewed',
}

export enum PitchesStatus {
    'shortlisted' = 'shortlisted',
    'review_project' = 'review_project',
    'pitch_shared' = 'pitch_shared',
    'review_completed' = 'review_completed',
}

export enum ProjectFormat {
    OneTime = 'one_time',
    StrategyExecution = 'strategy_execution',
    OngoingRetainer = 'ongoing_or_retainer',
}

export enum ProjectFormatId {
    one_time = 'One-Time',
    strategy_execution = 'Strategy + Retainer',
    ongoing_or_retainer = 'Ongoing or Retainer',
}

export enum PaymentTermsId {
    'upon_receipt' = 0,
    '7_days' = 7,
    '15_days' = 15,
    '30_days' = 30,
    '45_days' = 45,
    '60_days' = 60,
}

export enum PaymentSchedule {
    'awaiting' = 'awaiting',
    'approval' = 'approval',
    'invoice_sent' = 'invoiceSent',
    'initial_proceed' = 'initialProceed',
    'proceed' = 'proceed',
    'received' = 'received',
    'paid' = 'paid',
    'cancelled' = 'cancelled',
}

export enum PaymentScheduleRequest {
    'awaiting' = 'awaiting',
    'approval' = 'approval',
    'invoiceSent' = 'invoice_sent',
    'initialProceed' = 'initial_proceed',
    'proceed' = 'proceed',
    'received' = 'received',
    'paid' = 'paid',
    'cancelled' = 'cancelled',
}

export enum PaymentScheduleTag {
    'awaiting' = 'awaiting',
    'invoice_sent' = 'invoiceSent',
    'payment_due' = 'paymentDue',
    'processing' = 'processing',
    'paid' = 'paid',
    'cancelled' = 'cancelled',
}

export enum PaymentScheduleTagRequest {
    'awaiting' = 'awaiting',
    'invoiceSent' = 'invoice_sent',
    'paymentDue' = 'payment_due',
    'processing' = 'processing',
    'paid' = 'paid',
    'cancelled' = 'cancelled',
}

export enum IsInterestedProject {
    NotSelected = 'not_selected',
    Interested = 'interested',
    NotInterested = 'not_interested',
}

export enum RoleFormNames {
    COMPANY = 'company',
    AGENCY = 'agency',
}

export enum CompanyTypeFormNames {
    CLIENT = 'client',
    AGENCY = 'agency',
}

export enum TabsProfile {
    settings = 'account-settings',
    profile = 'account-profile',
    team = 'team-members',
    payments = 'payments',
}

export enum TabsDashboardClient {
    project = 'project-scope',
    pitches = 'review-pitches',
    meet = 'meet-agencies',
    hire = 'hire',
    payments = 'payments',
}

export enum TypeFieldNames {
    TEXT = 'text',
    CHECKBOX = 'checkbox',
    EMAIL = 'email',
    PASSWORD = 'password',
}

interface IPitchValuesColors {
    [key: string]: string;
}

export const PitchValuesColors: IPitchValuesColors = {
    'attention to detail': 'green-transparent',
    'open minded': 'purple-transparent',
    communicative: 'dark-green-transparent',
    inclusive: 'orange-transparent',
    collaborative: 'blue-transparent',
    'hitting deadlines': 'turquoise',
};

export enum CouponTypeNames {
    PERCENT = 'percentage',
    FIXED = 'fixed_amount',
}

export enum PaymentStatusNames {
    BANK_ACCOUNT = 'bank_account',
    FINANCIAL_CONNECTION = 'financial_connection',
    CARD_EXIST = 'payment_method',
    CARD_NEW = 'card',
}

export enum CompanyRole {
    'founder_ceo' = 'Founder/Ceo',
    product = 'Product',
    marketing = 'Marketing',
    operations = 'Operations',
    finance = 'Finance',
}

export enum SocialDomainExamples {
    instagram = 'https://www.instagram.com/',
    twitter = 'https://www.twitter.com/',
    tiktok = 'https://www.tiktok.com/@',
    linkedin = 'https://www.linkedin.com/in/',
}

export enum BudgetType {
    Monthly = 'monthly',
    EntireProject = 'entire_project',
}

export enum SocialNameEnum {
    Instagram = 'instagram',
    Tiktok = 'tiktok',
    Twitter = 'twitter',
}

export enum PenNavNames {
    BUDGET_RANGE_FIELD = 'budget-range-field',
    COMPANY_DESCRIPTION_FIELD = 'company-description-field',
    PROJECT_OVERVIEW_FILED = 'project-overview-field',
    AGENCY_SKILLS_FIELD = 'agency-skills-field',
    AGENCY_PREFERENCES_FIELD = 'agency-preferences-field',
    IDEAL_AGENCY_FIELD = 'ideal-agency-field',
}

export enum ProjectStep {
    PROJECT_SCOPE = 1,
    AGENCY_PREFERENCES = 2,
    PERSONALIZE_SCOPE = 3,
    COMPANY_DETAILS = 4,
    REVIEW = 5,
}

export enum PitchStep {
    OUR_AGENCY = 1,
    YOUR_PITCH = 2,
    PORTFOLIO = 3,
    PROJECT_FIT = 4,
    REVIEW = 5,
}

export const projectFitItemInitValues = {
    value: '',
    comment: '',
};

export enum BillingStructureType {
    ONGOING = 'ongoing',
    ONE_TIME = 'one_time',
}

export enum CapabilityPricingRetainerType {
    HOURLY = 'hourly',
    BIWEEKLY = 'biweekly',
    MONTHLY = 'monthly',
    QUARTERLY = 'quarterly',
}

export enum CapabilityPricingType {
    MINIMUM = 'minimum',
    RANGE = 'range',
    PACKAGE = 'package',
}

export enum ScheduledCallsStatusNames {
    NO_AVAILABILITY_SET = 'no_availability_set',
    AWAITING_TIME_SELECTION = 'awaiting_time_selection',
    MEETING_BOOKING = 'meeting_booked',
    MEETING_COMPLETED = 'meeting_completed',
}
