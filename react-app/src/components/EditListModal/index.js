import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditListForm from "./EditListForm";
import { useDropContext } from '../../context/Dropdown';

function EditListModal({ list, setMoreToggle }) {
    const { showEditListModal, setShowEditListModal, dark } = useDropContext();



    return (
        <>
            <div className={dark ? "Lists_editList" : "LIGHTLists_editList"} onClick={() => {
                setMoreToggle(false)
                setShowEditListModal(list)
            }}>
                Rename Crunchylist
            </div>

        </>

    );
}

export default EditListModal;
