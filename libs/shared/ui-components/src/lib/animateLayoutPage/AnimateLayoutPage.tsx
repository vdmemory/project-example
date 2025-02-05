import { LayoutGroup, motion } from 'framer-motion';
import Head from './head/Head';
import { ReactNode } from 'react';

interface AnimateLayoutPageProps {
    headTitle?: string;
    children: ReactNode;
}

export const AnimateLayoutPage = ({
    headTitle,
    children,
}: AnimateLayoutPageProps) => {
    return (
        <LayoutGroup>
            {headTitle && <Head title={headTitle} />}
            <motion.div
                style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {children}
            </motion.div>
        </LayoutGroup>
    );
};

export default AnimateLayoutPage;
