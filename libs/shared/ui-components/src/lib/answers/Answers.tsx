import { StyledAnswers, StyledAnswersWrapper } from './Answers.styled';
import Link from 'next/link';
import { AnswerItem } from './answerItem/AnswerItem';
import { FAQ_ROUTE } from '@breef/shared/constants';
import { useMediaContext } from '@breef/shared/hooks';

interface AnswersProps {
    title: string;
    titleMobile?: string;
    image: {
        src: string;
        position: {
            top?: number;
            bottom?: number;
            right?: number;
        };
    };
    answersData: {
        title: string;
        description: string;
    }[];
}

export function Answers({
    answersData,
    image,
    title,
    titleMobile,
}: AnswersProps) {
    const { isMobile } = useMediaContext();

    return (
        <StyledAnswersWrapper className="answers">
            <StyledAnswers
                className="answers-block"
                imagePosition={image.position}
            >
                <div className="answers-sidebar">
                    <h2>{isMobile && titleMobile ? titleMobile : title}</h2>
                    <Link href={FAQ_ROUTE}>{'Check out\nmore FAQs'}</Link>
                    <img src={image.src} alt="FAQ" />
                </div>
                <div
                    data-testid="answers-wrapper"
                    className="answers-list-wrapper"
                >
                    {answersData.map(item => (
                        <AnswerItem
                            key={item.title}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </StyledAnswers>
        </StyledAnswersWrapper>
    );
}
