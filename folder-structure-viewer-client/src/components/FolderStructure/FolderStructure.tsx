import React, { useState } from 'react';
import './FolderStructure.css';

export type FolderInfoType = {
    _id: string;
    folderName: string;
}

const FolderStructure = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [folderInfo, setFolderInfo] = useState<FolderInfoType | null>(null);
    const [toggle, setToggle] = useState<boolean>(false);

    const createToggleModal = () => {
        setIsOpen(!isOpen);
    };

    const deleteToggleModal = (folder: FolderInfoType) => {
        setIsDelete(!isDelete);
        setFolderInfo(folder);
    };

    return (
        <div className="container">

            

            {/* <div>
                <ul id="myUL">
                    <li><span className="caret">Beverages</span>
                        <ul className="nested">
                            <li>Water</li>
                            <li>Coffee</li>
                            <li><span className="caret">Tea</span>
                                <ul className="nested">
                                    <li>Black Tea</li>
                                    <li>White Tea</li>
                                    <li><span className="caret">Green Tea</span>
                                        <ul className="nested">
                                            <li>Sencha</li>
                                            <li>Gyokuro</li>
                                            <li>Matcha</li>
                                            <li>Pi Lo Chun</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

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
            } */}

        </div>
    );
};

export default FolderStructure;