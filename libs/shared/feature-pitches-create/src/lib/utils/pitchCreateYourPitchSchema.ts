import {
    getMaxLengthMessage,
    getMinLengthMessage,
    getRequiredMessage,
} from '@breef/shared/utils';
import * as yup from 'yup';

const budgetCommentSchema = yup
    .string()
    .min(25, getMinLengthMessage('Budget range note', 25))
    .max(500)
    .nullable()
    .transform(value => (value ? value : null));

export const pitchCreateYourPitchSchema = yup.object().shape({
    pitchDetails: yup
        .string()
        .required(getRequiredMessage('Message from the team'))
        .min(50, getMinLengthMessage('Message from the team', 50))
        .max(1000, getMaxLengthMessage('Message from the team', 1000)),
    approach: yup.object({
        description: yup
            .string()
            .required(getRequiredMessage('Approach'))
            .min(50, getMinLengthMessage('Approach', 50))
            .max(2500, getMaxLengthMessage('Approach', 2500)),
        links: yup
            .array()
            .of(
                yup.object({
                    title: yup.string(),
                    link: yup.string(),
                }),
            )
            .max(3),
    }),
    budget: yup.object().shape(
        {
            value: yup.string().required(getRequiredMessage('Budget')),

            comment: yup.string().when('value', {
                is: (value: string) => value === 'outside_range',
                then: budgetCommentSchema.required(
                    getRequiredMessage('Budget range note'),
                ),
                otherwise: budgetCommentSchema,
            }),
        },
        [['value', 'comment']],
    ),
    uniqueThings: yup
        .array()
        .of(yup.object({ id: yup.number(), name: yup.string() }))
        .max(10),
});
