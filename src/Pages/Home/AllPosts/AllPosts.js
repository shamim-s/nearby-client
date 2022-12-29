import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PostCard from './PostCard';

const AllPosts = () => {
    const {data: posts = [], refetch} = useQuery({
        queryKey:['posts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/posts/all`)
            const data = await res.json();
            return data;
        }
    });

    console.log(posts);
    return (
        <div>
            {
                posts.map(post => <PostCard key={post._id} post={post}/>)
            }
        </div>
    );
};

export default AllPosts;