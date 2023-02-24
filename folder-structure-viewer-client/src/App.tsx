import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Tree from './components/Tree/Tree';
import { useQuery } from '@tanstack/react-query';

function App() {

  const { data: folders = [], refetch } = useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/folders`);
      const data = await res.json();
      return data;
    }
  });;

  refetch();

  return (
    <div>
      <Header></Header>
      <Tree refetch={refetch} data={folders} />
    </div>
  );
}

export default App;
