import { useMediaContext } from '@breef/shared/hooks';
import { AnimatePresence } from 'framer-motion';
import { SkeletonWrapper, Skeleton, Shimmer } from '../../atoms';
import {
    SkeletonBox,
    SkeletonLine,
    SkeletonRow,
} from '../../atoms/skeleton/Skeleton.component';

const ProjectsSkeleton = () => {
    const { isMobile } = useMediaContext();

    const listDesktop = Array.from({ length: 3 }).map((_, index) => {
        return (
            <SkeletonBox key={index} h="100%">
                <SkeletonRow h="67px">
                    <SkeletonBox p="0" h="100%" transparent>
                        <SkeletonRow>
                            <Skeleton type="title" w="200px" />
                            <Skeleton type="title" w="100px" />
                        </SkeletonRow>
                        <SkeletonRow>
                            <Skeleton type="text" w="150px" />
                            <Skeleton type="text" w="150px" />
                            <Skeleton type="text" w="150px" />
                        </SkeletonRow>
                    </SkeletonBox>
                    <SkeletonLine w="6%" m="auto" />
                    <Skeleton type="text" w="200px" />
                    <Skeleton type="thumbnail" h="30px" w="120px" />
                </SkeletonRow>
            </SkeletonBox>
        );
    });

    const listMobile = Array.from({ length: 3 }).map((_, index) => {
        return (
            <SkeletonBox key={index} h="100%">
                <SkeletonRow>
                    <SkeletonBox p="0" h="100%" transparent>
                        <Skeleton type="title" w="150px" />
                        <Skeleton type="title" w="300px" />
                        <Skeleton type="text" w="170px" />
                        <Skeleton type="text" w="170px" />
                        <Skeleton type="text" w="300px" />
                        <SkeletonLine w="6%" m="auto" />
                        <Skeleton type="thumbnail" h="30px" w="300px" />
                    </SkeletonBox>
                </SkeletonRow>
            </SkeletonBox>
        );
    });

    return (
        <SkeletonWrapper>
            {isMobile ? listMobile : listDesktop}
            <Shimmer />
        </SkeletonWrapper>
    );
};

const Wrapper = () => {
    return (
        <AnimatePresence>
            <ProjectsSkeleton />
        </AnimatePresence>
    );
};

export {
    Wrapper as ProjectsSkeleton,
    ProjectsSkeleton as ProjectsSkeletonComponent,
};
