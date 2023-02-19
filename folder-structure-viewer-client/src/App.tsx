import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import FolderStructure from './components/FolderStructure/FolderStructure';

function App() {
  return (
    <div>
      <Header></Header>
      <FolderStructure></FolderStructure>
    </div>
  );
}

export default App;
