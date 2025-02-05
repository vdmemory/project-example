/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouteControl } from '@breef/shared/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { StyledActiveLine, StyledLink } from './Link.styled';
import Button from '../../button/Button';

export interface LinkProps {
    type?: 'orange' | 'normal' | 'float';
    route: string;
    name?: string;
    icon?: React.ReactNode;
    width?: 'fixed' | 'auto';
    notice?: number | null;
    marker?: boolean;
    typeChildren?: 'link' | 'button';
    isDisabled?: boolean;
}

export function NavigateLink({
    route,
    name,
    type = 'normal',
    icon,
    width = 'fixed',
    notice = null,
    marker = false,
    typeChildren = 'link',
    isDisabled = false,
}: LinkProps) {
    const { pathname } = useRouter();
    const { changePage } = useRouteControl();

    const routeWithoutQueryParams = route.replace(/\?.*/, '');
    const visibleActiveLine =
        type === 'float' && pathname.includes(routeWithoutQueryParams);

    const handleClick = () => {
        changePage(route);
    };

    return (
        <StyledLink
            type={type}
            width={width}
            notice={notice}
            marker={marker || undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            disabled={isDisabled}
        >
            {typeChildren === 'link' ? (
                <Link href={route} legacyBehavior>
                    <a className={pathname === route ? 'active' : ''}>
                        {name} {icon}{' '}
                        {!!notice && <span className="notice">{notice}</span>}
                        {!!marker && <span className="marker">{marker}</span>}
                        {visibleActiveLine && <ActiveLine />}
                    </a>
                </Link>
            ) : (
                <Button
                    onClick={handleClick}
                    color="transparent"
                    withAnimate
                    type="button"
                    disabled={isDisabled}
                >
                    {name}
                </Button>
            )}
        </StyledLink>
    );
}

const ActiveLine = () => {
    return (
        <StyledActiveLine
            initial={{ y: 4 }}
            animate={{ y: 0 }}
            exit={{ y: 4 }}
        />
    );
};
