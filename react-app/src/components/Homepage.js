import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CSS/Homepage.css'
import './CSS/Light/LIGHTHomepage.css'
import { getAllStoriesThunk } from '../store/stories'
import { clearReviews } from '../store/reviews'
import { useHistory } from 'react-router-dom';
import random from './images/random.png'
import { getUserListsThunk } from '../store/lists.js'
import { useDropContext } from '../context/Dropdown';
const Homepage = () => {
    const { dark, setDark } = useDropContext()
    const dispatch = useDispatch()
    const storiesArr = Object.values(useSelector((state) => state?.stories?.allStories))
        .sort((a, b) => Number(b.id) - Number(a.id))
    const history = useHistory()

    useEffect(() => {

        dispatch(getAllStoriesThunk())
        dispatch(clearReviews())
        dispatch(getUserListsThunk())
    }, [dispatch])

    const redirectStoryPage = (id) => {
        history.push(`/stories/${id}`)
    }

    const randomChoice = () => {
        let storyIDArr = []
        for (let story of storiesArr) {
            storyIDArr.push(story.id)
        }
        let idSelection = storyIDArr[Math.floor(Math.random() * storyIDArr.length)];

        history.push(`/stories/${idSelection}`)

    }

    if (storiesArr.length < 1) { return <div></div> }
    return (
        <div className={dark ? 'Homepage_outer' : 'LIGHTHomepage_outer'}>
            <div className={dark ? 'Homepage_top' : 'LIGHTHomepage_top'}>
                <h1 className={dark ? 'Homepage_h1' : 'LIGHTHomepage_h1'}>Featured Stories</h1>
                <div onClick={() => {
                    randomChoice()
                }}
                    className={dark ? 'Homepage_randomButton' : 'LIGHTHomepage_randomButton'}>
                    <img className={dark ? 'Homepage_randomButtonPic' : 'LIGHTHomepage_randomButtonPic'} src={random}></img>
                    <div className={dark ? 'Homepage_randomButtonText' : 'LIGHTHomepage_randomButtonText'}>Surprise me!</div>
                </div>
            </div>
            <div className={dark ? 'Homepage_grid' : 'LIGHTHomepage_grid'}>
                {storiesArr?.map((story) => (
                    <div onClick={() => {
                        redirectStoryPage(story?.id)
                        return
                    }} className={dark ? 'Homepage_storyWrap' : 'LIGHTHomepage_storyWrap'}>
                        <img
                            alt='Story cover photo'
                            className={dark ? 'Homepage_storyImage' : 'LIGHTHomepage_storyImage'} src={story?.image_url}
                            onError={e => { e.currentTarget.src = "http://media.comicbook.com/2018/03/zwru5zwigvntizfbv54x-1088958.jpeg"; }}
                        ></img>
                        < div className={dark ? 'Homepage_storyTitle' : 'LIGHTHomepage_storyTitle'} > {story?.title}</div>
                        < div className={dark ? 'Homepage_storyAuthor' : 'LIGHTHomepage_storyAuthor'} > {story?.userName}</div>
                    </div>
                ))
                }

            </div >
        </div >
    );
};

export default Homepage;
