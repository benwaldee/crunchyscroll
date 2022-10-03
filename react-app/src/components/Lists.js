import "./CSS/Lists.css"
import { useHistory } from 'react-router-dom';
import { useDropContext } from '../context/Dropdown';
import { getAllStoriesThunk } from '../store/stories'
import { clearReviews } from '../store/reviews'
import watchlistIco from './images/watchlist.png'
import { getUserListsThunk } from '../store/lists.js'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import more from './images/more.png'
import { useState } from "react";

const Lists = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { watchlistClicked, setWatchlistClicked } = useDropContext()

    const user = useSelector(state => state.session.user)
    if (!user) {
        history.replace('/')
    }

    const storiesObj = useSelector((state) => state?.stories?.allStories)
    const watchlistStoriesArr = Object.values(useSelector((state) => state?.lists?.userLists))
        ?.filter((list) => list.watchlist)
        ?.map((list) => list.stories)[0]
        ?.map((id) => storiesObj[id])

    const crunchyListArr = Object.values(useSelector((state) => state?.lists?.userLists))
        ?.filter((list) => !list.watchlist)


    const [moreToggle, setMoreToggle] = useState(false)


    const redirectStoryPage = (id) => {
        history.push(`/stories/${id}`)
    }

    const redirectListIDPage = (e, id) => {
        let more = document.getElementsByClassName('Lists_crunchylistMore')[0]

        if (e.target === more) {
            setMoreToggle(id)
            return
        }

        history.push(`/lists/${id}`)
    }


    useEffect(() => {

        dispatch(getAllStoriesThunk())
        dispatch(clearReviews())
        dispatch(getUserListsThunk())
    }, [dispatch])


    return (
        <div className='Lists_contentWrap'>
            <div className='Lists_innerWrap'>
                <div className='Lists_headerWrap'>
                    <img src={watchlistIco} className='Lists_headerIco'></img>
                    <h1 className='Lists_headerTitle'>My Lists</h1>
                </div>
                <div className='Lists_subHeaderWrap'>
                    <div onClick={() => setWatchlistClicked(true)} className={`Lists_watchlist ${watchlistClicked ? 'List_border' : null}`}>WATCHLIST</div>
                    <div onClick={() => setWatchlistClicked(false)} className={`Lists_crunchylists ${!watchlistClicked ? 'List_border' : null}`} >CRUNCHYLISTS</div>
                </div>
                <div className='Lists_watchlistStoryGrid'>
                    {watchlistClicked && watchlistStoriesArr?.map((story) => (
                        <div onClick={() => redirectStoryPage(story.id)} className='Lists_watchlistStoryWrap'>
                            <img className='Lists_watchlistStoryImage' src={story?.image_url}></img>
                            <div className='Lists_watchlistStoryTitle'>{story?.title}</div>
                            <div className='Lists_watchlistStoryAuthor'>{story?.userName}</div>
                        </div>
                    ))}
                </div>

                {!watchlistClicked &&
                    <div className='Lists_crunchylistOuter'>
                        <div className='Lists_crunchylistCreate'>CREATE NEW LIST</div>
                        <div className='Lists_crunchylistGrid'>
                            {crunchyListArr.map((list => (
                                <div onClick={(e) => redirectListIDPage(e, list.id)} className='Lists_crunchylistWrap'>
                                    <div className='Lists_crunchylistTop'>
                                        <div className='Lists_crunchylistName'>{list.name}</div>
                                        <img src={more} className='Lists_crunchylistMore'></img>
                                    </div>
                                    <div className='Lists_crunchylistLength'>{list.stories.length} items</div>
                                </div>)))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Lists;
