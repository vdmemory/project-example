import Head from 'next/head';

export default function HeadApp({ title }: { title: string }) {
    const titleContent = `breef. | ${title}`;
    return (
        <Head>
            <title>{titleContent}</title>
            <meta
                key="viewport"
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1"
            />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="preload" as="font" />
        </Head>
    );
}
