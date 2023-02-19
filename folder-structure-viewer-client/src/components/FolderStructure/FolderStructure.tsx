import React, { useState } from 'react';
import './FolderStructure.css';
import { useQuery } from '@tanstack/react-query';
import FolderCreateModal from '../FolderCreateModal/FolderCreateModal';
import FolderDeleteModal from '../FolderDeleteModal/FolderDeleteModal';

export type FolderInfoType = {
    _id: string;
    folderName: string;
}

const FolderStructure = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [folderInfo, setFolderInfo] = useState<FolderInfoType | null>(null);

    const createToggleModal = () => {
        setIsOpen(!isOpen);
    };

    const deleteToggleModal = (folder: FolderInfoType) => {
        setIsDelete(!isDelete);
        setFolderInfo(folder);
    };

    const { data: folders = [], refetch } = useQuery({
        queryKey: ['folders'],
        queryFn: async (): Promise<FolderInfoType[]> => {
            const res = await fetch(`http://localhost:5000/folders`);
            const data = await res.json();
            return data;
        }
    });

    refetch();

    return (
        <div className="container">
            <div>
                <div>
                    <span>Root</span>
                    <span onClick={createToggleModal} className="addFolder">+ New</span>
                </div>
                {isOpen && <FolderCreateModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    createToggleModal={createToggleModal}
                ></FolderCreateModal>}
            </div>

            {
                folders.map(folder => <div className="created-folder">
                    <span>{folder.folderName}</span>
                    <div>
                        <span onClick={() => deleteToggleModal(folder)} className="addFolder">Delete</span>
                        <span onClick={createToggleModal} className="addFolder">+ New</span>
                    </div>
                </div>)
            }

            {
                isDelete && <FolderDeleteModal
                    folderInfo={folderInfo}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                ></FolderDeleteModal>
            }

        </div>
    );
};

export default FolderStructure;