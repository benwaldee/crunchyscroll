// types
const ALL_STORIES = 'stories/get-all'


//actions
const getAllStories = (stories) => {
    return {
        type: ALL_STORIES,
        payload: stories
    }
}


//thunks
export const getAllStoriesThunk = () => async (dispatch) => {
    const response = await fetch('/api/stories/')
    if (response.ok) {
        const data = await response.json()

        console.log('IMA response', data)

        dispatch(getAllStories(data))
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
        default:
            return state;
    }
}

export default storiesReducer
