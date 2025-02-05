import { checkPhoneNumberError } from './checksPhoneNumber';
import { getLinkDownloadContracts } from './getLinkDownloadContracts';
import { modifyHandleChangeField } from './modifyHandleChangeField';
import {
    capitalizeFirstLetter,
    keyWordsReplacer,
    limitSymbols,
    replaceExtraBreakSpaces,
    stringMask,
    formatTemplateToText,
    urlToDefaultFormat,
} from './stringTransformFunctions';

describe('Utils', () => {
    describe('checkPhoneNumberError', () => {
        const onValidCallback = jest.fn();
        const onErrorCallback = jest.fn();
        it('should call success callback on valid number', () => {
            checkPhoneNumberError(
                '+380501234567',
                onErrorCallback,
                onValidCallback,
            );
            expect(onValidCallback).toBeCalled();
        });
        it('should call error callback on invalid number', () => {
            checkPhoneNumberError(
                '+888888888888',
                onErrorCallback,
                onValidCallback,
            );
            expect(onErrorCallback).toBeCalled();
        });
    });

    describe('getLinkDownloadContracts', () => {
        it('should return correct download link', () => {
            const expectResult =
                'hostname/api/projects/1/kick-off/contracts?access_token=&file_id=2';
            const result = getLinkDownloadContracts({
                projectId: '1',
                hostName: 'hostname',
                fileId: '2',
            });
            expect(result).toEqual(expectResult);
        });
        it('should return correct download link with no file id prop', () => {
            const expectResult =
                'hostname/api/projects/1/kick-off/contracts?access_token=';
            const result = getLinkDownloadContracts({
                projectId: '1',
                hostName: 'hostname',
            });
            expect(result).toEqual(expectResult);
        });
    });

    describe('modifyHandleChangeField', () => {
        const mockOnChange = jest.fn();
        const mockCleanFieldError = jest.fn();

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return a function that modifies the input value according to the provided mask', () => {
            const mask = 'phoneNumber';
            const modifiedValue = '12-3456';
            const event = { target: { value: '123456' } };
            const modifiedOnChange = modifyHandleChangeField(
                { mask },
                mockOnChange,
                mockCleanFieldError,
            );

            modifiedOnChange(event);

            expect(mockCleanFieldError).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledWith(modifiedValue);
        });

        it('should return a function that trims whitespace from the input value when `removeBreakSpaces` is set to "all"', () => {
            const maxLength = 10;
            const inputString = '    hello world    ';
            const expectedOutput = 'hello world';
            const event = { target: { value: inputString } };
            const modifiedOnChange = modifyHandleChangeField(
                { maxLength, removeBreakSpaces: 'all' },
                mockOnChange,
                mockCleanFieldError,
            );

            modifiedOnChange(event);

            expect(mockCleanFieldError).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledWith(expectedOutput);
        });

        it('should return a function that removes extra spaces from the input value when `removeBreakSpaces` is set to "partially"', () => {
            const maxLength = 10;
            const inputString = '   hello  world    ';
            const expectedOutput = 'hello world ';
            const event = { target: { value: inputString } };
            const modifiedOnChange = modifyHandleChangeField(
                { maxLength, removeBreakSpaces: 'partially' },
                mockOnChange,
                mockCleanFieldError,
            );

            modifiedOnChange(event);

            expect(mockCleanFieldError).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledWith(expectedOutput);
        });

        it('should return a function that removes extra spaces from the input value unknown', () => {
            const event = { target: { value: '' } };
            const modifiedOnChange = modifyHandleChangeField(
                {},
                mockOnChange,
                mockCleanFieldError,
            );

            modifiedOnChange(event);

            expect(mockCleanFieldError).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('capitalizeFirstLetter', () => {
        it('should capitalize the first letter of a string', () => {
            expect(capitalizeFirstLetter('hello world')).toEqual('Hello world');
            expect(capitalizeFirstLetter('HELLO WORLD')).toEqual('HELLO WORLD');
            expect(capitalizeFirstLetter('')).toEqual('');
        });
    });

    describe('replaceExtraBreakSpaces', () => {
        it('should remove extra spaces from a string', () => {
            expect(replaceExtraBreakSpaces('  hello  world  ')).toEqual(
                'hello world ',
            );
            expect(replaceExtraBreakSpaces('')).toEqual('');
        });
    });

    describe('limitSymbols', () => {
        it('should limit a string to a certain number of characters', () => {
            expect(limitSymbols(5, 'hello world')).toEqual('hello');
            expect(limitSymbols(0, 'hello world')).toEqual('');
            expect(limitSymbols(11, 'hello world')).toEqual('hello world');
            expect(limitSymbols(5, 'hello world', true)).toEqual('hello...');
        });
    });

    describe('stringMask', () => {
        it('should apply a mask to a string based on a given type', () => {
            expect(stringMask('phoneNumber', '1234567890')).toEqual(
                '12-3456 7890',
            );
            expect(stringMask('', 'hello world')).toEqual('hello world');
        });
    });

    describe('keyWordsReplacer', () => {
        it('should replace a keyword in a string with a corresponding value', () => {
            const keywords = { name: 'Alice' };
            expect(keyWordsReplacer('Hello {name}!', keywords)).toEqual(
                'Hello Alice!',
            );
            expect(keyWordsReplacer('', keywords)).toEqual('');
            expect(keyWordsReplacer('Hello {unknown}!', keywords)).toEqual(
                'Hello {unknown}!',
            );
        });
    });

    describe('urlToDefaultFormat', () => {
        it('returns the URL with "https://" prefix if not present', () => {
            const inputUrl = 'example.com';
            const outputUrl = urlToDefaultFormat(inputUrl);
            expect(outputUrl).toBe('https://example.com');
        });

        it('does not modify the URL if "https://" prefix is already present', () => {
            const inputUrl = 'https://example.com';
            const outputUrl = urlToDefaultFormat(inputUrl);
            expect(outputUrl).toBe(inputUrl);
        });

        it('does not modify the URL if "http://" prefix is already present', () => {
            const inputUrl = 'http://example.com';
            const outputUrl = urlToDefaultFormat(inputUrl);
            expect(outputUrl).toBe(inputUrl);
        });

        it('does not modify the URL if it does not match the URL pattern', () => {
            const inputUrl = 'not a valid URL';
            const outputUrl = urlToDefaultFormat(inputUrl);
            expect(outputUrl).toBe(inputUrl);
        });
    });

    describe('formatTemplateToText', () => {
        it('removes template placeholders enclosed in brackets', () => {
            const inputText = 'Hello {name}, welcome to {place}!';
            const outputText = formatTemplateToText(inputText);
            expect(outputText).toBe('Hello name, welcome to place!');
        });

        it('removes template placeholders preceded by dollar sign', () => {
            const inputText = 'Hello $name, welcome to $place!';
            const outputText = formatTemplateToText(inputText);
            expect(outputText).toBe('Hello name, welcome to place!');
        });

        it('does not modify the text if there are no template placeholders', () => {
            const inputText = 'Hello world!';
            const outputText = formatTemplateToText(inputText);
            expect(outputText).toBe(inputText);
        });
    });
});
