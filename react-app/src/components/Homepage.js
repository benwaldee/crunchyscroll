import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CSS/Homepage.css'
import { getAllStoriesThunk } from '../store/stories'

const Homepage = () => {
    const dispatch = useDispatch()
    const storiesArr = Object.values(useSelector((state) => state?.stories?.allStories))

    useEffect(() => {

        dispatch(getAllStoriesThunk())

    }, [dispatch])


    return (
        <div className='Homepage_outer'>
            <h1 className='Homepage_h1'>Featured Stories</h1>
            <div className='Homepage_grid'>
                {storiesArr.map((story) => (
                    <div className='Homepage_storyWrap'>
                        <img className='Homepage_storyImage' src={story.image_url}></img>
                        < div className='Homepage_storyTitle' > {story.title}</div>
                    </div>
                ))
                }

            </div >
        </div >
    );
};

export default Homepage;
