import React from 'react';

const Loader: React.FC = () => {
    return (
        <div role="status" aria-label="Loading" className="w-[100%] items-center h-[1000px] dark:bg-black bg-white">
            <div className="loader"></div>
        </div>
    );
}

export default Loader;
