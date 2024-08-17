import React from 'react';

const NotFoundPage = ({ fullscreensize = false }) => {
    return (
        <div className={`${fullscreensize ? "h-screen w-screen" : "h-full w-full"} bg-gradient-to-br from-black to-blue-500 flex justify-center items-center `}>
            <h1 className='text-[4rem] text-white'>Page Not Found</h1>
        </div>
    );
}

export default NotFoundPage;
