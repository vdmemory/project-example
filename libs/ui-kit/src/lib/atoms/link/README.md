# Button Component

> link, has no required parameters, and returns a React HTMLAnchorElement component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    variant?: 'standalone' | 'inline' | 'button';
    size?: 'medium' | 'small';
    iconLeftArrow?: boolean;
    iconRightArrow?: boolean;
    isDisabled?: boolean;

}
```

### _<span style="color: #9f4a19">Default Props:</span>_

```typescript
{
    variant = 'standalone';
    size = 'medium';
    iconLeftArrow = false;
    iconRightArrow = false;
    isDisabled = false;
}
```

### _<span style="color: #9f4a19">Example:</span>_

````typescript
import { LinkUi } from '@breef/ui-kit';

export function UiKitPage() {
    return ```
        <div className="ui-kit-page">
             <LinkUi
                href={'https://tinypng.com/'}
                title="Link"
                target="_blank"
                variant="inline"
                iconLeftArrow
                iconRightArrow
                isDisabled={true}
            />
        </div>
        ```;
}
````
