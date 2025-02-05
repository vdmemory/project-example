import { AnimatePresence } from 'framer-motion';
import { SkeletonWrapper, Skeleton, Shimmer } from '../../atoms';
import {
    SkeletonBox,
    SkeletonLine,
    SkeletonRow,
} from '../../atoms/skeleton/Skeleton.component';

const BoxInfoSkeleton = () => {
    return (
        <SkeletonWrapper>
            <SkeletonRow>
                <SkeletonBox h="100%" w="100%">
                    <Skeleton type="text" />
                    <SkeletonLine />
                    <SkeletonRow>
                        <Skeleton type="avatar" w={'30px'} h={'30px'} />
                        <Skeleton type="title" />
                    </SkeletonRow>
                    <SkeletonLine />
                    <Skeleton type="half-text" />
                    <Skeleton type="half-text" />
                    <Skeleton type="half-text" />
                    <SkeletonLine />
                    <SkeletonRow>
                        <Skeleton type="avatar" w={'70px'} h={'70px'} />
                        <Skeleton type="title" />
                    </SkeletonRow>
                </SkeletonBox>
            </SkeletonRow>

            <Shimmer />
        </SkeletonWrapper>
    );
};

const Wrapper = () => {
    return (
        <AnimatePresence>
            <BoxInfoSkeleton />
        </AnimatePresence>
    );
};

export {
    Wrapper as BoxInfoSkeleton,
    BoxInfoSkeleton as BoxInfoSkeletonComponent,
};
