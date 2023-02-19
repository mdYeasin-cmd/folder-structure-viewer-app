import React from 'react';
import { FolderInfoType } from '../FolderStructure/FolderStructure';
import './FolderDeleteModal.css';

type FolderDeleteModalProps = {
    folderInfo: FolderInfoType | null;
    isDelete: boolean;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const FolderDeleteModal = ({ folderInfo, isDelete, setIsDelete }: FolderDeleteModalProps) => {
    
    const handleDelete = () => {

        

        setIsDelete(!isDelete);
    }

    return (
        <div>
            <div className="modal-container">
                <div className="modal customize-modal">
                    <div className="modal-content">
                        
                        <h2>Are you sure you want to delete {folderInfo?.folderName}?</h2>

                        <div>   
                            <span onClick={() => setIsDelete(!isDelete)} className="delete-btn">Cancel</span>
                            <span onClick={handleDelete} className="delete-btn">Delete</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FolderDeleteModal;