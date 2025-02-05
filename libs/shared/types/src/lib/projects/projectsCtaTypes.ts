import { ReactNode } from 'react';
import {
    DashboardAgencyActionStatuses,
    DashboardClientActionStatuses,
    ProjectAgencyActionStatuses,
    ProjectClientActionStatuses,
} from '@breef/shared/constants';

export type MetadataType = {
    projectId?: number;
    pitchId?: number | null;
    paymentId?: number | null;
    kickoffId?: number | null;
};

type ActionButtonConfigType = {
    text: string | ReactNode;
    tag?: string;
    nextStep?: string;
    description?: string;
    descriptionSubtext?: string;
    descriptionMore?: string;
    brandLeadText?: string;
    onClick?: (meta: MetadataType) => void;
    imageConfig?: {
        imageUrl: string;
        position: {
            top?: number;
            bottom?: number;
            right?: number;
        };
    };
    isAccessDenied?: boolean;
};

type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

export type clientActionButtonCtaStatusesType = PartialRecord<
    keyof typeof DashboardClientActionStatuses,
    ActionButtonConfigType
>;
export type agencyActionButtonCtaStatusesType = PartialRecord<
    keyof typeof DashboardAgencyActionStatuses,
    ActionButtonConfigType
>;

export type clientProjectActionButtonStatusesType = PartialRecord<
    keyof typeof ProjectClientActionStatuses,
    ActionButtonConfigType
>;
export type agencyProjectActionButtonStatusesType = PartialRecord<
    keyof typeof ProjectAgencyActionStatuses,
    ActionButtonConfigType
>;
