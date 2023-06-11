import React, { useEffect } from 'react';
import ExamHeader from "../../Header/ExamHeader";
// import { useNavigate } from 'react-router-dom';

function FinishExam() {
  // const navigate=useNavigate();

  useEffect(() => {
    backArrow();
  },);

  function backArrow() {
    window.addEventListener('popstate', showAlert);
    window.history.forward();
  }

  function showAlert() {
    alert("Logout")
    window.history.go(0)
    window.location.href="/";
    // navigate("/")
  }

  return (
    <div className='text-center'>
      <ExamHeader />
      <b>FinishExam.</b>
    </div>
  );
} 

export default FinishExam;
