import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteReviewPop from "./DeleteReviewPop";
import deleteIco from '../images/delete.png'
import { useDropContext } from '../../context/Dropdown';

function DeleteReviewModal({ reviewID }) {
    const { dark } = useDropContext()
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);

    return (
        <>
            <img className={dark ? 'Reviews_delete' : 'LIGHTReviews_delete'} onClick={() => setShowDeleteReviewModal(true)} src={deleteIco}></img>
            {showDeleteReviewModal && (
                <Modal onClose={() => setShowDeleteReviewModal(false)}>
                    <DeleteReviewPop setShowDeleteReviewModal={setShowDeleteReviewModal} reviewID={reviewID} />
                </Modal>
            )}
        </>

    );
}

export default DeleteReviewModal;
