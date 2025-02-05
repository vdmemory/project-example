# Tabs Component

> Tabs, which takes a list as a mandatory prop and returns a React Tabs component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    tabs: TabPaymentType[];
    className?: string;
    onClick?: (key: string) => void;
    activeTab?: string | null;
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Tabs, TabPaymentType } from '@breef/ui-kit';
import { AchIcon, CardIcon } from '@breef/ui-kit/icons';

const config: TabPaymentType[] = [
    {
        label: 'ACH',
        icon: <AchIcon />,
        key: 'ach',
    },
    {
        label: 'Card',
        icon: <CardIcon />,
        key: 'card',
    },
];

export function UiKitPage() {
    return (
        <div className="ui-kit-page">
            <Tabs tabs={config} />
        </div>
    );
}
```
