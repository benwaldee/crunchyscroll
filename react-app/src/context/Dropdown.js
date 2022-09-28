// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const DropContext = React.createContext();
export const useDropContext = () => useContext(DropContext)

export function DropProvider({ children }) {
    const dropRef = useRef();
    const [value, setValue] = useState();
    const [toggleDrop, setToggleDrop] = useState(false);


    useEffect(() => {
        setValue(dropRef.current);
    }, [])

    return (
        <>
            <DropContext.Provider value={{
                value,
                toggleDrop, setToggleDrop
            }}>
                {children}
            </DropContext.Provider>
            <div ref={dropRef} />
        </>
    );
}

// export function Modal({ onClose, children }) {
//     const modalNode = useContext(ModalContext);
//     if (!modalNode) return null;

//     return ReactDOM.createPortal(
//         <div id="modal">
//             <div id="modal-background" onClick={onClose} />
//             <div id="modal-content">
//                 {children}
//             </div>
//         </div>,
//         document.getElementById('modal-root')
//     );
// }
