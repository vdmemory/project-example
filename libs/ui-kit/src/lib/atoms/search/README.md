# Search Component

> Search, which takes a list as a mandatory prop and returns a React Search component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    items: ItemListType[];
    className?: string;
    active?: number | null;
    completed?: number | null;
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Search, ItemListType } from '@breef/ui-kit';

const config: ItemListType = [
    {
        id: 1,
        name: 'Affiliate Marketing',
    },
    {
        id: 2,
        name: 'Digital Marketing',
    },
    {
        id: 3,
        name: 'Email Marketing',
    },
    {
        id: 4,
        name: 'Social Media Marketing',
    },
];

export function UiKitPage() {
    return (
        <div className="ui-kit-page">
            <Search list={config} />
        </div>
    );
}
```
