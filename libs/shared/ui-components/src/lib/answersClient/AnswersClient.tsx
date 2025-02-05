import {
    StyledAnswers,
    StyledAnswersClientWrapper,
} from './AnswersClient.styled';
import { AnswerItem } from './answerItem/AnswerItem';
import { FAQ_ROUTE } from '@breef/shared/constants';
import LinkMore from '../linkMore/LinkMore';

interface AnswersProps {
    title: string;
    answersData: {
        title: string;
        description: string;
    }[];
}

export const AnswersClient = ({ answersData, title }: AnswersProps) => {
    return (
        <StyledAnswersClientWrapper className="answers-client">
            <StyledAnswers className="answers-block">
                <div className="answers-sidebar">
                    <span className="answers-sidebar-label">Support:</span>
                    <h2 className="answers-sidebar-title">{title}</h2>
                    <span className="answers-sidebar-note">
                        Learn more about the Breef Process
                    </span>
                    <LinkMore link={FAQ_ROUTE} title="MORE FAQs" />
                </div>
                <div className="answers-list-wrapper">
                    {answersData.map(item => (
                        <AnswerItem
                            key={item.title}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </StyledAnswers>
        </StyledAnswersClientWrapper>
    );
};
