import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteStoryDiv from "./DeleteStoryDiv";


function DeleteStoryModal({ story }) {
    const [showDeleteStoryModal, setShowDeleteStoryModal] = useState(false);

    return (
        <>
            <div className="MyStories_storyDelete" onClick={() => setShowDeleteStoryModal(true)}>
                Delete
            </div>
            {showDeleteStoryModal && (
                <Modal onClose={() => setShowDeleteStoryModal(false)}>
                    <DeleteStoryDiv setShowDeleteStoryModal={setShowDeleteStoryModal} story={story} />
                </Modal>
            )}
        </>

    );
}

export default DeleteStoryModal;
