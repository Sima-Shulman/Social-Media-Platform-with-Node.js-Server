import React from "react";
import styles from "./Photos.module.css";

const Modal = ({ isOpen, onClose, onSave, currentTitle, setEditedTitle }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3>Edit Photo Title</h3>
                <textarea
                    type="text"
                    value={currentTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Enter new title"
                />
                <div className={styles.modalActions}>
                    <button onClick={onSave} className={styles.saveButton}>Save</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};
export default Modal;