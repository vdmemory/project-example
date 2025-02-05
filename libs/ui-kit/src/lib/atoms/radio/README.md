# Radio Component

> an Radio that takes an onChange function as a required prop and returns a React HTMLInputElement component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: 'default' | 'error';
    label?: string;
    checked?: boolean;
}
```

### _<span style="color: #9f4a19">Default Props:</span>_

```typescript
{
    variant = 'default',
    disabled = false,
    checked = false,
}
```

### _<span style="color: #9f4a19">Example:</span>_

````typescript
import { Radio } from '@breef/ui-kit';

export function UiKitPage() {
    const [selected, setSelected] = useState('1');

    const onChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.value);
    };
    return ```
        <div className="ui-kit-page">
           <Radio
                onChange={onChangeRadio}
                label="radio default"
                value={1}
                checked={selected === '1'}
            />
            <Radio
                onChange={onChangeRadio}
                label="radio error"
                variant="error"
                value={2}
                checked={selected === '2'}
                disabled={true}
            />
        </div>
        ```;
}
````
