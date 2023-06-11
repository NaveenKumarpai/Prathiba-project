import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from "./components/Pages/Login/LoginForm";
import RegistrationForm from "./components/Pages/Register/RegistrationForm";
import VerifyEmail from './components/Pages/VerifyEmail/VerfiyEmail';
import FreeExamList from './components/Pages/Exam/FreeExamList';
import Questions from './components/Pages/StartExam/Questions';
import { useState } from 'react';
import FinishExam from './components/Pages/FinishExam/FinishExam';
// import PageNotFound from './components/Pages/PageNotFound/PageNotFound';







function App() {
  
  const [id, setId] = useState(null);
  const [tokenu, setTokenu] = useState(null);
  
  const serverKey ='3w99V63pW7tJ7vavGXtCKo8cp';
  

  
  return (
    <BrowserRouter className="image">
    {/* <Header/> */}
    <Routes>
  
      <Route path="/"element={<LoginForm setId={setId} setTokenu={setTokenu}/>}/>
      <Route path='/Register' element={<RegistrationForm/>}/> 
      <Route path='/VerifyEmail' element={<VerifyEmail/>}/>
      <Route path="/ExamPage"element={<FreeExamList id={id} tokenu={tokenu} server_key={serverKey} />}/>
      <Route path="/Questions/:examId" element={<Questions id={id} tokenu={tokenu} server_key={serverKey} />}/>
      <Route path="/FinishExam" element={<FinishExam />}/>
      {/* <Route path="*" element={<PageNotFound/>} /> */}
      
    

    </Routes>
    </BrowserRouter>
  )
}

export default App;  