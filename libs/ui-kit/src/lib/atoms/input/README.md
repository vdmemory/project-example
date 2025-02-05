# Input Component

> An Input that takes value and onChange as a mandatory prop and returns a React Input component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    id?: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onCLick?: () => void;
    placeholder?: string;
    descriptiveText?: string;
    disabled?: boolean;
    error?: string;
    inputDirection?: InputDirection;
    isDollarSymbol?: boolean;
    isPercentSymbol?: boolean;
    isSearchIcon?: boolean;
    isWarningIcon?: boolean;
    isRemovable?: boolean;
    showChip?: boolean;
    selectedList?: SelectedItemType[];
    onChangeSelect?: (item: SelectedItemType[]) => void;
    readOnly?: boolean;
    children?: ReactNode;
    maxLength?: number;
    className?: string;
    isLoading?: boolean;
    isVisibleCounter?: boolean;
}
```

### _<span style="color: #9f4a19">Default Props:</span>_

```typescript
{
     inputDirection = 'left',
    isDollarSymbol = false,
    isPercentSymbol = false,
    isSearchIcon = false,
    isWarningIcon = false,
    isRemovable = false,
    selectedList = [],
    maxLength = 200,
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Input } from '@breef/ui-kit';

export function UiKitPage() {
    return (
        <div className="ui-kit-page">
            <Input value="value" onChange=((event) => setValue(event.target.value)) />
        </div>
    );
}
```
