import { getCamelCase } from '@breef/shared/utils';
import { updateKeyFromForm } from './transformSignUpErrors';

describe('updateKeyFromForm', () => {
    it("should return 'email' if the key parameter is 'detail'", () => {
        expect(updateKeyFromForm('detail')).toBe('email');
    });

    it("should return 'email' if the key parameter is 'non_field_errors'", () => {
        expect(updateKeyFromForm('non_field_errors')).toBe('email');
    });

    it('should return the cammel case of any other string', () => {
        expect(updateKeyFromForm('userName')).toBe('userName');
    });

    it('should call getCamelCase method if the key parameter is something else', () => {
        const mock = jest.fn().mockImplementationOnce(getCamelCase);
        expect(mock('userName')).toBe('userName');
        expect(mock).toHaveBeenCalledWith('userName');
    });
});
