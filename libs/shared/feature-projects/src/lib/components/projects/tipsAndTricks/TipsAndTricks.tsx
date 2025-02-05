import { StyledTipsAndTricks } from './TipsAndTricks.styled';
import { ScrollBar } from '@breef/shared/ui-components';
import { Flowers_bg } from '@breef/shared/assets';
import {
    BREEF_ARTICLES_BREEFING_ROOM_AGENCY,
    BREEF_ARTICLES_BREEFING_ROOM_CLIENT,
} from '@breef/shared/constants';
import { useMediaContext } from '@breef/shared/hooks';
import Image from 'next/image';

interface TipsAndTricks {
    tipsData: {
        id: string;
        title: string;
        image: string;
        slug: string;
    }[];
    role: 'client' | 'agency';
}

export function TipsAndTricks({ tipsData, role }: TipsAndTricks) {
    const { isMobile } = useMediaContext();
    const SITE_LINK =
        role === 'client'
            ? BREEF_ARTICLES_BREEFING_ROOM_CLIENT
            : BREEF_ARTICLES_BREEFING_ROOM_AGENCY;
    return (
        <StyledTipsAndTricks className="tips-and-tricks">
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
                                <Image
                                    src={item.image}
                                    alt="tips-1"
                                    width={300}
                                    height={215}
                                />
                            </div>
                            <p>{item.title}</p>
                        </a>
                    ))}
                </ScrollBar>
            </div>

            <div className="tips-sidebar">
                <h2 className="tips-sidebar--title">The breefing Room</h2>
                <a href={SITE_LINK}>{'See GUIDES\n+ EDITORIAL'}</a>
                <img
                    src={Flowers_bg.src}
                    alt=""
                    className="tips-sidebar--icon"
                />
            </div>
        </StyledTipsAndTricks>
    );
}
