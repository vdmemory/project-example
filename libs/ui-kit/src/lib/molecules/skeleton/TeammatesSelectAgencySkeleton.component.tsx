import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Shimmer } from '../../atoms';

const Styled = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: fit-content;

    .row {
        padding: 10px 75px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 40px 75px;

        &.border {
            border-bottom: 1px solid black;
            height: 70px;
            padding: 10px 75px;
        }
    }

    .title {
        width: 45%;
        height: 20px;
        background: #ddd;
        overflow: hidden;
    }

    .button-link {
        width: 30%;
        height: 25px;
        background: #ddd;
        overflow: hidden;
    }
`;

const TeammatesSelectAgencySkeleton = () => {
    const list = Array.from({ length: 5 }).map((_, index) => {
        return (
            <div key={index} className="row border">
                <div className="title"></div>
            </div>
        );
    });

    return (
        <Styled>
            {list}
            <div className="row">
                <div className="button-link"></div>
            </div>

            <Shimmer />
        </Styled>
    );
};

const Wrapper = () => {
    return (
        <AnimatePresence>
            <TeammatesSelectAgencySkeleton />
        </AnimatePresence>
    );
};

export {
    Wrapper as TeammatesSelectAgencySkeleton,
    TeammatesSelectAgencySkeleton as TeammatesSelectAgencySkeletonComponent,
};
