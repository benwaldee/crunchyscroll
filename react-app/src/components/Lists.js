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
import whitemore from './images/whitemore.png'
import heart from './images/heart.png'
import { useState } from "react";
import CreateListModal from './CreateListModal'
import EditListModal from './EditListModal'
import { Modal } from "../context/Modal";
import EditListForm from "./EditListModal/EditListForm";

// import DeleteListModal from './DeleteListModal'

const Lists = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { showEditListModal, setShowEditListModal } = useDropContext();
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

    const redirectHome = () => {
        history.push(`/`)
    }

    const redirectListIDPage = (e, list) => {
        let mores = document.getElementsByClassName('Lists_crunchylistMore')
        let editL = document.getElementsByClassName('Lists_editList')[0]
        let deleteL = document.getElementsByClassName('Lists_deleteList')[0]
        let Wrap = document.getElementsByClassName('Lists_morePop')[0]

        let noArr = []
        noArr.push(editL)
        noArr.push(deleteL)
        noArr.push(Wrap)
        for (let more of mores) {
            if (e.target === more) {
                moreToggle === list.id ? setMoreToggle(false) : setMoreToggle(list.id)
                return
            }
        }

        for (let ele of noArr) {
            if (e.target === ele) {
                return
            }

        }

        history.push(`/lists/${list.id}`)
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
                {watchlistClicked && watchlistStoriesArr?.length < 1 &&
                    <div className='Lists_watchlistEmpty'>
                        <img src={heart} className='Lists_watchlistFrown'></img>
                        <div className='Lists_watchlistEmptyText'> Your watchlist needs some love. Let's fill it up with awesome stories.</div>
                        <div onClick={redirectHome} className='Lists_watchlistHome'>GO TO HOME FEED</div>
                    </div>
                }

                {!watchlistClicked &&
                    <div className='Lists_crunchylistOuter'>
                        <CreateListModal />
                        <div className='Lists_crunchylistGrid'>
                            {crunchyListArr.map((list => (
                                <div onClick={(e) => redirectListIDPage(e, list)} className='Lists_crunchylistWrap'>
                                    <div className='Lists_crunchylistTop'>
                                        <div className='Lists_crunchylistName'>{list.name}</div>
                                        <div className='Lists_crunchylistMoreWrap'>
                                            <img id={list.id} src={moreToggle === list.id ? whitemore : more} className={`Lists_crunchylistMore`}></img>
                                            {moreToggle === list.id &&
                                                <div className="Lists_morePop">
                                                    <EditListModal setMoreToggle={setMoreToggle} list={list} user={user} />
                                                    {/* <DeleteListModal /> */}
                                                    {/* <div>RENAME</div> */}
                                                    <div>DELETE</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='Lists_crunchylistLength'>{list.stories.length} items</div>

                                </div>)))}
                        </div>
                    </div>
                }
                {showEditListModal && (
                    <Modal onClose={() => setShowEditListModal(false)}>
                        <EditListForm showEditListModal={showEditListModal} setShowEditListModal={setShowEditListModal} />
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default Lists;
