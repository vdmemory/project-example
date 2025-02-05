# Range Component

> an Range that takes an onChange function as a required prop and returns a React HTMLInputElement component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript

type ListType = {
    value: string;
    name: string;
};

{
    label?: string;
    list: ListType[];
    value: string;
    onChange: (value: string) => void;
    onChangeComment?: (value: string) => void;
    startTip?: string;
    endTip?: string;
    isVisibleComment?: boolean;
    comment?: string;
}
```

### _<span style="color: #9f4a19">Example:</span>_

```typescript
import { Radio } from '@breef/ui-kit';

const list = [
    {
        value: '1',
        name: 'First',
    },
];

export function UiKitPage() {
    const [value, setValue] = useState<string | null>(props.value);
    const onChange = (val: string) => setValue(val);

    return (
        <div className="ui-kit-page">
            <Range value={value} onChange={onChange} list={list} />
        </div>
    );
}
```
