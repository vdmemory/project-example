/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { PaymentStatusNames } from '@breef/shared/constants';
import ProjectPost, { confirmPopupStylesPreset } from './ProjectPost';
import {
    useCouponPostControl,
    useProjectInfoControl,
    useProjectPostControl,
} from '../../hooks';
import { Key, ReactElement, JSXElementConstructor } from 'react';
import { CardScreen } from '../../types/projectInfoTypes';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';

jest.mock('@breef/shared/data-access-auth', () => ({
    useGetSelfQuery: jest.fn(),
}));
jest.mock('@breef/shared/hooks', () => ({
    useMediaContext: jest.fn(),
    useOn3DSComplete: jest.fn().mockReturnValue({
        isLoading3DSComplete: false,
        successData: null,
    }),
    useRouteControl: jest.fn(),
    useShowErrorMessage: jest.fn().mockReturnValue({
        isShowError: false,
        showError: jest.fn(),
    }),
    useToastifyRequest: jest.fn().mockReturnValue({
        toastLoading: false,
    }),
}));
jest.mock('@breef/shared/ui-components', () => ({
    usePopup: jest.fn().mockReturnValue({
        isOpen: false,
        open: jest.fn(),
        close: jest.fn(),
    }),
    // Mock other components from ui-components
    AccountBillingDetail: ({
        billingDetail,
    }: {
        billingDetail: { city: string; country: string };
    }) => <div>{billingDetail?.city}</div>,
    AccountItem: ({
        item,
    }: {
        item: { token: Key | null | undefined; last4: string };
    }) => <div>{item?.last4}</div>,
    AccountsList: ({
        list,
        ...props
    }: {
        list: { token: Key | null | undefined; last4: string }[];
        [x: string]: any;
    }) => (
        <ul>
            {list?.map(
                (item: { token: Key | null | undefined; last4: string }) => (
                    <li key={item.token} {...props}>
                        {item.last4}
                    </li>
                ),
            )}
        </ul>
    ),
    Button: ({ label, ...props }: { label: string; [x: string]: any }) => (
        <button {...props}>{label}</button>
    ),
    ConfirmContent: ({
        title,
        ...props
    }: {
        title: string;
        [x: string]: any;
    }) => (
        <div {...props}>
            <h2>{title}</h2>
        </div>
    ),
    CreditCardForm: ({ ...props }) => <form {...props}>CreditCardForm</form>,
    Header: ({
        buttonTitle,
        ...props
    }: {
        buttonTitle: string;
        [x: string]: any;
    }) => (
        <header {...props}>
            <button>{buttonTitle}</button>
        </header>
    ),
    LipsLoader: () => <div>LipsLoader</div>,
    PageLoader: () => <div>PageLoader</div>,
    Section: ({
        label,
        children,
    }: {
        label: string;
        children: ReactElement<any, string | JSXElementConstructor<any>>;
    }) => (
        <section>
            <h3>{label}</h3>
            {children}
        </section>
    ),
    StatusCheckoutPage: ({
        status,
        ...props
    }: {
        status: string;
        [x: string]: any;
    }) => <div {...props}>{status}</div>,
    WarningIcon: () => <div>WarningIcon</div>,
}));
jest.mock('./payInformation/PayInformation', () => ({
    __esModule: true, // This line is important for mocking ES modules
    default: ({ price }: { price: number }) => (
        <div>PayInformation: {price}</div>
    ),
}));

jest.mock('../../hooks');

const mockUseMediaContext = useMediaContext as jest.Mock;
const mockUseProjectInfoControl = useProjectInfoControl as jest.Mock;
const mockUseCouponPostControl = useCouponPostControl as jest.Mock;
const mockUseProjectPostControl = useProjectPostControl as jest.Mock;
const mockUseRouteControl = useRouteControl as jest.Mock;
const mockUseGetSelfQuery = useGetSelfQuery as jest.Mock;

const mockProjectInfo = {
    projectInfo: {
        title: 'Test Project',
        description: 'This is a test project.',
    },
    couponInfo: {
        price: 100,
        discount: 0,
        name: '',
    },
};

const mockListCards = [
    {
        token: 'card_123',
        last4: '4242',
        brand: 'Visa',
        exp_month: 12,
        exp_year: 2024,
        address: {
            city: 'New York',
            country: 'US',
        },
        paymentStatus: PaymentStatusNames.CARD_EXIST,
    },
    {
        token: 'card_456',
        last4: '1234',
        brand: 'MasterCard',
        exp_month: 10,
        exp_year: 2025,
        address: {
            city: 'Los Angeles',
            country: 'US',
        },
        paymentStatus: PaymentStatusNames.CARD_EXIST,
    },
];

const mockHandlePostProject = jest.fn();

describe('ProjectPost', () => {
    mockUseGetSelfQuery.mockReturnValue({
        data: { hasPassword: true },
        isLoading: false,
    });
    mockUseMediaContext.mockReturnValue({ isMaxMobile: false });
    mockUseProjectInfoControl.mockReturnValue({
        loadingProject: false,
        projectPost: mockProjectInfo,
    });
    mockUseCouponPostControl.mockReturnValue({
        handleClickCoupon: jest.fn(),
        isSuccessCoupons: false,
        isLoaderCoupons: false,
        isSubmittedCoupon: false,
        error: null,
    });
    mockUseProjectPostControl.mockReturnValue({
        handlePostProject: mockHandlePostProject,
        handleUpdateCard: jest.fn(),
        isLoadingUpdateCard: false,
        isLoadingPost: false,
        isLoadingSetCard: false,
        listCards: mockListCards,
        isLoadingGetCards: false,
        isFetchingGetCards: false,
        successScreenData: null,
        errorScreenData: null,
        removeActions: {
            isLoading: false,
            removeCard: jest.fn(),
        },
        setScreen: jest.fn(),
        handleBack: jest.fn(),
        setSelectedCard: jest.fn(),
        isSelectedCard: false,
        terms: true,
    });
    mockUseRouteControl.mockReturnValue({
        changePage: jest.fn(),
        queryParams: {},
    });

    it('renders success screen', () => {
        render(
            <BrowserRouter>
                <ProjectPost initScreen={CardScreen.SUCCESS} />
            </BrowserRouter>,
        );
        expect(screen.getByText('success')).toBeInTheDocument();
    });

    it('renders failure screen', () => {
        render(
            <BrowserRouter>
                <ProjectPost initScreen={CardScreen.FAILURE} />
            </BrowserRouter>,
        );
        expect(screen.getByText('failed')).toBeInTheDocument();
    });

    it('should render successfully', async () => {
        mockUseProjectPostControl.mockReturnValue({
            isLoadingGetCards: true,
            isFetchingGetCards: true,
        });
        const { baseElement } = render(
            <BrowserRouter>
                <ProjectPost />
            </BrowserRouter>,
        );
        expect(baseElement).toBeTruthy();
    });

    it('renders list of saved cards', () => {
        mockUseProjectPostControl.mockReturnValue({
            isLoadingGetCards: false,
            isFetchingGetCards: false,
            listCards: mockListCards,
        });
        render(
            <BrowserRouter>
                <ProjectPost />
            </BrowserRouter>,
        );
        expect(screen.getByText('saved cards')).toBeInTheDocument();
        expect(screen.getByText('4242')).toBeInTheDocument();
        expect(screen.getByText('1234')).toBeInTheDocument();
    });

    it('renders empty list, display form', () => {
        mockUseProjectPostControl.mockReturnValue({
            isLoadingGetCards: false,
            isFetchingGetCards: false,
            listCards: [],
        });
        render(
            <BrowserRouter>
                <ProjectPost />
            </BrowserRouter>,
        );
        expect(screen.getByText('Payment Details')).toBeInTheDocument();
        expect(screen.getByText('CreditCardForm')).toBeInTheDocument();
    });

    it('renders project information', () => {
        mockUseProjectPostControl.mockReturnValue({
            isLoadingGetCards: false,
            isFetchingGetCards: false,
            listCards: mockListCards,
        });
        render(
            <BrowserRouter>
                <ProjectPost />
            </BrowserRouter>,
        );
        expect(screen.getByText('Make Payment')).toBeInTheDocument();
        expect(screen.getByText('PayInformation: 100')).toBeInTheDocument();
    });

    it(`should render successfully CreditCardForm with left section`, () => {
        const { baseElement } = render(
            <BrowserRouter>
                <ProjectPost />
            </BrowserRouter>,
        );
        const leftSection = baseElement.querySelector('.left-section');
        expect(leftSection).toBeTruthy();
    });

    it(`should render successfully CreditCardForm with right section`, () => {
        const { baseElement } = render(
            <BrowserRouter>
                <ProjectPost />
            </BrowserRouter>,
        );
        const rightSection = baseElement.querySelector('.right-section');
        expect(rightSection).toBeTruthy();
    });

    it('renders mobile default screen', () => {
        mockUseProjectPostControl.mockReturnValue({
            isLoadingGetCards: false,
            isFetchingGetCards: false,
            listCards: mockListCards,
        });
        mockUseMediaContext.mockReturnValue({ isMaxMobile: true });
        render(
            <BrowserRouter>
                <ProjectPost />
            </BrowserRouter>,
        );
        expect(screen.getByText('default card')).toBeInTheDocument();
        expect(screen.getByText('4242')).toBeInTheDocument();
        expect(screen.getByText('New York')).toBeInTheDocument();
        expect(screen.getByText('POST PROJECT')).toBeInTheDocument();
    });

    it(`should render successfully CreditCardForm with preloader`, () => {
        mockUseProjectPostControl.mockReturnValue({
            isLoadingGetCards: true,
            isFetchingGetCards: true,
            listCards: mockListCards,
        });
        mockUseCouponPostControl.mockReturnValue({
            isLoaderCoupons: true,
        });
        mockUseMediaContext.mockReturnValue({ isMaxMobile: false });
        render(
            <BrowserRouter>
                <ProjectPost />
            </BrowserRouter>,
        );
        const preloader = screen.getAllByText('LipsLoader');
        expect(preloader).toHaveLength(2);
    });

    it(`should render successfully CreditCardForm with preloader from mobile`, () => {
        mockUseProjectPostControl.mockReturnValue({
            isLoadingGetCards: true,
            isFetchingGetCards: true,
            listCards: mockListCards,
        });
        mockUseCouponPostControl.mockReturnValue({
            isLoaderCoupons: true,
        });
        mockUseMediaContext.mockReturnValue({ isMaxMobile: true });
        render(
            <BrowserRouter>
                <ProjectPost />
            </BrowserRouter>,
        );
        const preloader = screen.getAllByText('LipsLoader');
        expect(preloader).toHaveLength(2);
    });

    it('renders loading state while fetching project info', () => {
        mockUseProjectInfoControl.mockReturnValue({
            loadingProject: true,
            projectPost: mockProjectInfo,
        });
        render(
            <BrowserRouter>
                <ProjectPost />
            </BrowserRouter>,
        );
        expect(screen.getByText('PageLoader')).toBeInTheDocument();
    });
});

describe('confirmPopupStylesPreset', () => {
    it('should return mobile styles when isMobile is true', () => {
        const isMobile = true;
        const expectedStyles = {
            minWidth: '360px',
            overflow: 'visible',
            maxWidth: '800px',
            width: '360px',
            borderRadius: '0',
            borderWidth: '0.8px',
        };
        const result = confirmPopupStylesPreset(isMobile);
        expect(result).toEqual(expectedStyles);
    });

    it('should return desktop styles when isMobile is false', () => {
        const isMobile = false;
        const expectedStyles = {
            minWidth: '400px',
            overflow: 'visible',
            maxWidth: '800px',
            width: '400px',
            borderRadius: '0',
            borderWidth: '0.8px',
        };
        const result = confirmPopupStylesPreset(isMobile);
        expect(result).toEqual(expectedStyles);
    });
});
