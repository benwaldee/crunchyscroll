import './DeleteStoryDiv.css'
import { useDispatch } from 'react-redux';

import { deleteStoryThunk } from '../../store/stories'

const DeleteStoryForm = ({ setShowDeleteStoryModal, story }) => {
    const dispatch = useDispatch()


    const handleDelete = (storyID) => {
        dispatch(deleteStoryThunk(storyID))
        setShowDeleteStoryModal(false)
        // console.log(storyID)
        return
    }


    return (
        <div className='DeleteStoryDiv_wrap'>
            <h1 className='DeleteStoryDiv_h1'>Are you sure you want to delete {story.title}?</h1>
            <div className='DeleteStoryDiv_subTitle'>This action is irreversible</div>
            <div className='DeleteStoryDiv_buttonWrap'>
                <div className='DeleteStoryDiv_delete' onClick={() => handleDelete(story.id)}> Delete</div>
                <div className='DeleteStoryDiv_cancel' onClick={() => setShowDeleteStoryModal(false)}> Cancel</div>
            </div>

        </div>
    )
}

export default DeleteStoryForm;
