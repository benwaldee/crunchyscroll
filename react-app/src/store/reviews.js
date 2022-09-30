// types
const STORY_REVIEWS = 'reviews/story'
const CLEAR_REVIEWS = 'reviews/clear'


//actions
const getStoryReviews = (storyReviews) => {
    return {
        type: STORY_REVIEWS,
        payload: storyReviews
    }
}

export const clearReviews = () => {
    return {
        type: CLEAR_REVIEWS,
        payload: {}
    }
}


//thunks
export const getStoryReviewsThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/stories/${id}/reviews`,)
    if (response.ok) {
        const data = await response.json()
        dispatch(getStoryReviews(data))
        return JSON.stringify(data)
    }
}


let initialState = { storyReviews: {} }
const reviewsReducer = (state = initialState, action) => {
    let reviews
    switch (action.type) {
        case STORY_REVIEWS:
            reviews = { ...state, storyReviews: { ...state.storyReviews } }
            reviews.storyReviews = action.payload
            return reviews
        case CLEAR_REVIEWS:
            reviews = { ...state, storyReviews: { ...state.storyReviews } }
            reviews.storyReviews = {}
            return reviews
        default:
            return state;
    }
}

export default reviewsReducer
