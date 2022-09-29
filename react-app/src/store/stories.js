// types
const ALL_STORIES = 'stories/get-all'
const CREATE_STORY = 'stories/create'
const EDIT_STORY = 'stories/edit'


//actions
const getAllStories = (stories) => {
    return {
        type: ALL_STORIES,
        payload: stories
    }
}

const createStory = (newStory) => {
    return {
        type: CREATE_STORY,
        payload: newStory
    }
}

const editStory = (editStory) => {
    return {
        type: EDIT_STORY,
        payload: editStory
    }
}


//thunks
export const getAllStoriesThunk = () => async (dispatch) => {
    const response = await fetch('/api/stories/')
    if (response.ok) {
        const data = await response.json()
        dispatch(getAllStories(data))
        return JSON.stringify(data)
    }
}

export const createStoryThunk = (newStory) => async (dispatch) => {
    const response = await fetch('/api/stories/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStory)
        })
    if (response.ok) {
        const data = await response.json()
        dispatch(createStory(data))
        return JSON.stringify(data)
    }
}

export const editStoryThunk = (editedStory) => async (dispatch) => {
    const response = await fetch('/api/stories/',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedStory)
        })
    if (response.ok) {
        const data = await response.json()
        dispatch(editStory(data))
        return JSON.stringify(data)
    }
}

let initialState = { allStories: {} }
const storiesReducer = (state = initialState, action) => {
    let stories
    console.log('IMA ACTION', action)
    switch (action.type) {
        case ALL_STORIES:
            stories = { ...state, allStories: { ...state.allStories } }
            stories.allStories = action.payload
            return stories
        case CREATE_STORY:
            stories = { ...state, allStories: { ...state.allStories } }
            let newStory = action.payload
            stories.allStories[newStory.id] = newStory
            return stories
        case EDIT_STORY:
            stories = { ...state, allStories: { ...state.allStories } }
            let editStory = action.payload
            stories.allStories[editStory.id] = editStory
            return stories
        default:
            return state;
    }
}

export default storiesReducer
