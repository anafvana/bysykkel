import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div id="app">
      <Navbar/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
