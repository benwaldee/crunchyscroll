import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { useDropContext } from '../context/Dropdown';
const ModalContext = React.createContext();

export function ModalProvider({ children }) {

    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal({ onClose, children }) {
    const { dark } = useDropContext()
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id={dark ? "modal" : "LIGHTmodal"}>
            <div id={dark ? "modal-background" : "LIGHTmodal-background"} onClick={onClose} />
            <div id={dark ? "modal-content" : "LIGHTmodal-content"} >{children}</div>
        </div>,
        modalNode
    );
}
