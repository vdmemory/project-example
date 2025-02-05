# ButtonRound Component

> A ButtonRound that takes label text as a mandatory prop and returns a React ButtonRound component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    type?: 'button' | 'submit' | 'reset';
    variant?: VariantButton;
    size?: SizeButton;
    className?: string;
    onClick: () => void;
    isDisabled?: boolean;
}
```

### _<span style="color: #9f4a19">Default Props:</span>_

```typescript
{
    type = 'button';
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { ButtonRound } from '@breef/ui-kit';

export function UiKitPage() {
    return (
        <div className="ui-kit-page">
            <ButtonRound onClick={() => console.log('click!')} />
        </div>
    );
}
```
