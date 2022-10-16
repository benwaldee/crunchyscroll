import './CSS/ListByID.css'
import './CSS/Light/LIGHTListByID.css'
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDropContext } from '../context/Dropdown';
import back from './images/back.png'
import deleteIco from './images/delete.png'
import { getAllStoriesThunk } from '../store/stories'
import { getUserListsThunk, removeStoryListThunk } from '../store/lists.js'
import heart from './images/heart.png'

const ListByID = () => {
    const { dark, setDark } = useDropContext()
    const history = useHistory()
    const dispatch = useDispatch()
    // const { list, setList } = useDropContext()
    const [load, toggleLoad] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    //did list context and updated list selectors forgetting that i could just
    //grab id from params - refactor late
    let { id } = useParams();


    const list = useSelector(state => state?.lists?.userLists[Number(id)])

    const user = useSelector(state => state?.session?.user)
    if (!user) {
        history.push('/login-signup')
    }


    const listStories = Object.values(useSelector(state => state?.stories?.allStories))
        .filter(story => list?.stories?.includes(Number(story.id)))

    if (listStories.length > 0) {

        if (Number(list.id) !== Number(id)) {
            history.push('/404')
        }
    }





    const redirectList = () => {
        history.push('/lists')
    }

    const redirectHome = () => {
        history.push('/')
    }

    const redirectStory = (id) => {
        history.push(`/stories/${id}`)
    }

    const handleRemove = (updateObj) => {

        dispatch(removeStoryListThunk(updateObj))
            .then(() => toggleLoad(!load))
            .then(() => dispatch(getUserListsThunk()))
            .then(() => dispatch(getAllStoriesThunk()))

    }

    useEffect(() => {
        dispatch(getAllStoriesThunk())
            .then(() => dispatch(getUserListsThunk()))
            .then(() => setIsLoaded(true))
    }, [])




    return (

        <div className={dark ? 'ListByID_contentWrap' : 'LIGHTListByID_contentWrap'}>
            <div className={dark ? 'ListByID_outer' : 'LIGHTListByID_outer'}>
                <div onClick={redirectList} className={dark ? 'ListByID_backWrap' : 'LIGHTListByID_backWrap'}>
                    <img src={back} className={dark ? 'ListByID_carat' : 'LIGHTListByID_carat'}></img>
                    <div className={dark ? 'ListByID_back' : 'LIGHTListByID_back'}>BACK TO CRUNCHYLISTS</div>
                </div>
                <div className={dark ? 'ListByID_headerWrap' : 'LIGHTListByID_headerWrap'}>
                    <h1 className={dark ? 'ListByID_h1' : 'LIGHTListByID_h1'}>{list?.name}</h1>
                </div>
                <div className={dark ? 'ListByID_bodyWrap' : 'LIGHTListByID_bodyWrap'}>
                    {isLoaded && listStories.length < 1 &&
                        < div className={dark ? 'Lists_watchlistEmpty' : 'LIGHTLists_watchlistEmpty'}>
                            <img src={heart} className={dark ? 'Lists_watchlistFrown' : 'LIGHTLists_watchlistFrown'}></img>
                            <div className={dark ? 'Lists_watchlistEmptyText' : 'LIGHTLists_watchlistEmptyText'}> Your crunchylist needs some love. Let's fill it up with awesome stories.</div>
                            <div onClick={redirectHome} className={dark ? 'Lists_watchlistHome' : 'LIGHTLists_watchlistHome'}>GO TO HOME FEED</div>
                        </div>
                    }
                    {isLoaded && listStories.length > 0 && listStories.map(story => (
                        <div className={dark ? 'ListByID_storyWrap' : 'LIGHTListByID_storyWrap'}>
                            <img
                                onError={e => { e.currentTarget.src = "http://media.comicbook.com/2018/03/zwru5zwigvntizfbv54x-1088958.jpeg"; }}
                                onClick={() => redirectStory(story.id)} src={story.image_url} className={dark ? 'ListByID_image' : 'LIGHTListByID_image'}></img>
                            <div className={dark ? 'ListByID_halfWrap' : 'LIGHTListByID_halfWrap'}>
                                <div onClick={() => redirectStory(story.id)} className={dark ? 'ListByID_storyName' : 'LIGHTListByID_storyName'}>{story.title}</div>
                                <div className={dark ? 'ListByID_storyAuthor' : 'LIGHTListByID_storyAuthor'}>{story.userName}</div>
                            </div>
                            <img src={deleteIco} onClick={() => handleRemove(
                                {
                                    story_id: Number(story.id),
                                    list_id: Number(list?.id)
                                }
                            )} className={dark ? 'ListByID_storyRemove' : 'LIGHTListByID_storyRemove'}></img>
                        </div>
                    ))}

                </div>
            </div>

        </div >

    );
}

export default ListByID;
