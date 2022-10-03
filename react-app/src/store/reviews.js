// types
const STORY_REVIEWS = 'reviews/story'
const CLEAR_REVIEWS = 'reviews/clear'
const EDIT_REVIEW = 'review/edit'
const DELETE_REVIEW = 'review/delete'
const ADD_REVIEW = 'review/add'
const VOTE = 'review/vote'

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

export const deleteReview = (reviewID) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewID
    }
}

export const addReview = (addObj) => {
    return {
        type: ADD_REVIEW,
        payload: addObj
    }
}


//DOES NOT UPDATE STATE RELIES ON THUNK CHAIN
export const voteAction = () => {
    return {
        type: VOTE,
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

export const addReviewThunk = (addObj) => async (dispatch) => {
    const response = await fetch('/api/reviews/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addObj)
        })
    if (response.ok) {
        const data = await response.json()
        dispatch(addReview(data))
        return JSON.stringify(data)
    }
}

export const deleteReviewThunk = (reviewID) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewID}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteReview(reviewID));
        return JSON.stringify(reviewID);
    }
}

export const voteThunk = (voteObj) => async (dispatch) => {
    const response = await fetch('/api/reviews/vote',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(voteObj)
        })
    if (response.ok) {
        const data = await response.json()
        dispatch(voteAction())
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
        case DELETE_REVIEW:
            reviews = { ...state, storyReviews: { ...state.storyReviews } }
            delete reviews.storyReviews[Number(action.payload)]
            return reviews
        case ADD_REVIEW:
            reviews = { ...state, storyReviews: { ...state.storyReviews } }
            reviews.storyReviews[action.payload.id] = action.payload
            return reviews
        case VOTE:
            reviews = { ...state, storyReviews: { ...state.storyReviews } }
            return reviews
        default:
            return state;
    }
}

export default reviewsReducer
