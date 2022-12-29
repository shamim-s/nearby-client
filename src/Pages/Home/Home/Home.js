import React from 'react';
import AllPosts from '../AllPosts/AllPosts';
import CreatePostSection from '../CreatePostSection/CreatePostSection';

const Home = () => {
    return (
        <div className=''>
            <CreatePostSection/>
            <AllPosts/>
        </div>
    );
};

export default Home;