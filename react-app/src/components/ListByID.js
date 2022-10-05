import './CSS/ListByID.css'
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

        <div className='ListByID_contentWrap'>
            <div className='ListByID_outer'>
                <div onClick={redirectList} className='ListByID_backWrap'>
                    <img src={back} className='ListByID_carat'></img>
                    <div className='ListByID_back'>BACK TO CRUNCHYLISTS</div>
                </div>
                <div className='ListByID_headerWrap'>
                    <h1 className='ListByID_h1'>{list?.name}</h1>
                </div>
                <div className='ListByID_bodyWrap'>
                    {isLoaded && listStories.length < 1 &&
                        < div className='Lists_watchlistEmpty'>
                            <img src={heart} className='Lists_watchlistFrown'></img>
                            <div className='Lists_watchlistEmptyText'> Your crunchylist needs some love. Let's fill it up with awesome stories.</div>
                            <div onClick={redirectHome} className='Lists_watchlistHome'>GO TO HOME FEED</div>
                        </div>
                    }
                    {isLoaded && listStories.length > 0 && listStories.map(story => (
                        <div className='ListByID_storyWrap'>
                            <img
                                onError={e => { e.currentTarget.src = "http://media.comicbook.com/2018/03/zwru5zwigvntizfbv54x-1088958.jpeg"; }}
                                onClick={() => redirectStory(story.id)} src={story.image_url} className='ListByID_image'></img>
                            <div className='ListByID_halfWrap'>
                                <div onClick={() => redirectStory(story.id)} className='ListByID_storyName'>{story.title}</div>
                                <div className='ListByID_storyAuthor'>{story.userName}</div>
                            </div>
                            <img src={deleteIco} onClick={() => handleRemove(
                                {
                                    story_id: Number(story.id),
                                    list_id: Number(list?.id)
                                }
                            )} className='ListByID_storyRemove'></img>
                        </div>
                    ))}

                </div>
            </div>

        </div >

    );
}

export default ListByID;