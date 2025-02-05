import { AnimatePresence } from 'framer-motion';
import { SkeletonWrapper, Skeleton, Shimmer } from '../../atoms';
import {
    SkeletonBox,
    SkeletonLine,
    SkeletonRow,
} from '../../atoms/skeleton/Skeleton.component';

const DashboardSkeleton = () => {
    return (
        <SkeletonWrapper>
            <SkeletonRow>
                <SkeletonBox transparent h="100%" w="100%">
                    <SkeletonRow>
                        <Skeleton type="avatar" w="30px" h="30px" />
                        <Skeleton type="title" h="12px" w="100px" />
                    </SkeletonRow>
                    <SkeletonLine />
                    <Skeleton type="title" h="16px" w="300px" />
                    <Skeleton type="title" h="12px" w="200px" />
                    <SkeletonLine />
                    <SkeletonLine />
                </SkeletonBox>
            </SkeletonRow>

            <Shimmer />
        </SkeletonWrapper>
    );
};

const Wrapper = () => {
    return (
        <AnimatePresence>
            <DashboardSkeleton />
        </AnimatePresence>
    );
};

export {
    Wrapper as DashboardSkeleton,
    DashboardSkeleton as DashboardSkeletonComponent,
};
