import './DeleteReviewPop.css'
import { useDispatch } from 'react-redux';
import { useDropContext } from '../../context/Dropdown';
import { deleteReviewThunk } from '../../store/reviews'

const DeleteReviewPop = ({ setShowDeleteReviewModal, reviewID }) => {
    const dispatch = useDispatch()
    const { dark } = useDropContext()

    const handleDelete = (reviewID) => {
        dispatch(deleteReviewThunk(reviewID))
        setShowDeleteReviewModal(false)
        // console.log(ReviewID)
        return
    }


    return (
        <div className={dark ? 'DeleteReviewPop_wrap' : 'LIGHTDeleteReviewPop_wrap'}>
            <h1 className={dark ? 'DeleteReviewPop_h1' : 'LIGHTDeleteReviewPop_h1'}>Are you sure you want to delete your review?</h1>
            <div className={dark ? 'DeleteReviewPop_subTitle' : 'LIGHTDeleteReviewPop_subTitle'}>This action is irreversible</div>
            <div className={dark ? 'DeleteReviewPop_buttonWrap' : 'LIGHTDeleteReviewPop_buttonWrap'}>
                <div className={dark ? 'DeleteReviewPop_delete' : 'LIGHTDeleteReviewPop_delete'} onClick={() => handleDelete(reviewID)}> Delete</div>
                <div className={dark ? 'DeleteReviewPop_cancel' : 'LIGHTDeleteReviewPop_cancel'} onClick={() => setShowDeleteReviewModal(false)}> Cancel</div>
            </div>

        </div>
    )
}

export default DeleteReviewPop;
