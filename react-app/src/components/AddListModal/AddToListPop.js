import './AddToListPop.css'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addStoryListThunk } from '../../store/lists.js'
import { getAllStoriesThunk } from '../../store/stories'

import { getUserListsThunk } from '../../store/lists.js'


const AddToListPop = ({ setShowAddToListModal, listsDict, id, story }) => {
    const dispatch = useDispatch()

    const [inList, setInList] = useState(false)
    const [listClickID, setListClickID] = useState(false)

    const handleAddToList = (updateObj) => {
        setListClickID(updateObj.list.id)
        for (let storyID of updateObj.list.stories) {
            if (Number(storyID) === Number(updateObj.story_id)) {
                setInList(true)
                // setTimeout(() => {
                //     setInList(false)
                // }, 2000)
                return
            }
        }
        dispatch(addStoryListThunk(
            {
                story_id: updateObj.story_id,
                list_id: updateObj.list.id
            }
        ))
            .then(() => dispatch(getAllStoriesThunk()))
            .then(() => dispatch(getUserListsThunk()))
        setShowAddToListModal(false)
    }

    return (
        <div className='AddToListPop_wrap'>
            <div className='AddToListPop_topWrap'>

                <h1 className='AddToListPop_h1'>Add to Crunchylist</h1>
                <div onClick={() => setShowAddToListModal(false)} className='AddToListPop_close'>X</div>
            </div>
            <div className='AddToListPop_subTitle'>Click on a list below!</div>
            {Object.values(listsDict).length === 0 &&
                <>
                    <div className='AddToListPop_failText'> You have no lists :( </div>
                    <div className='AddToListPop_failText'> Click your profile and go to "Crunchylists" to make one!  </div>
                </>
            }
            {Object.values(listsDict).length !== 0 && < div className='AddToListPop_listOuterWrap'>
                {Object.values(listsDict).filter(list => !list.watchlist).map((list) => (
                    <div
                        onClick={() => {

                            handleAddToList(
                                {
                                    story_id: Number(id),
                                    list
                                }
                            )

                            return
                        }}
                        className='AddToListPop_listInnerWrap'>
                        <div className='AddToListPop_noPlusWrap'>
                            <div className='AddToListPop_title'>{list.name}</div>
                            <div className='AddToListPop_items'>{`${list.stories.length} Items`}</div>
                        </div>
                        {inList && listClickID === list.id && <div className='AddToListPop_erorr'>{story.title} is already added</div>}
                        <div className='AddToListPop_plus'>+</div>
                    </div>
                ))}
            </div>
            }

        </div >
    )
}

export default AddToListPop;
