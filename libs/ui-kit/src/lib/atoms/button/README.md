# Button Component

> A Button that takes label text as a mandatory prop and returns a React Button component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    type?: 'button' | 'submit' | 'reset';
    variant?: VariantButton;
    size?: SizeButton;
    className?: string;
    label: string;
    onClick?: () => void;
    isSubmitted?: boolean;
    isDisabled?: boolean;
    isUppercase?: boolean;
    icon?: ReactNode;
    iconPlacement?: IconPlacement;
    isAbsoluteIconPosition?: boolean;
}
```

### _<span style="color: #9f4a19">Default Props:</span>_

```typescript
{
    (isDisabled = false), (isSubmitted = false), (iconPlacement = 'both'), (type = 'button');
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Button } from '@breef/ui-kit';

export function UiKitPage() {
    return (
        <div className="ui-kit-page">
            <Button label="Click Me" onClick={() => console.log('click!')} />
        </div>
    );
}
```
