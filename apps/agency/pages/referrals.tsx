import { AnimateSharedLayout, motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import styled from '@emotion/styled';
import { AnimateLayoutPage } from '@breef/shared/ui-components';

export const StyledReferralsPage = styled.div`
    ul,
    li {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    ul {
        width: 300px;
        display: flex;
        flex-direction: column;
        background: white;
        padding: 20px;
        border-radius: 25px;
    }

    li {
        background-color: rgba(214, 214, 214, 0.5);
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
        overflow: hidden;
        cursor: pointer;
    }

    li:last-child {
        margin-bottom: 0px;
    }

    .avatar {
        width: 40px;
        height: 40px;
        background-color: #666;
        border-radius: 20px;
    }

    .row {
        width: 100%;
        height: 8px;
        background-color: #999;
        border-radius: 10px;
        margin-top: 12px;
    }
`;

export function ReferralsPage() {
    return (
        <AnimateLayoutPage headTitle="Referrals">
            <StyledReferralsPage>
                <AnimateSharedLayout>
                    <motion.ul layout initial={{ borderRadius: 25 }}>
                        {items.map(item => (
                            <Item key={item} />
                        ))}
                    </motion.ul>
                </AnimateSharedLayout>
            </StyledReferralsPage>
        </AnimateLayoutPage>
    );
}

export default ReferralsPage;

function Item() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
            <motion.div className="avatar" layout />
            <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
        </motion.li>
    );
}

function Content() {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="row" />
            <div className="row" />
            <div className="row" />
        </motion.div>
    );
}

const items = [0, 1, 2];
