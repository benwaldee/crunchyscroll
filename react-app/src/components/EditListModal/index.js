import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditListForm from "./EditListForm";
import { useDropContext } from '../../context/Dropdown';

function EditListModal({ list, setMoreToggle }) {
    const { showEditListModal, setShowEditListModal } = useDropContext();

    console.log("INEDITLISTMODAL")

    return (
        <>
            <div className="Lists_editList" onClick={() => {
                setMoreToggle(false)
                setShowEditListModal(list)
            }}>
                Rename Crunchylist
            </div>

        </>

    );
}

export default EditListModal;
