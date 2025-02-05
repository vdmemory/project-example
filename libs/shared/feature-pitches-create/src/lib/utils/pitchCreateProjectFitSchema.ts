import { getRequiredMessage } from '@breef/shared/utils';
import * as yup from 'yup';

export const pitchCreateProjectFitSchema = yup.object().shape({
    projectScope: yup.string().required(getRequiredMessage('Project Scope')),
    experience: yup.string().required(getRequiredMessage('Experience')),
    clientFit: yup.string().required(getRequiredMessage('Overall Fit')),
    noteToBreef: yup.string().max(1000),
});
