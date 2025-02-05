import {
    AnimateLayoutPage,
    TermsAndConditions,
} from '@breef/shared/ui-components';
import React, { useState } from 'react';

export function NotificationPage() {
    const [checked, setChecked] = useState(false);

    return (
        <AnimateLayoutPage headTitle="Notification">
            <h1>Welcome to Notification!</h1>
            <TermsAndConditions onChange={setChecked} value={checked} />
        </AnimateLayoutPage>
    );
}

export default NotificationPage;
