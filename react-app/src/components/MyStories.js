import React, { useEffect, useState } from 'react';
import "./CSS/MyStories.css"
import "./CSS/Light/LIGHTMyStories.css"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStoriesThunk } from '../store/stories'
import CreateStoryModal from './CreateStoryModal';
import EditStoryModal from './EditStoryModal';
import DeleteStoryModal from './DeleteStoryModal';
import { clearReviews } from '../store/reviews'
import heart from './images/heart.png'
import { useDropContext } from '../context/Dropdown';

const MyStories = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const { dark } = useDropContext()

    const [isLoaded, setIsLoaded] = useState(false)

    //grab all stories from state, convert to Arr, filter by userID, sort by ID (last added first up)
    const userStoriesArr = Object.values(useSelector((state) => state?.stories?.allStories))
        .filter((story) => story?.user_id === user?.id)
        .sort((a, b) => Number(b.id) - Number(a.id))

    console.log(userStoriesArr)

    if (!user) {
        history.replace('/')
    }

    const redirectStory = (id) => {
        history.push(`/stories/${id}`)
    }

    const redirectHome = () => {
        history.push(`/`)
    }

    useEffect(() => {
        dispatch(getAllStoriesThunk())
            .then(() => setIsLoaded(true))
        dispatch(clearReviews())


    }, [])


    if (!isLoaded) { return <div className={dark ? 'paddingLoad' : 'LIGHTpaddingLoad'}></div> }

    return (
        <div className={dark ? 'MyStories_contentWrap' : 'LIGHTMyStories_contentWrap'}>
            <div className={dark ? 'MyStories_header' : 'LIGHTMyStories_header'}>
                <h1 className={dark ? 'MyStories_h1' : 'LIGHTMyStories_h1'}> My Stories</h1>
                <CreateStoryModal />
            </div>
            {isLoaded && userStoriesArr?.length < 1 &&

                <div className={dark ? 'Lists_watchlistEmpty' : 'LIGHTLists_watchlistEmpty'}>
                    <img src={heart} className={dark ? 'Lists_watchlistFrown' : 'LIGHTLists_watchlistFrown'}></img>
                    <div className={dark ? 'Lists_watchlistEmptyText' : 'LIGHTLists_watchlistEmptyText'}> You have not written any stories! Click add to write a story or click below to go home.</div>
                    <div onClick={redirectHome} className={dark ? 'Lists_watchlistHome' : 'LIGHTLists_watchlistHome'}>GO TO HOME FEED</div>
                </div>
            }
            <div className={dark ? 'MyStories_mapGrid' : 'LIGHTMyStories_mapGrid'}>
                {isLoaded && userStoriesArr?.length > 0 && userStoriesArr?.map((story) => (
                    <div key={story.id} className={dark ? 'MyStories_storyWrap' : 'LIGHTMyStories_storyWrap'}>
                        <img
                            onClick={() => redirectStory(story.id)}
                            className={dark ? 'MyStories_storyImage' : 'LIGHTMyStories_storyImage'}
                            src={story?.image_url}
                            alt='Story cover photo'
                            onError={e => { e.currentTarget.src = "http://media.comicbook.com/2018/03/zwru5zwigvntizfbv54x-1088958.jpeg"; }}
                        ></img>
                        <div className={dark ? 'MyStories_storyTextWrap' : 'LIGHTMyStories_storyTextWrap'}>
                            <div onClick={() => redirectStory(story.id)} className={dark ? 'MyStories_storyTitle' : 'LIGHTMyStories_storyTitle'}>{story?.title}</div>
                            <div className={dark ? 'MyStories_storyBody' : 'LIGHTMyStories_storyBody'}>{`${story?.body.slice(0, 200)}...`}</div>
                            <div className={dark ? 'MyStories_storyrightBottom' : 'LIGHTMyStories_storyrightBottom'}>
                                <div className={dark ? 'MyStories_storyrightBottomTable' : 'LIGHTMyStories_storyrightBottomTable'}>
                                    <div className={dark ? 'MyStories_storyReviews' : 'LIGHTMyStories_storyReviews'}>Reviews: {story?.reviews.length}</div>
                                    <div className={dark ? 'MyStories_storyLists' : 'LIGHTMyStories_storyLists'}>This story is in {story?.lists.length} lists!</div>
                                </div>
                                <div className={dark ? 'MyStories_storyrightBottomButtons' : 'LIGHTMyStories_storyrightBottomButtons'}>
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
