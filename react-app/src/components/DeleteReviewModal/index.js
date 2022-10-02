import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteReviewPop from "./DeleteReviewPop";
import deleteIco from '../images/delete.png'

function DeleteReviewModal({ reviewID }) {
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);

    return (
        <>
            <img className='Reviews_delete' onClick={() => setShowDeleteReviewModal(true)} src={deleteIco}></img>
            {showDeleteReviewModal && (
                <Modal onClose={() => setShowDeleteReviewModal(false)}>
                    <DeleteReviewPop setShowDeleteReviewModal={setShowDeleteReviewModal} reviewID={reviewID} />
                </Modal>
            )}
        </>

    );
}

export default DeleteReviewModal;
