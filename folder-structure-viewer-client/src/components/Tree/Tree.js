import React from 'react';
import TreeNode from '../TreeNode/TreeNode';
import './Tree.css'

const Tree = ({ data = [], refetch }) => {

  refetch();

  return (
    <div>
      <ul className="tree-ul">
        {data.map((tree, idx) => (
          <TreeNode refetch={refetch} key={idx} node={tree} />
        ))}
      </ul>
    </div>
  );
};

export default Tree;