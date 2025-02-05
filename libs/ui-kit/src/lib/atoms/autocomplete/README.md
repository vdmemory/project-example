# Autocomplete Component

> An Autocomplete that takes onChange as a mandatory prop and returns a React Autocomplete component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    placeholder?: string;
    value?: string;
    onClick: (
        id: number,
        name: string,
        address?: TransformAddressType,
        error?: string,
    ) => void;
    onBlur?: () => void;
    returnedFormat?: ReturnFormatType;
    error?: string;
}
```

### _<span style="color: #9f4a19">Default Props:</span>_

```typescript
{
    returnedFormat = 'city-country',
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Autocomplete } from '@breef/ui-kit';

export function UiKitPage() {
    return (
        <div className="ui-kit-page">
            <Autocomplete onClick={(id, name) => setAddress(name)} />
        </div>
    );
}
```
