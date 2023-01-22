import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Header from './components/Header'
import Category from "./pages/Category";
import './assets/styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:id' element={<Category />}/>
      </Routes>
    </div>
  );
}

export default App;
