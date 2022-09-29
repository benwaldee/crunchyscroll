import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CSS/Homepage.css'
import { getAllStoriesThunk } from '../store/stories'
import { useHistory } from 'react-router-dom';
import random from './images/random.png'

const Homepage = () => {
    const dispatch = useDispatch()
    const storiesArr = Object.values(useSelector((state) => state?.stories?.allStories))
    const history = useHistory()

    useEffect(() => {

        dispatch(getAllStoriesThunk())

    }, [dispatch])

    const redirectStoryPage = (id) => {
        history.push(`/story/${id}`)
    }

    const randomChoice = () => {
        let storyIDArr = []
        for (let story of storiesArr) {
            storyIDArr.push(story.id)
        }
        let idSelection = storyIDArr[Math.floor(Math.random() * storyIDArr.length)];

        history.push(`/story/${idSelection}`)

    }

    if (storiesArr.length < 1) { return <div></div> }
    return (
        <div className='Homepage_outer'>
            <div className='Homepage_top'>
                <h1 className='Homepage_h1'>Featured Stories</h1>
                <div onClick={() => {
                    randomChoice()
                }}
                    className='Homepage_randomButton'>
                    <img className='Homepage_randomButtonPic' src={random}></img>
                    <div className='Homepage_randomButtonText'>Surprise me!</div>
                </div>
            </div>
            <div className='Homepage_grid'>
                {storiesArr?.map((story) => (
                    <div onClick={() => {
                        redirectStoryPage(story?.id)
                        return
                    }} className='Homepage_storyWrap'>
                        <img
                            alt='Story cover photo'
                            className='Homepage_storyImage' src={story?.image_url}
                            onError={e => { e.currentTarget.src = "http://media.comicbook.com/2018/03/zwru5zwigvntizfbv54x-1088958.jpeg"; }}
                        ></img>
                        < div className='Homepage_storyTitle' > {story?.title}</div>
                    </div>
                ))
                }

            </div >
        </div >
    );
};

export default Homepage;
