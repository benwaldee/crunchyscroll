import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddToListPop from "./AddToListPop";
import { useHistory, useParams } from 'react-router-dom';
import { useDropContext } from '../../context/Dropdown';


function AddToListModal({ listsDict, id, user, story }) {
    const { dark } = useDropContext()
    const [showAddToListModal, setShowAddToListModal] = useState(false);


    const history = useHistory()
    return (
        <>
            <div className={dark ? "StoryByID_crunchylistWrap" : "LIGHTStoryByID_crunchylistWrap"} onClick={() => {
                if (!user) {
                    history.push("/login-signup")

                    return
                }
                setShowAddToListModal(true)
                return
            }}>
                <div className={dark ? 'StoryByID_crunchylistPlus' : 'LIGHTStoryByID_crunchylistPlus'}>+</div>
                <div className={dark ? 'StoryByID_crunchylistText' : 'LIGHTStoryByID_crunchylistText'}>ADD TO CRUNCHYLIST</div>
            </div>
            {showAddToListModal && (
                <Modal onClose={() => setShowAddToListModal(false)}>
                    <AddToListPop setShowAddToListModal={setShowAddToListModal} listsDict={listsDict} id={id} story={story} />
                </Modal>
            )}
        </>

    );
}

export default AddToListModal;
