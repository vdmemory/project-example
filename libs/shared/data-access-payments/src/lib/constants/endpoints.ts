export const COUPONS_PREFILL_PATH = '/coupons/prefill';
export const COUPONS_VALIDATE_PATH = '/coupons/validate';

export const CARDS_PATH = '/cards';
export const getCard = (cardId: string) => `/cards/${cardId}`;

export const BANKS_PATH = '/banks';
export const removeFCAccount = (id: string) => `/financial-connections/${id}`;

export const FINANCIAL_CONNECTIONS_SESSION_PATH =
    '/financial-connections/session';

export const WIRE_PAYMENT_PATH = '/payments/wire';
export const setWirePayment = (paymentId: number) =>
    `/payments/${paymentId}/pay/wire`;

export const POST_PROJECT_PATH = '/projects/post';
export const PAYMENTS_PATH = '/payments';
export const SET_DEFAULT_PATH = '/payments/set-default';
export const getPayments = (projectId: string | number) =>
    `/projects/${projectId}/payments`;
export const getPaymentsKickoff = (projectId: string | number) =>
    `/projects/${projectId}/kick-off/payments`;
export const setPayPayment = (paymentId: number) =>
    `/payments/${paymentId}/pay`;
export const getCompanyInfo = (projectId: string | number) =>
    `/projects/${projectId}/company-info`;
export const getInvoice = (paymentId: string | number) =>
    `/payments/${paymentId}/invoice-pdf`;
export const getReceipt = (paymentId: string | number) =>
    `/payments/${paymentId}/receipt-pdf`;
export const updatePayment = (paymentId: number) => `/payments/${paymentId}`;
export const getPaymentsRetainer = (projectId: string | number) =>
    `/projects/${projectId}/payments/retainer`;
export const addPayments = (projectId: string | number) =>
    `/projects/${projectId}/payments/add`;
export const getPaymentInfo = (paymentId: string | number) =>
    `/payments/${paymentId}`;
export const getCardBillingDetails = (cardToken: string) =>
    `/cards/${cardToken}`;
