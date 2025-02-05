import { Fragment } from 'react';
import { css, Global } from '@emotion/react';
import NavControl from '../../../navControl/NavControl';
import Link from 'next/link';
import { PROJECTS_ROUTE, SIGN_IN_ROUTE } from '@breef/shared/constants';
import { BreefLogo } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const HeaderNav = () => {
    return (
        <Fragment>
            <Global key="global-styles" styles={navGlobalStyles} />
            <NavControl
                key="nav-control"
                isNewNav
                isStatic
                leftComponent={
                    <Link
                        className="link-logo"
                        href={SIGN_IN_ROUTE}
                        shallow={true}
                    >
                        <BreefLogo />
                    </Link>
                }
            />
        </Fragment>
    );
};

export const navGlobalStyles = css`
    body .nav-control {
        display: none;

        @media screen and (${mediaScreen.mobile}) {
            display: flex;
            z-index: 9991;
            height: 74px;
            border: none;

            .left-section > a.link-logo {
                padding: 0 16px;

                svg {
                    width: 76px;
                }
            }

            .right-section {
                display: flex;
                justify-content: flex-end;
            }
        }
    }
`;
