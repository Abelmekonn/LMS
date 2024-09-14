import { title } from "process";
import React, { FC } from "react";
import favicon from "../../public/favicon.png"
interface HeadProps {
    title: string;
    description: string;
    keywords: string
}

const Heading: FC<HeadProps> = ({ title, description, keywords }) => {
    return (
        <>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width , initial-scale"/>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="icon" href={favicon.src} type="image/png" /> {/* Correctly set favicon */}
            
        </>
    )
}

export default Heading;