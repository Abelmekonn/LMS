"use client";

import React from "react";

type Props = {};

const ThinLoader = (props: Props) => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div
                className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default ThinLoader;
