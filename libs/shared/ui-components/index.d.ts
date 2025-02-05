/// <reference types="react" />
/// <reference types="react-dom" />

interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
}

declare module '*.png' {
    const content: StaticImageData;

    export default content;
}

declare module '*.gif' {
    const content: StaticImageData;

    export default content;
}
