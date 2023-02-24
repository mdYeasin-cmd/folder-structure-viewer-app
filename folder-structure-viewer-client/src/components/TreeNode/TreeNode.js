import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Tree from '../Tree/Tree';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import './TreeNode.css';
import FolderCreateModal from '../FolderCreateModal/FolderCreateModal';

const TreeNode = ({ node, refetch }) => {

    const [childVisibility, setChildVisibility] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const createToggleModal = (node) => {
        // console.log(node);
        setIsOpen(!isOpen);
    };

    const hasChildren = node.children ? true : false;
    const nodeChildren = node.children;

    return (
        <>
            <li>
                <div className='tree-container'>
                    <div className='tree-container' onClick={(e) => setChildVisibility((v) => !v)}>
                        {
                            hasChildren && (
                                <div
                                    className={`d-tree-toggler ${childVisibility ? 'active' : ''}`}
                                >
                                    <FontAwesomeIcon icon={faCaretRight} />
                                </div>
                            )
                        }

                        <div>
                            <span></span>
                            {node.label}
                        </div>




                    </div >

                    <button>
                        Delete
                    </button>
                    <button onClick={() => createToggleModal(node)}>
                        + New
                    </button>

                </div>

                {
                    hasChildren && childVisibility && <div>
                        {
                            nodeChildren.length === 0 ?
                                <div>No folder found</div> :
                                <ul>
                                    <Tree data={node.children} refetch={refetch} ></Tree>
                                </ul>
                        }
                    </div>
                }



            </li>
            {
                isOpen && <FolderCreateModal
                    childeNode={node}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    createToggleModal={createToggleModal}
                    refetch={refetch}
                />
            }
        </>
    );
};

export default TreeNode;