import React, { useState } from 'react';
import './FolderStructure.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type FolderInfoType = {
    _id: string;
    folderName: string;
}

const FolderStructure = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const { data: folders = [], refetch } = useQuery({
        queryKey: ['folders'],
        queryFn: async (): Promise<FolderInfoType[]> => {
            const res = await fetch(`http://localhost:5000/folders`);
            const data = await res.json();
            return data;
        }
    });

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

    refetch();

    return (
        <div>
            <h1>This is folder Structure file</h1>
            <div>
                <div>
                    <span>Root</span>
                    <span onClick={toggleModal} className="addFolder">+ New</span>
                </div>
                {isOpen && (
                    <div className="modal-container">
                        <div className="modal customize-modal">
                            <div className="modal-content">
                                <form onSubmit={handleSubmit}>
                                    <input type="text" name='folderName' />
                                    <button>
                                        Create
                                    </button>
                                </form>
                                <button onClick={toggleModal}>Close Modal</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {
                folders.map(folder => <div className="created-folder">
                    <span>{folder.folderName}</span>
                    <span onClick={toggleModal} className="addFolder">+ New</span>
                </div>)
            }

        </div>
    );
};

export default FolderStructure;