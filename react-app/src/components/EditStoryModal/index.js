import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditStoryForm from "./EditStoryForm";


function EditStoryModal({ story }) {
    const [showEditStoryModal, setShowEditStoryModal] = useState(false);

    return (
        <>
            <div className="MyStories_storyEdit" onClick={() => setShowEditStoryModal(true)}>
                Edit
            </div>
            {showEditStoryModal && (
                <Modal onClose={() => setShowEditStoryModal(false)}>
                    <EditStoryForm setShowEditStoryModal={setShowEditStoryModal} story={story} />
                </Modal>
            )}
        </>

    );
}

export default EditStoryModal;
