// types
const STORY_REVIEWS = 'reviews/story'
const CLEAR_REVIEWS = 'reviews/clear'
const EDIT_REVIEW = 'review/edit'


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

export const editReview = (updateObj) => {
    return {
        type: EDIT_REVIEW,
        payload: updateObj
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

export const editReviewThunk = (updateObj, revID) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${revID}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateObj)
        })
    if (response.ok) {
        const data = await response.json()
        dispatch(editReview(data))
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
        case EDIT_REVIEW:
            reviews = { ...state, storyReviews: { ...state.storyReviews } }
            reviews.storyReviews[action.payload.id] = action.payload
            return reviews
        default:
            return state;
    }
}

export default reviewsReducer
