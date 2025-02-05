# Textarea Component

> A Textarea that takes label text and onChange as a mandatory prop and returns a React Textarea component

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    value: string;
    onChange: (value: string) => void;
    onBlur?: (value: string) => void;
    onFocus?: () => void;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    maxLength?: number;
    className?: string;
    autoSize?: boolean;
    rows?: number;
    direction?: DirectionType;
    hideNumberCharacters?: boolean;
    isAutoHeightArea?: boolean;
}
```

### _<span style="color: #9f4a19">Default Props:</span>_

```typescript
{
    placeholder = 'Enter text here...',
    maxLength = 500,
    disabled = false,
    readOnly = false,
    rows = 5,
    direction = 'left',
    autoSize = false,
    hideNumberCharacters = false,
    isAutoHeightArea = false,
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Textarea } from '@breef/ui-kit';

export function UiKitPage() {
    const [value, setValue] = useState('');

    const handleChange = (value: string) => {
        setValue(value);
    };

    return (
        <div className="ui-kit-page">
            <Textarea value={value} onChange={handleChange} />
        </div>
    );
}
```
