// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TabPaymentType } from '@breef/ui-kit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    AchIcon,
    BreefPayIcon,
    CardIcon,
    SoonIcon,
    WireIcon,
} from '@breef/ui-kit';
import { PaymentMethodNames } from '../../types/paymentDataTypes';

export const paymentTabs: TabPaymentType[] = [
    {
        label: 'ACH',
        icon: <AchIcon />,
        key: PaymentMethodNames.ACH,
    },
    {
        label: 'Card',
        icon: <CardIcon />,
        key: PaymentMethodNames.CARD,
    },
    {
        label: 'Wire',
        icon: <WireIcon />,
        key: PaymentMethodNames.WIRE,
    },
    {
        label: '',
        icon: (
            <div className="group-icon">
                <BreefPayIcon className="color-inversion" />
                <SoonIcon />
            </div>
        ),
        key: PaymentMethodNames.BREEF,
    },
];
