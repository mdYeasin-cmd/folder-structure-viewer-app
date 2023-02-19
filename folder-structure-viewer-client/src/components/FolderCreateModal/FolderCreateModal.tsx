import React from 'react';
import axios from 'axios';

type FolderCreateModalProps = {
    isOpen: true;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    createToggleModal: () => void;
}

const FolderCreateModal = ({ isOpen, setIsOpen, createToggleModal }: FolderCreateModalProps) => {

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            folderName: { value: string };
        };

        const folderName = target.folderName.value;

        axios.post('http://localhost:5000/folders', { folderName })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });


        setIsOpen(!isOpen);

    }

    return (
        <div>
            <div className="modal-container">
                <div className="modal customize-modal">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
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