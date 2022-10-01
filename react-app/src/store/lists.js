// types
const USER_LISTS = 'lists/user'
const ADD_STORY_LIST = 'lists/addstory'
const REMOVE_STORY_LIST = 'lists/removestory'


//actions
const getUserLists = (userLists) => {
    return {
        type: USER_LISTS,
        payload: userLists
    }
}

const addStoryList = ({ }) => {
    //does not update state, state is just refreshed
    return {
        type: ADD_STORY_LIST,
        payload: {}
    }
}

const removeStoryList = ({ }) => {
    //does not update state, state is just refreshed
    return {
        type: REMOVE_STORY_LIST,
        payload: {}
    }
}


//thunks
export const getUserListsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/lists/user`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getUserLists(data))
        return JSON.stringify(data)
    }
}

export const addStoryListThunk = (updateObj) => async (dispatch) => {
    const response = await fetch(`/api/lists/addstory`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateObj)
        })
    if (response.ok) {
        const data = await response.json()
        dispatch(addStoryList(data))
        return JSON.stringify(data)
    }
}

export const removeStoryListThunk = (updateObj) => async (dispatch) => {
    const response = await fetch(`/api/lists/removestory`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateObj)
        })
    if (response.ok) {
        const data = await response.json()
        dispatch(addStoryList(data))
        return JSON.stringify(data)
    }
}



let initialState = { userLists: {} }
const listsReducer = (state = initialState, action) => {
    let lists
    switch (action.type) {
        case USER_LISTS:
            lists = { ...state, userLists: { ...state.userLists } }
            lists.userLists = action.payload
            return lists
        case ADD_STORY_LIST || REMOVE_STORY_LIST:
            //does not change state, state will be refreshed w other thunks
            lists = { ...state, userLists: { ...state.userLists } }
            return lists
        default:
            return state;
    }
}

export default listsReducer