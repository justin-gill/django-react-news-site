import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import NavBar from './components/Navbar'
import Category from "./pages/Category";
import Article from "./pages/Article"
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from "./utils/themes";

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:id' element={<Category />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
