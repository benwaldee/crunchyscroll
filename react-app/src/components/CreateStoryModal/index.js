import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateStoryForm from "./CreateStoryForm";


function CreateStoryModal() {
    const [showAddStoryModal, setshowAddStoryModal] = useState(false);

    return (
        <>
            <div className="MyStories_addStory" onClick={() => setshowAddStoryModal(true)}>
                Add
            </div>
            {showAddStoryModal && (
                <Modal onClose={() => setshowAddStoryModal(false)}>
                    <CreateStoryForm setshowAddStoryModal={setshowAddStoryModal} />
                </Modal>
            )}
        </>

    );
}

export default CreateStoryModal;
