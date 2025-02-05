import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { TabChevron } from '@breef/shared/ui-components';

const StyledBreadcrumbsTabs = styled.nav`
    .tabs-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
        padding: 0;
        margin: 0;
        list-style-type: none;
        max-width: 870px;

        .tabs-item {
            height: 56px;
            z-index: 2;
        }

        .tabs-item-mobile {
            display: flex;
            cursor: pointer;
            gap: 20px;
            position: relative;

            &.active {
                color: #e1895f;

                &:before {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background-color: #e1895f;
                    border-radius: 100px;
                }

                .item-title-mobile {
                    font-weight: bold;
                }
            }

            &.disabled {
                pointer-events: none;
                opacity: 0.5;
                cursor: not-allowed;
            }

            .item-title-mobile {
                ${mixinTypography.text.tSmall.textSmallMedium};
                font-size: 12px;
                padding: 0 16.5px 8px;
            }
        }

        .breadcrumb-item {
            position: absolute;
            top: -2px;
            left: -3px;
            z-index: 1;
        }
    }
`;

interface BreadcrumbsTabsProps {
    tabs: {
        title: string;
        tab: string;
        route: string;
    }[];
}

export const BreadcrumbsTabs = ({ tabs }: BreadcrumbsTabsProps) => {
    const { changePage, asPath } = useRouteControl();
    const { isMobile } = useMediaContext();

    const renderTab = (item: {
        title: string;
        tab: string;
        route: string;
        mobileTitle?: string;
        disabled?: boolean;
    }) => {
        const { title, tab, route, mobileTitle, disabled } = item;
        const isActive = asPath === route;

        const getClasses = (base: string) => {
            const classes = [base];
            if (disabled) classes.push('disabled');
            if (isActive) classes.push('active');

            return classes.join(' ');
        };

        if (isMobile) {
            if (!mobileTitle) return;

            return (
                <li
                    key={tab}
                    className={getClasses('tabs-item-mobile')}
                    role="button"
                    onClick={!disabled ? () => changePage(route) : undefined}
                >
                    <span className="item-title-mobile">{mobileTitle}</span>
                </li>
            );
        }

        return (
            <TabChevron
                key={tab}
                className="tabs-item"
                title={title}
                onClick={() => changePage(route)}
                isActive={isActive}
                disabled={disabled}
            />
        );
    };

    return (
        <StyledBreadcrumbsTabs className="tabs">
            <ul className="tabs-list">{tabs.map(renderTab)}</ul>
        </StyledBreadcrumbsTabs>
    );
};
