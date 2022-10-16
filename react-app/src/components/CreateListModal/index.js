import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateListForm from "./CreateListForm";
import { useDropContext } from '../../context/Dropdown';

function CreateListModal() {
    const { dark } = useDropContext()
    const [showAddListForm, setShowAddListForm] = useState(false);

    return (
        <>
            <div className={dark ? "Lists_addList" : "LIGHTLists_addList"} onClick={() => setShowAddListForm(true)}>
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
