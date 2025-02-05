import { LayoutStyled } from './Layout.styled';
import GlobalStyles from './GlobalStyles';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import withAuth from '../../hoc/withAuth';
import { FC, ReactNode } from 'react';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useUrlPathContains, useViewSize } from '@breef/shared/hooks';

const Layout: FC = ({ children }: { children: ReactNode }) => {
    const { viewHeight } = useViewSize();
    const pathNamesNotRender = [
        'signin',
        'signup',
        'accept-invite',
        'reset-password',
        '/[token]/pitches-list',
        '/[token]/pitch',
        '/[token]/project',
    ];

    const { hasMatchedPath } = useUrlPathContains({
        pathNames: pathNamesNotRender,
    });

    const renderHeader = () => {
        if (hasMatchedPath) {
            return <></>;
        } else {
            return <Header />;
        }
    };

    return (
        <>
            <GlobalStyles />
            <LayoutStyled viewHeight={viewHeight}>
                {renderHeader()}
                {children}
                <Footer />
            </LayoutStyled>
        </>
    );
};

export default withAuth(Layout);
