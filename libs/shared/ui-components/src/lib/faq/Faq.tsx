import React, { FC, useState } from 'react';
import ExpansionPanel from '../expansionPanel/ExpansionPanel';
import { StyledFaq } from './Faq.styled';
import {
    aboutAnswer,
    agenciesAnswer,
    clientsAnswer,
    FaqAnswersListType,
    navigationList,
    policesAnswer,
    pricingAnswer,
} from './faqConfig';
import { AppRoleType } from '@breef/shared/types';

interface FaqProps {
    role: AppRoleType;
}

const Faq: FC<FaqProps> = ({ role }) => {
    const [activeTab, setActiveTab] = useState(navigationList[0].id);

    const handleSetActiveTab = (id: string) => {
        setActiveTab(id);
    };

    const policesAnswerItem = policesAnswer(role);
    const clientsAnswerItem = clientsAnswer(role);

    const renderAnswerItems = (answerItems: FaqAnswersListType) => {
        return answerItems.map(item => (
            <React.Fragment key={item.title}>
                <ExpansionPanel
                    description={item.description}
                    title={item.title}
                    isMarked={true}
                />
            </React.Fragment>
        ));
    };

    const renderFaqAnswerSection = (
        sectionId: string,
        sectionTitle: string,
        answerItems: FaqAnswersListType,
    ) => {
        return (
            <div className="faq-answer">
                <div id={sectionId} className="anchor"></div>
                <h2>{sectionTitle}</h2>
                <div className="faq-answer-list">
                    {renderAnswerItems(answerItems)}
                </div>
            </div>
        );
    };

    return (
        <StyledFaq>
            <div className="faq-navigate">
                <ul>
                    {navigationList.map(item => (
                        <li
                            key={item.id}
                            onClick={() => handleSetActiveTab(item.id)}
                            className={
                                item.id === activeTab ? 'active-tab' : ''
                            }
                        >
                            <a href={`#${item.id}`}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
            {renderFaqAnswerSection('about', 'About', aboutAnswer)}
            {renderFaqAnswerSection('pricing', 'Pricing', pricingAnswer)}
            {renderFaqAnswerSection('clients', 'Clients', clientsAnswerItem)}
            {renderFaqAnswerSection('agencies', 'Agencies', agenciesAnswer)}
            {renderFaqAnswerSection('policies', 'Policies', policesAnswerItem)}
        </StyledFaq>
    );
};
export default Faq;
