import { useMediaContext } from '@breef/shared/hooks';
import { AnimatePresence } from 'framer-motion';
import { SkeletonWrapper, Skeleton, Shimmer } from '../../atoms';
import {
    SkeletonBox,
    SkeletonLine,
    SkeletonRow,
} from '../../atoms/skeleton/Skeleton.component';

const IntroCallAvailabilitySkeleton = () => {
    const { isMobile } = useMediaContext();

    if (isMobile) {
        return (
            <SkeletonWrapper>
                <SkeletonBox h="100%" f={1} p="2.4rem">
                    <Skeleton type="title" w="50%" />
                    <Skeleton type="text" w="90%" />
                    <Skeleton type="text" w="40%" />
                    <SkeletonLine />
                    <SkeletonLine />
                    <SkeletonLine />
                    <SkeletonBox h="100%" f={1.2} p="0" transparent>
                        <Skeleton type="text" w="40%" />
                        <Skeleton type="thumbnail" h="30px" w="100%" />
                    </SkeletonBox>
                    <SkeletonLine w="6%" />
                    <SkeletonBox h="100%" f={0.8} p="0" transparent>
                        <Skeleton type="text" w="40%" />
                        <Skeleton type="thumbnail" h="30px" w="100%" />
                    </SkeletonBox>
                    <SkeletonLine />
                    <SkeletonLine />
                    <SkeletonLine />
                    <SkeletonBox h="100%" f={1.2} p="0" transparent>
                        <Skeleton type="text" w="40%" />
                        <SkeletonBox h="100%" f={1}>
                            <Skeleton type="text" w="50%" />
                        </SkeletonBox>
                        <SkeletonBox h="100%" f={1}>
                            <Skeleton type="text" w="50%" />
                        </SkeletonBox>
                        <SkeletonBox h="100%" f={1}>
                            <Skeleton type="text" w="50%" />
                        </SkeletonBox>
                    </SkeletonBox>
                </SkeletonBox>
                <Shimmer />
            </SkeletonWrapper>
        );
    }

    return (
        <SkeletonWrapper>
            <SkeletonBox h="100%" f={1} p="2.4rem">
                <Skeleton type="title" w="30%" />
                <Skeleton type="text" w="80%" />
                <Skeleton type="text" w="20%" />
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonRow>
                    <SkeletonBox h="100%" f={1.2} p="0" transparent>
                        <Skeleton type="text" w="20%" />
                        <Skeleton type="thumbnail" h="30px" w="100%" />
                    </SkeletonBox>
                    <SkeletonLine w="6%" />
                    <SkeletonBox h="100%" f={0.8} p="0" transparent>
                        <Skeleton type="text" w="30%" />
                        <Skeleton type="thumbnail" h="30px" w="100%" />
                    </SkeletonBox>
                </SkeletonRow>
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonRow>
                    <SkeletonBox h="100%" f={1.2} p="0" transparent>
                        <Skeleton type="text" w="20%" />
                        <SkeletonBox h="100%" f={1}>
                            <Skeleton type="text" w="40%" />
                        </SkeletonBox>
                        <SkeletonBox h="100%" f={1}>
                            <Skeleton type="text" w="40%" />
                        </SkeletonBox>
                        <SkeletonBox h="100%" f={1}>
                            <Skeleton type="text" w="40%" />
                        </SkeletonBox>
                    </SkeletonBox>
                    <SkeletonLine w="6%" />
                    <SkeletonBox h="100%" f={0.8} p="0" transparent>
                        <Skeleton type="text" w="20%" />
                        <Skeleton type="thumbnail" h="30px" w="120px" />
                        <Skeleton type="thumbnail" h="30px" w="120px" />
                        <Skeleton type="thumbnail" h="30px" w="120px" />
                    </SkeletonBox>
                </SkeletonRow>
            </SkeletonBox>
            <Shimmer />
        </SkeletonWrapper>
    );
};

const Wrapper = () => {
    return (
        <AnimatePresence>
            <IntroCallAvailabilitySkeleton />
        </AnimatePresence>
    );
};

export {
    Wrapper as IntroCallAvailabilitySkeleton,
    IntroCallAvailabilitySkeleton as IntroCallAvailabilitySkeletonComponent,
};
