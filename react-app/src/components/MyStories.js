import React, { useEffect } from 'react';
import "./CSS/MyStories.css"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStoriesThunk } from '../store/stories'
import CreateStoryModal from './CreateStoryModal';
import EditStoryModal from './EditStoryModal';
import DeleteStoryModal from './DeleteStoryModal';

const MyStories = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    //grab all stories from state, convert to Arr, filter by userID, sort by ID (last added first up)
    const userStoriesArr = Object.values(useSelector((state) => state?.stories?.allStories))
        .filter((story) => story?.user_id === user?.id)
        .sort((a, b) => Number(b.id) - Number(a.id))

    if (!user) {
        history.replace('/')
    }

    const redirectStory = (id) => {
        history.push(`/story/${id}`)
    }

    useEffect(() => {

        dispatch(getAllStoriesThunk())

    }, [dispatch])



    return (
        <div className='MyStories_contentWrap'>
            <div className='MyStories_header'>
                <h1 className='MyStories_h1'> My Stories</h1>
                <CreateStoryModal />
            </div>
            <div className='MyStories_mapGrid'>
                {userStoriesArr?.map((story) => (
                    <div key={story.id} className='MyStories_storyWrap'>
                        <img
                            onClick={() => redirectStory(story.id)}
                            className='MyStories_storyImage'
                            src={story?.image_url}
                            alt='Story cover photo'
                            onError={e => { e.currentTarget.src = "http://media.comicbook.com/2018/03/zwru5zwigvntizfbv54x-1088958.jpeg"; }}
                        ></img>
                        <div className='MyStories_storyTextWrap'>
                            <div onClick={() => redirectStory(story.id)} className='MyStories_storyTitle'>{story?.title}</div>
                            <div className='MyStories_storyBody'>{`${story?.body.slice(0, 200)}...`}</div>
                            <div className='MyStories_storyrightBottom'>
                                <div className='MyStories_storyrightBottomTable'>
                                    <div className='MyStories_storyReviews'>Reviews: {story?.reviews.length}</div>
                                    <div className='MyStories_storyLists'>This story is in {story?.lists.length} lists!</div>
                                </div>
                                <div className='MyStories_storyrightBottomButtons'>
                                    <EditStoryModal story={{
                                        id: story.id,
                                        title: story.title,
                                        body: story.body,
                                        image_url: story.image_url
                                    }} />
                                    <DeleteStoryModal story={{
                                        id: story.id,
                                        title: story.title,
                                        body: story.body,
                                        image_url: story.image_url
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default MyStories;
