import './DeleteListDiv.css'
import { useDispatch } from 'react-redux';

import { deleteListThunk } from '../../store/lists'

const DeleteListDiv = ({ setShowDeleteListModal, showDeleteListModal }) => {
    const dispatch = useDispatch()


    const handleDelete = (listID) => {
        dispatch(deleteListThunk(listID))
        setShowDeleteListModal(false)
        // console.log(ListID)
        return
    }


    return (
        <div className='DeleteListDiv_wrap'>
            <h1 className='DeleteListDiv_h1'>Are you sure you want to delete your list?</h1>
            <div className='DeleteListDiv_subTitle'>This action is irreversible</div>
            <div className='DeleteListDiv_buttonWrap'>
                <div className='DeleteListDiv_delete' onClick={() => handleDelete(showDeleteListModal.id)}> Delete</div>
                <div className='DeleteListDiv_cancel' onClick={() => setShowDeleteListModal(false)}> Cancel</div>
            </div>

        </div>
    )
}

export default DeleteListDiv;
