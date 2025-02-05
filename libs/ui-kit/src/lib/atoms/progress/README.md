# Progress Component

> Progress, which takes a list as a mandatory prop and returns a React Progress component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    items: ProgressBarType;
    className?: string;
    active?: number | null;
    completed?: number | null;
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Progress, ProgressType } from '@breef/ui-kit';

const config: ProgressType = ['Project Scope', 'Review Pitches', 'Select Agency'];

export function UiKitPage() {
    return (
        <div className="ui-kit-page">
            <Progress items={config} />
        </div>
    );
}
```
