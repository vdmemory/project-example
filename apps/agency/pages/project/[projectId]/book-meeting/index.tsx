import {
    ProjectAvailability,
    sliceActions,
} from '@breef/shared/feature-project-availability';
import { useAppDispatch } from '../../../../hooks/store';
import moment from 'moment';
import { useEffect } from 'react';
import { useMediaContext } from '@breef/shared/hooks';
import { withDynamicPathIds } from '../../../../hoc/withDynamicPathIds';

function BookMeetingPage() {
    moment.locale('en');
    const dispatch = useAppDispatch();
    const { isMaxMobile } = useMediaContext();

    useEffect(() => {
        dispatch(sliceActions.setMobileOrientation(isMaxMobile));
        // return () => {
        //     dispatch(sliceActions.resetAvailability());
        // };
    }, [dispatch, isMaxMobile]);

    return <ProjectAvailability />;
}

export default withDynamicPathIds(BookMeetingPage, ['projectId']);
