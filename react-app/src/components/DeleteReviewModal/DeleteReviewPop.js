import './DeleteReviewPop.css'
import { useDispatch } from 'react-redux';

import { deleteReviewThunk } from '../../store/reviews'

const DeleteReviewPop = ({ setShowDeleteReviewModal, reviewID }) => {
    const dispatch = useDispatch()


    const handleDelete = (reviewID) => {
        dispatch(deleteReviewThunk(reviewID))
        setShowDeleteReviewModal(false)
        // console.log(ReviewID)
        return
    }


    return (
        <div className='DeleteReviewPop_wrap'>
            <h1 className='DeleteReviewPop_h1'>Are you sure you want to delete your review?</h1>
            <div className='DeleteReviewPop_subTitle'>This action is irreversible</div>
            <div className='DeleteReviewPop_buttonWrap'>
                <div className='DeleteReviewPop_delete' onClick={() => handleDelete(reviewID)}> Delete</div>
                <div className='DeleteReviewPop_cancel' onClick={() => setShowDeleteReviewModal(false)}> Cancel</div>
            </div>

        </div>
    )
}

export default DeleteReviewPop;
