import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateListForm from "./CreateListForm";


function CreateListModal() {
    const [showAddListForm, setShowAddListForm] = useState(false);

    return (
        <>
            <div className="Lists_addList" onClick={() => setShowAddListForm(true)}>
                CREATE NEW LIST
            </div>
            {showAddListForm && (
                <Modal onClose={() => setShowAddListForm(false)}>
                    <CreateListForm setShowAddListForm={setShowAddListForm} />
                </Modal>
            )}
        </>

    );
}

export default CreateListModal;
