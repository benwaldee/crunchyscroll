import './DeleteListDiv.css'
import './LIGHTDeleteListDiv.css'
import { useDispatch } from 'react-redux';
import { useDropContext } from '../../context/Dropdown';
import { deleteListThunk } from '../../store/lists'

const DeleteListDiv = ({ setShowDeleteListModal, showDeleteListModal }) => {
    const { dark } = useDropContext()
    const dispatch = useDispatch()


    const handleDelete = (listID) => {
        dispatch(deleteListThunk(listID))
        setShowDeleteListModal(false)
        // console.log(ListID)
        return
    }


    return (
        <div className={dark ? 'DeleteListDiv_wrap' : 'LIGHTDeleteListDiv_wrap'}>
            <h1 className={dark ? 'DeleteListDiv_h1' : 'LIGHTDeleteListDiv_h1'}>Are you sure you want to delete your list?</h1>
            <div className={dark ? 'DeleteListDiv_subTitle' : 'LIGHTDeleteListDiv_subTitle'}>This action is irreversible</div>
            <div className={dark ? 'DeleteListDiv_buttonWrap' : 'LIGHTDeleteListDiv_buttonWrap'}>
                <div className={dark ? 'DeleteListDiv_delete' : 'LIGHTDeleteListDiv_delete'} onClick={() => handleDelete(showDeleteListModal.id)}> Delete</div>
                <div className={dark ? 'DeleteListDiv_cancel' : 'LIGHTDeleteListDiv_cancel'} onClick={() => setShowDeleteListModal(false)}> Cancel</div>
            </div>

        </div>
    )
}

export default DeleteListDiv;
