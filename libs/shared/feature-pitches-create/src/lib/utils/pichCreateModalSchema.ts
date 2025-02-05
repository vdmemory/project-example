import * as yup from 'yup';

export const pitchCreateModalSchema = yup.object().shape({
    accept: yup.boolean().required().oneOf([true], 'Field must be checked'),
});
