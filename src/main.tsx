import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn.tsx';
import AddFlashCard from './components/AddFlashCard.tsx';
import SignUp from './components/SignUp.tsx';
import Cards from './components/Cards.tsx';
import EditFlashCard from './components/EditFlashCard.tsx';
import App from './App.tsx'
import Flashcard from './components/Flashcard.tsx';
import './index.css'
import Navbar from './components/Navbar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/add" element={<div><Navbar/><AddFlashCard /></div>}></Route>
        <Route path="/cards" element={<div><Navbar/><Cards /></div>}></Route>
        <Route path="/flashcard" element={<div><Navbar/><Flashcard /></div>}></Route>
        <Route path="/edit" element={<div><Navbar/><EditFlashCard /></div>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
