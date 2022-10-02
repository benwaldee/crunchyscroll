import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddToListPop from "./AddToListPop";
import { useHistory, useParams } from 'react-router-dom';


function AddToListModal({ listsDict, id, user, story }) {
    const [showAddToListModal, setShowAddToListModal] = useState(false);


    const history = useHistory()
    return (
        <>
            <div className="StoryByID_crunchylistWrap" onClick={() => {
                if (!user) {
                    history.push("/login-signup")
                    console.log('im in here for osme reason')
                    return
                }
                setShowAddToListModal(true)
                return
            }}>
                <div className='StoryByID_crunchylistPlus'>+</div>
                <div className='StoryByID_crunchylistText'>ADD TO CRUNCHYLIST</div>
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
