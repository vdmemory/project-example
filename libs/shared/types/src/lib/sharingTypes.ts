import { AgenciesAdvantagesList } from './hookReviewTypes';
import { SocialNameEnum } from '@breef/shared/constants';

export type SharingResponseType = {
    id: number;
    is_shared: boolean;
    token: string;
};

export type GetIsSharingType = {
    id: number;
    isSharing: boolean;
    token: string;
};

export type IsSharingType = {
    isSharing: boolean;
    id: number;
    userType: 'client' | 'agency';
};

export type TeamMemberRequestType = {
    id: number;
    email: string;
    resend?: boolean;
};

export type Files = {
    id?: number | null;
    title: string;
    link: string;
    name?: string;
    url?: string;
};

export type FilesLinks = {
    id: number | string;
    name: string;
    url: string;
    thumbnail_url?: string;
};

export type TeamMembersResponseType = {
    id?: string;
    invites: {
        email: string;
        id: number;
        invitation_status: string;
        invitation_date: string;
        phone_number: string;
        first_name?: string | null;
        last_name?: string | null;
        company_position?: string | null;
    }[];
    invitations?: {
        email: string;
        id: number;
        invitation_date: string | null;
        invitation_status: string;
        phone_number: string | null;
        first_name: string | null;
        last_name: string | null;
        company_position: string | null;
    }[];
    team_members?: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        position: string;
    }[];
};

export type BrandLinksType = {
    id?: string | number | null;
    title: string;
    link: string;
    thumbnail?: string;
    type?: string;
    loading?: boolean;
};

export type FileType = {
    id: number | string;
    title: string;
    link: string;
    type?: string;
    loading?: boolean;
    thumbnail?: string;
};

export type LogoType = {
    id: number | null;
    name: string;
    url: string;
};

export type SocialLinkType = {
    title?: string;
    link?: string;
    handleDeleteLink: (idx: number) => void;
    handleOpenModal: (idx: number) => void;
    idx: number;
    className?: string;
};

export type SocialLinks = {
    id?: number;
    title: string;
    link: string;
    is_default?: boolean;
};

export type SocialLinkCreate = {
    id?: number;
    title: string;
    link: string | null;
    is_default?: boolean;
};

export type ListType = {
    id: number;
    title: string;
    link: string;
    type?: string;
    loading?: boolean;
};

export type AppAccessType = 'public' | 'private';

export type TypeField = 'text' | 'checkbox' | 'email' | 'password';

export type TypeButton = 'submit' | 'button';
export type PositionTypes = {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    zIndex: number;
};
export type Deliverables = {
    title: string;
    details: string;
    estimate?: number | null;
    estimation?: string;
    id?: number | null;
};

export type Objectives = {
    id?: number | null;
    name?: string;
    description?: string;
    is_default?: boolean;
};

export type ProjectInfoType = {
    name: string;
    companyLogoUrl: string | null | '';
    companyName: string;
    companyLocation: string;
    preferredLocation: string;
    clientDescription?: string;
    companyDescription: string;
    socialLinks: SocialLinks[];
    description: string;
    objectives: Objectives[];
    agenciesAdvantages: AgenciesAdvantagesList[];
    files: BrandLinksType[];
    miscNotes: string;
    miscNotesGif: string | null;
    status?: string;
};

export type SentimentType =
    | 'primary'
    | 'neutral'
    | 'positive'
    | 'negative'
    | 'attentive'
    | 'informative';

export type StatusTagType = {
    title: string;
    sentiment: SentimentType;
};

export type ChoiceType = {
    value: string;
    label: string;
};
export type PitchGuideFileRequest = {
    breef_pitch_guide_url: string;
};
export type PitchGuideFile = {
    breefPitchGuideUrl: string;
};
export type AppRoleType = 'client' | 'agency' | 'public';

export type ListTimezonesType = {
    value: string;
    label: string;
    group: string;
};

export type ObjectImageType = {
    id: number;
    name?: string;
    url: string;
};
