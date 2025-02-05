export type CouponsInfoType = {
    id: number | null;
    price: number;
    discount: number | null;
    name: string | null;
    description: string | null;
    code: string | null;
};

export enum CardScreen {
    LIST = 'LIST_CREDIT_CARD',
    FORM = 'FORM_PAY_CARD',
    SUCCESS = 'SUCCESS_CARD',
    FAILURE = 'ERROR_CARD',
}
