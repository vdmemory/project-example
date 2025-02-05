import { fireEvent, render } from '@testing-library/react';
import { ButtonTab, Tabulation, useTabulation } from './Tabulation';

import { renderHook, act } from '@testing-library/react-hooks';

const handleChooseTab = jest.fn();
const defaultPropsTabulation = {
    isTabs: true,
    tabs: [
        {
            id: 1,
            label: 'tab1',
        },
        {
            id: 2,
            label: 'tab2',
        },
    ],
    handleChooseTab,
    tabList: [
        <div key="tablist-tab-1">content tab 1</div>,
        <div key="tablist-tab-2">content tab 2</div>,
    ],
    activeTab: 0,
};
const propsButtonTab = {
    tab: {
        id: 1,
        label: 'tab1',
    },
    selectedTab: {
        id: 2,
        label: 'tab2',
    },
    onClick: handleChooseTab,
};
describe('Tabulation', () => {
    it('should render successfully ', () => {
        const { baseElement, getByText } = render(
            <Tabulation {...defaultPropsTabulation} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('tab1')).toBeInTheDocument();
        expect(getByText('tab2')).toBeInTheDocument();
        expect(getByText('content tab 1')).toBeInTheDocument();
    });
    it('should render second tab content if this tab is active ', () => {
        const { getByText } = render(
            <Tabulation {...defaultPropsTabulation} activeTab={1} />,
        );
        expect(getByText('content tab 2')).toBeInTheDocument();
    });
    it('should call handleChange tab on tab button click ', () => {
        const { getByText } = render(
            <Tabulation {...defaultPropsTabulation} />,
        );
        fireEvent.click(getByText('tab2'));
        expect(handleChooseTab).toBeCalled();
    });
});

describe('ButtonTab', () => {
    it('should render successfully ', () => {
        const { baseElement, getByText } = render(
            <ButtonTab {...propsButtonTab} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('tab1')).toBeInTheDocument();
    });
    it('should call onClick successfully', () => {
        const { getByText } = render(<ButtonTab {...propsButtonTab} />);
        fireEvent.click(getByText('tab1'));
        expect(handleChooseTab).toBeCalled();
    });
});

describe('useTabulation', () => {
    it('should initialize with activeTab 0', () => {
        const { result } = renderHook(() => useTabulation());
        expect(result.current.activeTab).toBe(0);
    });

    it('should increment activeTab when handleNextStage is called', () => {
        const { result } = renderHook(() => useTabulation());
        act(() => {
            result.current.handleNextStage();
        });
        expect(result.current.activeTab).toBe(1);
    });

    it('should decrement activeTab when handlePrevStage is called', () => {
        const { result } = renderHook(() => useTabulation());
        act(() => {
            result.current.setActiveTab(2);
        });
        act(() => {
            result.current.handlePrevStage();
        });
        expect(result.current.activeTab).toBe(1);
    });

    it('should update activeTab when setActiveTab is called', () => {
        const { result } = renderHook(() => useTabulation());
        act(() => {
            result.current.setActiveTab(3);
        });
        expect(result.current.activeTab).toBe(3);
    });
});
