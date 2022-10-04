import './CSS/ListByID.css'
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDropContext } from '../context/Dropdown';
import back from './images/back.png'
import deleteIco from './images/delete.png'
import { getAllStoriesThunk } from '../store/stories'
import { getUserListsThunk, removeStoryListThunk } from '../store/lists.js'

const ListByID = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { list, setList } = useDropContext()
    const [load, toggleLoad] = useState(false)

    const updatedList = useSelector(state => state?.lists?.userLists[list.id])

    const user = useSelector(state => state?.session?.user)
    if (!user) {
        history.push('/login-signup')
    }


    const listStories = Object.values(useSelector(state => state?.stories?.allStories))
        .filter(story => updatedList?.stories?.includes(Number(story.id)))


    const redirectList = () => {
        history.push('/lists')
    }

    const redirectStory = (id) => {
        history.push(`/stories/${id}`)
    }

    const handleRemove = (updateObj) => {

        dispatch(removeStoryListThunk(updateObj))
            .then(() => toggleLoad(!load))


    }

    useEffect(() => {
        dispatch(getAllStoriesThunk())
        dispatch(getUserListsThunk())
    }, [load])


    return (

        <div className='ListByID_contentWrap'>
            <div className='ListByID_outer'>
                <div className='ListByID_backWrap'>
                    <img src={back} className='ListByID_carat'></img>
                    <div onClick={redirectList} className='ListByID_back'>BACK TO CRUNCHYLISTS</div>
                </div>
                <div className='ListByID_headerWrap'>
                    <h1 className='ListByID_h1'>{list.name}</h1>
                </div>
                <div className='ListByID_bodyWrap'>
                    {listStories.map(story => (
                        <div className='ListByID_storyWrap'>
                            <img onClick={() => redirectStory(story.id)} src={story.image_url} className='ListByID_image'></img>
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

        </div>

    );
}

export default ListByID;
