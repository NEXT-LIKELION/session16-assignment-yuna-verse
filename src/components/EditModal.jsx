"use client";

import { useEffect, useRef } from "react";
import "./EditModal.css";

function EditModal({ editedText, setEditedText, onSave, onClose }) {
    const inputRef = useRef(null);

    useEffect(() => {
        // 모달이 열리면 입력 필드에 포커스
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSave();
        } else if (e.key === "Escape") {
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>할 일 편집하기</h2>
                </div>
                <div className="modal-body">
                    <input
                        ref={inputRef}
                        type="text"
                        className="edit-input"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="modal-footer">
                    <button className="cancel-button" onClick={onClose}>
                        취소
                    </button>
                    <button className="save-button" onClick={onSave}>
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
