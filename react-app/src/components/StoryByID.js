import "./CSS/StoryByID.css"
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllStoriesThunk } from '../store/stories'
import { getStoryReviewsThunk } from '../store/reviews.js'

const StoryByID = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    let { id } = useParams();
    const user = useSelector(state => state.session.user)
    const story = useSelector(state => state?.stories?.allStories[Number(id)])

    useEffect(() => {
        dispatch(getAllStoriesThunk())
        dispatch(getStoryReviewsThunk(id))
    }, [dispatch])


    return (
        <div className='StoryByID_contentWrap'>
            <div className='StoryByID_header'>
                <img className='StoryByID_backgroundImage' src={story?.image_url}></img>
                <img className='StoryByID_mainImage' src={story?.image_url}></img>
            </div>
            <div className='StoryByID_subHeader'>
                <div className='StoryByID_subHeaderLeft'>
                    <h1 className='StoryByID_title'>{story?.title}</h1>
                    <div className='StoryByID_ratingWrap'>
                        <div className='StoryByID_stars'></div>
                        <div className='StoryByID_rating'></div>
                        <div className='StoryByID_reviews'></div>
                    </div>
                    <div className='StoryByID_listWrap'>
                        <div className='StoryByID_watchlist'></div>
                        <div className='StoryByID_crunchylist'></div>
                    </div>
                </div>
                <div className='StoryByID_subHeaderRight'></div>
            </div>
            <div className='StoryByID_bodyWrap'>
                <div className='StoryByID_bodyPrev'></div>
                <div className='StoryByID_readStory'></div>
            </div>
            <div className='StoryByID_storyWrap'>
                <div className='StoryByID_story'></div>
            </div>

        </div >
    )
}

export default StoryByID;
