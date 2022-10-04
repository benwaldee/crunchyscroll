import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteListDiv from "./DeleteListDiv";
import { useDropContext } from '../../context/Dropdown';

function DeleteListModal({ list, setMoreToggle }) {
    const { showDeleteListModal, setShowDeleteListModal } = useDropContext();

    return (
        <>
            <div className="Lists_editList" onClick={() => {
                setMoreToggle(false)
                setShowDeleteListModal(list)
            }}>
                Delete Crunchylist
            </div>

        </>

    );
}

export default DeleteListModal;
