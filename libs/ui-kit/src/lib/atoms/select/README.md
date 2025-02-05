# Select Component

> A Select that takes id, label, list and onChange as a mandatory prop and returns a React Select component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    id: string;
    labelId?: string;
    label: string;
    value?: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    list: ListItem[];
    error?: string;
    isOptional?: boolean;
    disabled?: boolean;
    isSearchable?: boolean;
    isSearchIcon?: boolean;
    className?: string;
}
```

### _<span style="color: #9f4a19">Default Props:</span>_

```typescript
{
    isOptional = false,
    isSearchable = false,
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Button } from '@breef/ui-kit';

export function UiKitPage() {
    return (
        <div className="ui-kit-page">
            <Select id="select-1" label="Label" list={[{value: '1', label: 'item 1'}]} onChange=((value) => setValue(value)) />
        </div>
    );
}
```
