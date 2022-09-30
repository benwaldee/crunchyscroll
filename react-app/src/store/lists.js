// types
const USER_LISTS = 'lists/user'


//actions
const getUserLists = (userLists) => {
    return {
        type: USER_LISTS,
        payload: userLists
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


let initialState = { userLists: {} }
const listsReducer = (state = initialState, action) => {
    let lists
    switch (action.type) {
        case USER_LISTS:
            lists = { ...state, userLists: { ...state.userLists } }
            lists.userLists = action.payload
            return lists
        default:
            return state;
    }
}

export default listsReducer
