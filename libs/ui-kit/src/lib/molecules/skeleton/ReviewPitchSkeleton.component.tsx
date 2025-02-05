import { useMediaContext } from '@breef/shared/hooks';
import { AnimatePresence } from 'framer-motion';
import { SkeletonWrapper, Skeleton, Shimmer } from '../../atoms';
import {
    SkeletonBox,
    SkeletonLine,
    SkeletonRow,
} from '../../atoms/skeleton/Skeleton.component';

const ReviewPitchSkeleton = () => {
    const { isMobile } = useMediaContext();

    return (
        <SkeletonWrapper>
            <SkeletonRow h="112px">
                {!isMobile && (
                    <SkeletonBox h="100%">
                        <Skeleton type="avatar" w={'80px'} h={'80px'} />
                    </SkeletonBox>
                )}
                <SkeletonBox h="100%" f={1}>
                    <Skeleton type="title" />
                    <Skeleton type="text" />
                    <Skeleton type="text" />
                </SkeletonBox>
                <SkeletonBox h="100%" w="114px">
                    <Skeleton type="text" />
                    <Skeleton type="text" />
                    <Skeleton type="text" />
                </SkeletonBox>
            </SkeletonRow>

            <SkeletonRow>
                <SkeletonBox h="100%" f={1}>
                    <Skeleton type="title" />
                    <Skeleton type="half-text" />
                    <Skeleton type="half-text" />
                    <Skeleton type="half-text" />
                    <SkeletonLine />
                    <Skeleton type="thumbnail" w={'30px'} h={'16px'} />
                </SkeletonBox>
            </SkeletonRow>

            <SkeletonRow>
                <SkeletonBox h="100%" f={1}>
                    <Skeleton type="title" />
                    <Skeleton type="half-text" />
                    <Skeleton type="half-text" />
                    <Skeleton type="half-text" />
                </SkeletonBox>
            </SkeletonRow>

            <SkeletonRow>
                <SkeletonBox h="100%" f={1}>
                    <Skeleton type="title" />
                    <Skeleton type="half-text" />
                    <Skeleton type="half-text" />
                    <SkeletonLine />
                    <Skeleton type="half-text" />
                    <Skeleton type="half-text" />
                </SkeletonBox>
            </SkeletonRow>

            <Shimmer />
        </SkeletonWrapper>
    );
};

const Wrapper = () => {
    return (
        <AnimatePresence>
            <ReviewPitchSkeleton />
        </AnimatePresence>
    );
};

export {
    Wrapper as ReviewPitchSkeleton,
    ReviewPitchSkeleton as ReviewPitchSkeletonComponent,
};
