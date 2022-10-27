import './AddToListPop.css'
import './LIGHTAddToListPop.css'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addStoryListThunk } from '../../store/lists.js'
import { getAllStoriesThunk } from '../../store/stories'
import { useDropContext } from '../../context/Dropdown';
import { getUserListsThunk } from '../../store/lists.js'


const AddToListPop = ({ setShowAddToListModal, listsDict, id, story }) => {
    const { dark } = useDropContext()
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

    // console.log(listsDict)

    return (
        <div className={dark ? 'AddToListPop_wrap' : 'LIGHTAddToListPop_wrap'}>
            <div className={dark ? 'AddToListPop_topWrap' : 'LIGHTAddToListPop_topWrap'}>

                <h1 className={dark ? 'AddToListPop_h1' : 'LIGHTAddToListPop_h1'}>Add to Crunchylist</h1>
                <div onClick={() => setShowAddToListModal(false)} className={dark ? 'AddToListPop_close' : 'LIGHTAddToListPop_close'}>X</div>
            </div>
            <div className={dark ? 'AddToListPop_subTitle' : 'LIGHTAddToListPop_subTitle'}>Click on a list below!</div>
            {Object.values(listsDict).filter(list => !list.watchlist) < 1 &&
                <>
                    <div className={dark ? ('AddToListPop_failText AddToListPop_failBorder') : ('LIGHTAddToListPop_failText LIGHTAddToListPop_failBorder')}> You have no lists :( </div>
                    <div className={dark ? 'AddToListPop_failTextsub' : 'LIGHTAddToListPop_failTextsub'}> Click your profile and go to "Crunchylists" to make one!  </div>
                </>
            }
            {Object.values(listsDict).length !== 0 && < div className={dark ? 'AddToListPop_listOuterWrap' : 'LIGHTAddToListPop_listOuterWrap'}>
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
                        className={dark ? 'AddToListPop_listInnerWrap' : 'LIGHTAddToListPop_listInnerWrap'}>
                        <div className={dark ? 'AddToListPop_noPlusWrap' : 'LIGHTAddToListPop_noPlusWrap'}>
                            <div className={dark ? 'AddToListPop_title' : 'LIGHTAddToListPop_title'}>{list.name.length > 25 ? `${list.name.slice(0, 25)}...` : list.name}</div>
                            <div className={dark ? 'AddToListPop_items' : 'LIGHTAddToListPop_items'}>{`${list.stories.length} Items`}</div>
                        </div>
                        {inList && listClickID === list.id && <div className={dark ? 'AddToListPop_erorr' : 'LIGHTAddToListPop_erorr'}>
                            {story.title.length > 25 ? `${story.title.slice(0, 25)}...` : story.title} is already added</div>}
                        <div className={dark ? 'AddToListPop_plus' : 'LIGHTAddToListPop_plus'}>+</div>
                    </div>
                ))}
            </div>
            }

        </div >
    )
}

export default AddToListPop;
