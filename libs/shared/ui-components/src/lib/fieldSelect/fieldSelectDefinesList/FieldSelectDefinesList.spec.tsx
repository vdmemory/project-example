import { render } from '@testing-library/react';
import FieldSelectDefinesList from './FieldSelectDefinesList';
import { useGetList } from '@breef/shared/hooks';

jest.mock('@breef/shared/hooks', () => ({
    useGetList: jest.fn(),
}));

describe('FieldSelectDefinesList Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders FieldSelect with correct props and list', () => {
        const mockList = [
            { value: 'value1', label: 'Label 1' },
            { value: 'value2', label: 'Label 2' },
        ];
        (useGetList as jest.Mock).mockReturnValue(mockList);

        const onClick = jest.fn();
        const onChange = jest.fn();

        render(
            <FieldSelectDefinesList
                value="value1"
                onClick={onClick}
                onChange={onChange}
                listType="exampleList"
            />,
        );

        expect(useGetList).toHaveBeenCalledWith('exampleList');
        expect(onChange).toHaveBeenCalledTimes(0);
    });
});
