import React from 'react';
import './FolderCreateModal.css';
import axios from "axios";

const FolderCreateModal = ({ childeNode, refetch, isOpen, setIsOpen, createToggleModal }) => {

    const handleAddFolder = (event) => {
        event.preventDefault();

        // console.log(childeNode);

        console.log(childeNode.label);
        const parentLabel = childeNode.label;
        const folderName = event.target.folderName.value;
        
        
        const newFolderDir = {
            label: folderName,
            icon: 'fa fa-folder',
            children: []
        }

        const passingData = {
            folder: newFolderDir,
            pathName: childeNode.pathName,
        }

        console.log("passingData", passingData);

        axios.patch('http://localhost:5000/folders', passingData)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));

        setIsOpen(!isOpen);
        

    }

    refetch();

    return (
        <div>

            <div className="modal-container">
                <h2>{childeNode.label}</h2>
                <div className="modal customize-modal">
                    <div className="modal-content">
                        <form onSubmit={handleAddFolder}>
                            <input type="text" name='folderName' />

                            <div>
                                <button className="btn">Create</button>
                                <span className="btn" onClick={createToggleModal}>Cancel</span>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FolderCreateModal;