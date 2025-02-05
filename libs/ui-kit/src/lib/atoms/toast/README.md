# Toast Component

> A Toast that takes title and content as a mandatory prop and returns a React Button component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    title: string;
    content: string;
    icon?: ReactNode;
    linkUrl?: string;
    linkText?: string;
    sentiment?: ToastSentimentType;
    autoClose?: number;
    closeToast?: () => void;
}
```

### _<span style="color: #9f4a19">Default Props:</span>_

```typescript
{
    sentiment = 'neutral',
    autoClose = 5000,
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Toast } from '@breef/ui-kit';
import { toast, ToastOptions } from 'react-toastify';

export function UiKitPage() {
    const options: ToastOptions = {};
    const toastCaller = () => toast(props => <Toast title="Title" content="Text Content" {...props} />, options);

    return (
        <div className="ui-kit-page">
            <button onClick={toastCaller}>click me</button>
        </div>
    );
}
```
