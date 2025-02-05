import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Shimmer } from '../../atoms';

const Styled = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 60px;

    .card {
        padding: 10px 75px;
        display: flex;
        flex-direction: column;
        padding: 34px 58px 0 39px;
        width: 100%;
        border: 1px solid black;
        height: 180px;
        gap: 40px;
    }

    .button {
        height: 52px;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px 0 60px;

        .btn-title {
            width: 19%;
            height: 22px;
            background: #ddd;
            overflow: hidden;
        }

        .btn-text {
            width: 10%;
            height: 14px;
            background: #ddd;
            overflow: hidden;
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
        width: 47%;
        height: 37px;
        background: #ddd;
        overflow: hidden;
        margin-bottom: 15px;
    }

    .text {
        width: 20%;
        height: 18px;
        background: #ddd;
        overflow: hidden;
        margin-top: 4px;

        &.first {
            width: 35%;
        }
    }

    .group {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const ProjectsAgencySkeleton = () => {
    const list = Array.from({ length: 3 }).map((_, index) => {
        return (
            <div>
                <div key={index} className="card">
                    <div className="group">
                        <div className="text first"></div>
                        <div className="text"></div>
                    </div>
                    <div className="title"></div>
                </div>
                <div className="button">
                    <div className="btn-text"></div>
                    <div className="btn-title"></div>
                </div>
            </div>
        );
    });

    return (
        <Styled>
            {list}
            <Shimmer background="rgba(249, 247, 243, 0.5)" />
        </Styled>
    );
};

const Wrapper = () => {
    return (
        <AnimatePresence>
            <ProjectsAgencySkeleton />
        </AnimatePresence>
    );
};

export {
    Wrapper as ProjectsAgencySkeleton,
    ProjectsAgencySkeleton as ProjectsAgencySkeletonComponent,
};
