import { PitchesMakeIntro as PitchesMakeIntroClient } from './lib/components/client/pitches/pitchesMakeIntro/PitchesMakeIntro';
import { ReviewPitches as ReviewPitchesClient } from './lib/components/client/pitches/reviewPitches/ReviewPitches';
import { PitchesList as PitchesListClient } from './lib/components/client/pitches/pitchesList/PitchesList';
import { PitchesCards as PitchesCardsClient } from './lib/components/client/pitches/pitchesList/PitchesList';
import { PaymentsClient } from './lib/components/client/payments/PaymentsClient';
import { ProjectScopeClient } from './lib/components/client/projectScope/ProjectScopeClient';
import Dashboard from './lib/components/Dashboard';
import { getTabsConfig } from './lib/components/tabsConfig';

export {
    default as dashboardReducer,
    sliceActions,
} from './lib/store/dashboardSlice';
export { useDashboardSelector, useDashboardActions } from './lib/store/hooks';
export {
    mockClientBrandLead,
    mockAgencyPitch,
    mockAgenciesList,
    mockMakeIntroList,
} from './lib/store/mockDataToTest';
export {
    Dashboard,
    getTabsConfig,
    PitchesMakeIntroClient,
    ReviewPitchesClient,
    ProjectScopeClient,
    PitchesListClient,
    PitchesCardsClient,
    PaymentsClient,
};
