import "./CSS/StoryByID.css"
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllStoriesThunk } from '../store/stories'
import { getStoryReviewsThunk } from '../store/reviews.js'
import { getUserListsThunk } from '../store/lists.js'
import Stars from './Stars'
import watchlist from './images/watchlist.png'
import { useState } from "react";

const StoryByID = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    let { id } = useParams();
    const user = useSelector(state => state.session.user)
    const story = useSelector(state => state?.stories?.allStories[Number(id)])
    const reviews = useSelector(state => state?.reviews?.storyReviews)
    //turn reviews into arr, map to just arr of stars, reduce to avg of stars
    const avgRating = Object.values(useSelector(state => state?.reviews?.storyReviews))
        .map(review => review?.stars)
        .reduce((acc, star, index, array) => {
            return acc + star / array.length
        }, 0)
        .toFixed(2)

    //need to make get user lists thunk to know what to default this to
    const [addedToWatchlist, setAddedToWatchlist] = useState(false)

    useEffect(() => {
        dispatch(getAllStoriesThunk())
        dispatch(getStoryReviewsThunk(id))
        dispatch(getUserListsThunk())
    }, [dispatch])


    return (
        <div className='StoryByID_contentWrap'>
            <div className='StoryByID_header'>
                {story && <img className='StoryByID_backgroundImage' src={story?.image_url}
                    onError={e => { e.currentTarget.src = "http://media.comicbook.com/2018/03/zwru5zwigvntizfbv54x-1088958.jpeg"; }}></img>}
                {story && <img className='StoryByID_mainImage' src={story?.image_url}
                    onError={e => { e.currentTarget.src = "http://media.comicbook.com/2018/03/zwru5zwigvntizfbv54x-1088958.jpeg"; }}
                ></img>}
            </div>
            <div className='StoryByID_subHeader'>
                <div className='StoryByID_subHeaderLeft'>
                    {story && <h1 className='StoryByID_title'>{story?.title}</h1>}
                    {!story && <h1 className='StoryByID_titleBlank'></h1>}
                    <div className='StoryByID_ratingWrap'>
                        <div className='StoryByID_stars'>
                            {story && <Stars avgRating={avgRating} reviews={reviews} />}
                            {!story && <div className="StoryByID_starsBlank"></div>}
                        </div >
                        <div className='StoryByID_avgRatingWrap'>
                            <div className='StoryByID_rating'>Average Rating:</div>
                            <div className='StoryByID_numRating'>{Object.values(reviews).length ? avgRating : `N/A`}</div>
                        </div>
                        <div className='StoryByID_reviews'>{Object.values(reviews).length} reviews</div>
                    </div>
                    <div className='StoryByID_listWrap'>
                        <div className='StoryByID_watchlistWrap'>
                            <img className='StoryByID_watchlistIco' src={watchlist}></img>
                            <div className='StoryByID_watchlist'>ADD TO WATCHLIST</div>
                        </div>

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
