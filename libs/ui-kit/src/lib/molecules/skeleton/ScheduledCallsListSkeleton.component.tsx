import { useMediaContext } from '@breef/shared/hooks';
import { AnimatePresence } from 'framer-motion';
import { SkeletonWrapper, Skeleton, Shimmer } from '../../atoms';
import {
    SkeletonBox,
    SkeletonLine,
    SkeletonRow,
} from '../../atoms/skeleton/Skeleton.component';

const ScheduledCallsListSkeleton = () => {
    const { isMobile } = useMediaContext();

    if (isMobile) {
        return (
            <SkeletonWrapper>
                <SkeletonBox h="100%" f={1}>
                    <SkeletonRow>
                        <Skeleton type="avatar" w="60px" h="60px" />
                        <SkeletonBox h="100%" f={1} transparent>
                            <Skeleton type="title" />
                            <Skeleton type="text" />
                        </SkeletonBox>
                    </SkeletonRow>
                    <SkeletonLine w="25%" />
                    <SkeletonRow>
                        <SkeletonLine m="auto" />
                        <Skeleton type="thumbnail" h="14px" w="120px" />
                        <Skeleton type="thumbnail" h="30px" w="120px" />
                    </SkeletonRow>
                </SkeletonBox>
                <Shimmer />
            </SkeletonWrapper>
        );
    }

    return (
        <SkeletonWrapper>
            <SkeletonBox h="100%" f={1}>
                <SkeletonRow h="62px">
                    <Skeleton type="avatar" w="60px" h="60px" />
                    <SkeletonBox p="0" h="100%" w="300px" transparent>
                        <Skeleton type="title" />
                        <Skeleton type="text" />
                    </SkeletonBox>
                    <SkeletonLine w="25%" />
                    <Skeleton type="text" w="200px" />
                    <SkeletonLine w="25%" />
                    <Skeleton type="thumbnail" h="14px" w="120px" />
                    <Skeleton type="thumbnail" h="30px" w="120px" />
                </SkeletonRow>
            </SkeletonBox>
            <Shimmer />
        </SkeletonWrapper>
    );
};

const Wrapper = () => {
    return (
        <AnimatePresence>
            <ScheduledCallsListSkeleton />
        </AnimatePresence>
    );
};

export {
    Wrapper as ScheduledCallsListSkeleton,
    ScheduledCallsListSkeleton as ScheduledCallsListSkeletonComponent,
};
