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
import DeleteListModal from './DeleteListModal'
import { Modal } from "../context/Modal";
import EditListForm from "./EditListModal/EditListForm";
import DeleteListDiv from "./DeleteListModal/DeleteListDiv"

// import DeleteListModal from './DeleteListModal'

const Lists = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { showEditListModal, setShowEditListModal } = useDropContext();
    const { showDeleteListModal, setShowDeleteListModal } = useDropContext();
    const { watchlistClicked, setWatchlistClicked } = useDropContext()
    const { list, setList, dark } = useDropContext()
    const [isLoaded, setIsLoaded] = useState(false)

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
        let mores
        let editL
        let deleteL
        let Wrap

        if (dark) {
            mores = document.getElementsByClassName('Lists_crunchylistMore')
            editL = document.getElementsByClassName('Lists_editList')[0]
            deleteL = document.getElementsByClassName('Lists_editList')[1]
            Wrap = document.getElementsByClassName('Lists_morePop')[0]
        }
        if (!dark) {
            mores = document.getElementsByClassName('LIGHTLists_crunchylistMore')
            editL = document.getElementsByClassName('LIGHTLists_editList')[0]
            deleteL = document.getElementsByClassName('LIGHTLists_editList')[1]
            Wrap = document.getElementsByClassName('LIGHTLists_morePop')[0]
        }

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

        setList(list)
        history.push(`/lists/${list.id}`)
    }


    useEffect(() => {

        dispatch(getAllStoriesThunk())
            .then(() => dispatch(clearReviews()))
            .then(() => dispatch(getUserListsThunk()))
            .then(() => setShowEditListModal(false))
            .then(() => setShowDeleteListModal(false))
            .then(() => setIsLoaded(true))
    }, [])

    //listeners to close popdown more


    useEffect(() => {
        if (!moreToggle) return;

        //add elements in dropdown to avoid closing
        let elementArr = []

        if (dark) {
            let mores = document.getElementsByClassName('Lists_morePop')
            for (let more of mores) { elementArr.push(more) }
            let edits = document.getElementsByClassName('Lists_editList')
            for (let edit of edits) { elementArr.push(edit) }
            let wraps = document.getElementsByClassName('Lists_crunchylistWrap')
            for (let wrap of wraps) { elementArr.push(wrap) }
            let tops = document.getElementsByClassName('Lists_crunchylistTop')
            for (let top of tops) { elementArr.push(top) }
            let moreWraps = document.getElementsByClassName('Lists_crunchylistMoreWrap')
            for (let mWrap of moreWraps) { elementArr.push(mWrap) }
            let moreDots = document.getElementsByClassName("Lists_crunchylistMore")
            for (let mDot of moreDots) { elementArr.push(mDot) }
        }

        // lightmode
        if (!dark) {
            let mores = document.getElementsByClassName('LIGHTLists_morePop')
            for (let more of mores) { elementArr.push(more) }
            let edits = document.getElementsByClassName('LIGHTLists_editList')
            for (let edit of edits) { elementArr.push(edit) }
            let wraps = document.getElementsByClassName('LIGHTLists_crunchylistWrap')
            for (let wrap of wraps) { elementArr.push(wrap) }
            let tops = document.getElementsByClassName('LIGHTLists_crunchylistTop')
            for (let top of tops) { elementArr.push(top) }
            let moreWraps = document.getElementsByClassName('LIGHTLists_crunchylistMoreWrap')
            for (let mWrap of moreWraps) { elementArr.push(mWrap) }
            let moreDots = document.getElementsByClassName("LIGHTLists_crunchylistMore")
            for (let mDot of moreDots) { elementArr.push(mDot) }
        }

        const closePop = (e) => {
            for (let ele of elementArr) {
                if (e.target === ele) { return }
            }
            setMoreToggle(false);
        };

        document.addEventListener('click', closePop);

        return () => document.removeEventListener("click", closePop);
    }, [moreToggle]);


    return (
        <div className={dark ? 'Lists_contentWrap' : 'LIGHTLists_contentWrap'}>
            <div className={dark ? 'Lists_innerWrap' : 'LIGHTLists_innerWrap'}>
                <div className={dark ? 'Lists_headerWrap' : 'LIGHTLists_headerWrap'}>
                    <img src={watchlistIco} className={dark ? 'Lists_headerIco' : 'LIGHTLists_headerIco'}></img>
                    <h1 className={dark ? 'Lists_headerTitle' : 'LIGHTLists_headerTitle'}>My Lists</h1>
                </div>
                <div className={dark ? 'Lists_subHeaderWrap' : 'LIGHTLists_subHeaderWrap'}>
                    <div onClick={() => setWatchlistClicked(true)} className={
                        dark ? (`Lists_watchlist ${watchlistClicked ? 'List_border' : null}`)
                            : (`LIGHTLists_watchlist ${watchlistClicked ? 'LIGHTList_border' : null}`)
                    }>WATCHLIST</div>
                    <div onClick={() => setWatchlistClicked(false)} className={
                        dark ?
                            (`Lists_crunchylists ${!watchlistClicked ? 'List_border' : null}`)
                            : (`LIGHTLists_crunchylists ${!watchlistClicked ? 'LIGHTList_border' : null}`)
                    } >CRUNCHYLISTS</div>


                </div>
                <div className={dark ? 'Lists_watchlistStoryGrid' : 'LIGHTLists_watchlistStoryGrid'}>
                    {watchlistClicked && watchlistStoriesArr?.map((story) => (
                        <div key={story?.id} onClick={() => redirectStoryPage(story.id)} className={dark ? 'Lists_watchlistStoryWrap' : 'LIGHTLists_watchlistStoryWrap'}>
                            <img className={dark ? 'Lists_watchlistStoryImage' : 'LIGHTLists_watchlistStoryImage'} src={story?.image_url} onError={e => { e.currentTarget.src = "http://media.comicbook.com/2018/03/zwru5zwigvntizfbv54x-1088958.jpeg"; }}></img>
                            <div className={dark ? 'Lists_watchlistStoryTitle' : 'LIGHTLists_watchlistStoryTitle'}>{story?.title}</div>
                            <div className={dark ? 'Lists_watchlistStoryAuthor' : 'LIGHTLists_watchlistStoryAuthor'}>{story?.userName}</div>
                        </div>
                    ))}
                </div>
                {watchlistClicked && watchlistStoriesArr?.length < 1 &&
                    <div className={dark ? 'Lists_watchlistEmpty' : 'LIGHTLists_watchlistEmpty'}>
                        <img src={heart} className={dark ? 'Lists_watchlistFrown' : 'LIGHTLists_watchlistFrown'}></img>
                        <div className={dark ? 'Lists_watchlistEmptyText' : 'LIGHTLists_watchlistEmptyText'}> Your watchlist needs some love. Let's fill it up with awesome stories.</div>
                        <div onClick={redirectHome} className={dark ? 'Lists_watchlistHome' : 'LIGHTLists_watchlistHome'}>GO TO HOME FEED</div>
                    </div>
                }

                {!watchlistClicked &&
                    <div className={dark ? 'Lists_crunchylistOuter' : 'LIGHTLists_crunchylistOuter'}>
                        <CreateListModal />
                        <div className={dark ? 'Lists_crunchylistGrid' : 'LIGHTLists_crunchylistGrid'}>
                            {isLoaded && crunchyListArr?.length < 1 &&
                                <div className={dark ? 'Lists_watchlistEmpty' : 'LIGHTLists_watchlistEmpty'}>
                                    <img src={heart} className={dark ? 'Lists_watchlistFrown' : 'LIGHTLists_watchlistFrown'}></img>
                                    <div className={dark ? 'Lists_watchlistEmptyText' : 'LIGHTLists_watchlistEmptyText'}> You have no Crunchylists! Click "Create New List" to make one</div>

                                </div>
                            }
                            {isLoaded && crunchyListArr.map((list => (
                                <div key={list?.id} onClick={(e) => redirectListIDPage(e, list)} className={dark ? 'Lists_crunchylistWrap' : 'LIGHTLists_crunchylistWrap'}>
                                    <div className={dark ? 'Lists_crunchylistTop' : 'LIGHTLists_crunchylistTop'}>
                                        <div className={dark ? 'Lists_crunchylistName' : 'LIGHTLists_crunchylistName'}>{list.name}</div>
                                        <div className={dark ? 'Lists_crunchylistMoreWrap' : 'LIGHTLists_crunchylistMoreWrap'}>
                                            <img id={list.id} src={moreToggle === list.id ? whitemore : more} className={dark ? 'Lists_crunchylistMore' : 'LIGHTLists_crunchylistMore'}></img>
                                            {moreToggle === list.id &&
                                                <div className={dark ? "Lists_morePop" : "LIGHTLists_morePop"}>
                                                    <EditListModal setMoreToggle={setMoreToggle} list={list} user={user} />
                                                    <DeleteListModal setMoreToggle={setMoreToggle} list={list} user={user} />

                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className={dark ? 'Lists_crunchylistLength' : 'LIGHTLists_crunchylistLength'}>{list.stories.length} items</div>

                                </div>)))}
                        </div>
                    </div>
                }
                {showEditListModal && (
                    <Modal onClose={() => setShowEditListModal(false)}>
                        <EditListForm showEditListModal={showEditListModal} setShowEditListModal={setShowEditListModal} />
                    </Modal>
                )}
                {showDeleteListModal && (
                    <Modal onClose={() => setShowDeleteListModal(false)}>
                        <DeleteListDiv showDeleteListModal={showDeleteListModal} setShowDeleteListModal={setShowDeleteListModal} />
                    </Modal>
                )}
            </div>
        </div >
    )
}

export default Lists;
