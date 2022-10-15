import './DeleteStoryDiv.css'
import { useDispatch } from 'react-redux';
import { useDropContext } from '../../context/Dropdown';
import { deleteStoryThunk } from '../../store/stories'

const DeleteStoryForm = ({ setShowDeleteStoryModal, story }) => {
    const dispatch = useDispatch()
    const { dark } = useDropContext()

    const handleDelete = (storyID) => {
        dispatch(deleteStoryThunk(storyID))
        setShowDeleteStoryModal(false)
        // console.log(storyID)
        return
    }


    return (
        <div className={dark ? 'DeleteStoryDiv_wrap' : 'LIGHTDeleteStoryDiv_wrap'}>
            <h1 className={dark ? 'DeleteStoryDiv_h1' : 'LIGHTDeleteStoryDiv_h1'}>Are you sure you want to delete {story.title}?</h1>
            <div className={dark ? 'DeleteStoryDiv_subTitle' : 'LIGHTDeleteStoryDiv_subTitle'}>This action is irreversible</div>
            <div className={dark ? 'DeleteStoryDiv_buttonWrap' : 'LIGHTDeleteStoryDiv_buttonWrap'}>
                <div className={dark ? 'DeleteStoryDiv_delete' : 'LIGHTDeleteStoryDiv_delete'} onClick={() => handleDelete(story.id)}> Delete</div>
                <div className={dark ? 'DeleteStoryDiv_cancel' : 'LIGHTDeleteStoryDiv_cancel'} onClick={() => setShowDeleteStoryModal(false)}> Cancel</div>
            </div>

        </div>
    )
}

export default DeleteStoryForm;
