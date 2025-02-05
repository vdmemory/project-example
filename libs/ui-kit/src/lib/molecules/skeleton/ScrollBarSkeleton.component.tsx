import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Shimmer } from '../../atoms';

const Styled = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    display: flex;

    .card {
        padding: 10px 75px;
        display: flex;
        flex-direction: column;
        padding: 35px 30px 25px 75px;
        width: 100%;

        &:first-of-type {
            border-right: 1px solid black;
        }
    }

    .avatar {
        width: 50px;
        height: 50px;
        background: #ddd;
        overflow: hidden;
        margin-bottom: 22px;
        border-radius: 50%;
    }

    .label {
        width: 24%;
        height: 12px;
        background: #ddd;
        overflow: hidden;
        margin-top: 3px;
        margin-bottom: 73px;
    }

    .title {
        width: 80%;
        height: 37px;
        background: #ddd;
        overflow: hidden;
        margin-bottom: 15px;
    }

    .text {
        width: 60%;
        height: 14px;
        background: #ddd;
        overflow: hidden;
        margin-top: 4px;
    }
`;

const ScrollBarSkeleton = () => {
    const list = Array.from({ length: 2 }).map((_, index) => {
        return (
            <div key={index} className="card">
                <div className="label"></div>
                <div className="avatar"></div>
                <div className="title"></div>
                <div className="title"></div>
                <div className="text"></div>
            </div>
        );
    });

    return (
        <Styled>
            {list}
            <Shimmer />
        </Styled>
    );
};

const Wrapper = () => {
    return (
        <AnimatePresence>
            <ScrollBarSkeleton />
        </AnimatePresence>
    );
};

export {
    Wrapper as ScrollBarSkeleton,
    ScrollBarSkeleton as ScrollBarSkeletonComponent,
};
