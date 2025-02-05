# Pill Component

> A Pill that takes label text and onChange as a mandatory prop and returns a React Pill component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    label: string;
    name?: string;
    iconSide?: IconSide;
    onChange: () => void;
    disabled?: boolean;
    checked?: boolean;
    type?: InputType;
    isUppercase?: boolean;
}
```

### _<span style="color: #9f4a19">Default Props:</span>_

```typescript
{
    iconSide = 'none',
    isUppercase = false,
    type = 'button',
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Pill } from '@breef/ui-kit';

export function UiKitPage() {
    return (
        <div className="ui-kit-page">
            <Pill label="Label" onChange={() => console.log('click!')} />
        </div>
    );
}
```
