# Tabs Component

> DropDown, which takes a list as a mandatory prop and returns a React DropDown component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
type Option = {
    value: string;
    label: string;
};

{
    onSelect?: (selectedOption: string) => void;
    value?: string;
    options: Option[];
    error?: string;
    isSearchable?: boolean;
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { DropDown } from '@breef/ui-kit';

const list = [
    {
        value: 'first',
        label: 'first field',
    },
    {
        value: 'last',
        label: 'last field',
    },
];

export function UiKitPage() {
    return (
        <div className="ui-kit-page">
            <DropDown options={list} value={'first field'} />
        </div>
    );
}
```
