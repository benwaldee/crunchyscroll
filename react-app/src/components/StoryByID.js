import "./CSS/StoryByID.css"
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllStoriesThunk } from '../store/stories'
import { getStoryReviewsThunk } from '../store/reviews.js'
import { getUserListsThunk } from '../store/lists.js'
import { addStoryListThunk, removeStoryListThunk } from '../store/lists.js'
import Stars from './Stars'
import Reviews from './Reviews'
import watchlist from './images/watchlist.png'
import remove from './images/remove.png'
import { useState } from "react";
import AddToListModal from "./AddListModal";
import logo from './images/transpo-scroll.png'

const StoryByID = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    let { id } = useParams();
    const user = useSelector(state => state.session.user)
    const story = useSelector(state => state?.stories?.allStories[Number(id)])
    const storyIDs = Object.values(useSelector(state => state?.stories?.allStories))
        .map((story) => story.id)
    const reviews = useSelector(state => state?.reviews?.storyReviews)

    //404 redirect
    if (storyIDs.length > 0) {
        if (!storyIDs?.includes(Number(id))) { history.push('/404') }
    }

    const [refresh, toggleRefresh] = useState(false)

    //grab user review if any
    const userReview = Object.values(useSelector(state => state?.reviews?.storyReviews))
        .filter((review) => review.user_id === user?.id)


    const listsDict = useSelector(state => state?.lists?.userLists)
    //grab watchlist
    const watchlistObj = Object.values(useSelector(state => state?.lists?.userLists))
        .filter(list => list.watchlist === true)[0]

    //turn reviews into arr, map to just arr of stars, reduce to avg of stars
    const avgRating = Object.values(useSelector(state => state?.reviews?.storyReviews))
        .map(review => review?.stars)
        .reduce((acc, star, index, array) => {
            return acc + star / array.length
        }, 0)
        .toFixed(2)

    //get user boook total from story
    const userStoriesNum = useSelector(state => state?.stories?.allStories[Number(id)])?.userBookTotal

    //default this to if its in watchlist
    const [inWatchlist, setInWatchlist] = useState(watchlistObj?.stories?.includes(Number(id)))

    const [storyBody, setStoryBody] = useState('StoryByID_bodyClose')

    useEffect(() => {
        dispatch(getAllStoriesThunk())
        dispatch(getStoryReviewsThunk(id))
        dispatch(getUserListsThunk())
    }, [dispatch])

    const handleStoryAddWatchlist = (updateObj) => {

        if (!user) {
            history.push("/login-signup")
            return
        }

        dispatch(addStoryListThunk(updateObj))
            .then(() => dispatch(getAllStoriesThunk()))
            .then(() => dispatch(getUserListsThunk()))

        setInWatchlist(true)
    }

    const handleStoryRemoveWatchlist = (updateObj) => {
        if (!user) {
            history.push("/login-signup")
            return
        }
        dispatch(removeStoryListThunk(updateObj))
            .then(() => dispatch(getAllStoriesThunk()))
            .then(() => dispatch(getUserListsThunk()))

        setInWatchlist(false)
    }

    const contributerCalc = (num) => {
        if (num <= 1) return 'new'
        if (num > 1 && num < 5) return 'regular'
        if (num >= 5 && num < 10) return 'master'
        if (num >= 10) return 'super'
    }


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
                    {!story && <h1 className='StoryByID_titleBlank'>Ttitle Coming</h1>}
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
                        {!watchlistObj?.stories?.includes(Number(id)) && <div onClick={() => handleStoryAddWatchlist(
                            {
                                story_id: Number(id),
                                list_id: watchlistObj?.id
                            }
                        )} className='StoryByID_watchlistWrap'>
                            <img className='StoryByID_watchlistIco' src={watchlist}></img>
                            <div className='StoryByID_watchlist'>ADD TO WATCHLIST</div>
                        </div>}
                        {watchlistObj?.stories?.includes(Number(id)) && <div onClick={() => handleStoryRemoveWatchlist(
                            {
                                story_id: Number(id),
                                list_id: watchlistObj?.id
                            }
                        )} className='StoryByID_removeWatchlistWrap'>
                            <img className='StoryByID_removeIco' src={remove}></img>
                            <div className='StoryByID_removeWatchlist'>REMOVE FROM WATCHLIST</div>
                        </div>}

                        <AddToListModal listsDict={listsDict} id={id} user={user} story={story} />
                    </div>
                </div>
                <div className='StoryByID_subHeaderRight'>
                    <img className='StoryByID_logo' src={logo}></img>
                    <div className='StoryByID_subRTwrap'>
                        {story?.userName} is a <span className="StoryByID_contributer">{contributerCalc(userStoriesNum)}</span> contributer!
                        They have written <span className="StoryByID_stNum">{userStoriesNum}</span> {userStoriesNum > 1 ? 'stories' : 'story'}.
                    </div>
                </div>
            </div>
            <div className='StoryByID_bodyWrap'>
                <div>
                    <div className={storyBody}>{story?.body}</div>
                    {storyBody === 'StoryByID_bodyClose' &&
                        <div
                            onClick={() => {
                                setStoryBody('StoryByID_bodyOpen')
                            }}
                            className='StoryByID_readMore'>Read More!</div>}
                    {storyBody !== 'StoryByID_bodyClose' &&
                        <div
                            onClick={() => {
                                setStoryBody('StoryByID_bodyClose')
                            }}
                            className='StoryByID_readMore'>Read Less</div>}
                </div>
            </div>


            <Reviews refresh={refresh} toggleRefresh={toggleRefresh} id={id} reviews={reviews} avgRating={avgRating} user={user} userReview={userReview} />


        </div >
    )
}

export default StoryByID;
