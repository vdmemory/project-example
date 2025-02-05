import { StyledTipsAndTricksClient } from './TipsAndTricksClient.styled';
import { LinkMore, ScrollBar } from '@breef/shared/ui-components';
import { BREEF_ARTICLES_BREEFING_ROOM_CLIENT } from '@breef/shared/constants';
import { useContext } from 'react';
import { useMediaContext } from '@breef/shared/hooks';

interface TipsAndTricksClient {
    tipsData: {
        id: string;
        title: string;
        image: string;
        slug: string;
    }[];
}

export function TipsAndTricksClient({ tipsData }: TipsAndTricksClient) {
    const { isMobile } = useMediaContext();

    return (
        <StyledTipsAndTricksClient className="tips-and-tricks-client">
            <div className="tips-scroll">
                <ScrollBar scroll="horizontal" hideNavButtons={isMobile}>
                    {tipsData.map(item => (
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`${BREEF_ARTICLES_BREEFING_ROOM_CLIENT}/${item.slug}`}
                            className="content-item"
                            key={item.id}
                        >
                            <div className="content-image">
                                <img src={item.image} alt="tips-1" />
                            </div>
                            <div className="tip-content-wrapper">
                                <span>Tip of the day</span>
                                <p>{item.title}</p>
                            </div>
                        </a>
                    ))}
                </ScrollBar>
            </div>

            <div className="tips-sidebar">
                <span className="tips-sidebar-label">RESOURCES:</span>
                <h2 className="tips-sidebar--title">The breefing Room</h2>
                <span className="tips-sidebar-note">
                    The first editorial site for marketers.{' '}
                </span>
                <LinkMore
                    link={BREEF_ARTICLES_BREEFING_ROOM_CLIENT}
                    title="SEE MORE"
                />
            </div>
        </StyledTipsAndTricksClient>
    );
}
