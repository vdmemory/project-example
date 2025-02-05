# Switch Component

> Switch

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    label: string;
    isOn: boolean;
    onToggle: () => void;
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Switch } from '@breef/ui-kit';
import { useState } from 'react';

export function UiKitPage() {
    const [checked, setChecked] = useState<boolean>(false);

    const handleToggle = () => {
        setChecked(prev => !prev);
    };

    <Switch label="Use Switcher" isOn={checked} onToggle={handleToggle} />;
}
```
