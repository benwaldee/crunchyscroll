import './AddToListPop.css'
import { useDispatch } from 'react-redux';


const AddToListPop = ({ setShowAddToListModal, listsDict, id }) => {
    const dispatch = useDispatch()

    console.log('IN POP', listsDict)

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
                    <div className='AddToListPop_listInnerWrap'>
                        <div className='AddToListPop_noPlusWrap'>
                            <div className='AddToListPop_title'>{list.name}</div>
                            <div className='AddToListPop_items'>{`${list.stories.length} Items`}</div>
                        </div>
                        <div className='AddToListPop_plus'>+</div>
                    </div>
                ))}
            </div>
            }

        </div >
    )
}

export default AddToListPop;
