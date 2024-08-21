import React from 'react';

const Loader: React.FC = () => {
    return (
        <div role="status" aria-label="Loading" className="w-[100%] h-[100hv] dark:bg-black bg-white">
            <div className="loader"></div>
        </div>
    );
}

export default Loader;
