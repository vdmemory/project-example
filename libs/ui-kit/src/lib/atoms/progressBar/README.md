# ProgressBar Component

> ProgressBar, which takes a list as a mandatory prop and returns a React ProgressBar component.

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
import { ProgressBar, ProgressBarType } from '@breef/ui-kit';

const config: ProgressBarType = ['Project', 'Agency', 'Company'];

export function UiKitPage() {
    return (
        <div className="ui-kit-page">
            <ProgressBar items={config} />
        </div>
    );
}
```
