# Button Component

> an Checkbox that takes an onChange function as a required prop and returns a React HTMLInputElement component.

### _<span style="color: #9f4a19">List of props:</span>_

```typescript
{
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: 'default' | 'error';
    label?: string;
    indeterminate?: boolean;
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
import { Checkbox } from '@breef/ui-kit';

export function UiKitPage() {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (checked1 !== checked2) {
            setChecked1(true);
            setChecked2(true);
        } else if (checked1 && checked2) {
            setChecked1(false);
            setChecked2(false);
        } else {
            setChecked1(true);
            setChecked2(true);
        }
    };
    const onChangeCheckbox1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked1(event.target.checked);
    };
    const onChangeCheckbox2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked2(event.target.checked);
    };
    return ```
        <div className="ui-kit-page">
            <Checkbox 
                onChange={onChangeCheckbox} 
                variant="default" 
                label="my checkbox indeterminate" 
                checked={checked1 && checked2} 
                indeterminate={checked1 !== checked2}>
                    <Checkbox 
                        onChange={onChangeCheckbox1} 
                        variant="error" 
                        label="my checkbox error" 
                        checked={checked1} />
                    <Checkbox 
                        onChange={onChangeCheckbox2} 
                        variant="default" 
                        label="my checkbox default" 
                        checked={checked2} />
                        disabled={true}
            </Checkbox>
        </div>
        ```;
}
````
