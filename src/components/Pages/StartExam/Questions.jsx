import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './Questions.css';
import ExamHeader from '../../Header/ExamHeader';

const Questions = ({ id, tokenu, server_key }) => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://test.e-prathibha.com/apis/start_exam?examId=${examId}`, {
          headers: {
            id: id,
            server_key: server_key,
            tokenu: tokenu,
          },
        });
        setQuestions(response.data.data.exam);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchQuestions();
  }, [id, tokenu, server_key, examId]);

  const handleOptionClick = (option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNextQuestion = () => {
    const currentSelectedOption = getCurrentSelectedOption();
    
    if (!currentSelectedOption) {
      const confirmNext = window.confirm('Are you sure you want to next question?');
      
      if (!confirmNext) {
        return;
      }
    }
    
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleFinishExam = () => {
    const data = {
      examId: examId,
      qno: 1,
    };

    axios
      .post('https://test.e-prathibha.com/apis/finishExam', data, {
        headers: {
          id: id,
          server_key: server_key,
          tokenu: tokenu,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex];
  };

  const getCurrentSelectedOption = () => {
    return selectedOptions[currentQuestionIndex];
  };

  if (!Array.isArray(questions) || questions.length === 0) {
    return <div>No Question Paper</div>;
  }

  const currentQuestion = getCurrentQuestion();
  const currentSelectedOption = getCurrentSelectedOption();

  return (
    <div className="container">
      <ExamHeader />
      <div className="paper">
        <div>
          <b>Question</b>
        </div>
        <div className="question">
          <span>{currentQuestion.ExamStat.ques_no}.</span>
          <span>{currentQuestion.Question.question.above}</span>
          <div>
            <b>options</b>
          </div>
          <div className="options">
            <div onClick={() => handleOptionClick('option1')}>
              <input
                type="radio"
                name="option"
                value="option1"
                checked={currentSelectedOption === 'option1'}
              />
              {currentQuestion.Question.option1}
            </div>
            <div onClick={() => handleOptionClick('option2')}>
              <input
                type="radio"
                name="option"
                value="option2"
                checked={currentSelectedOption === 'option2'}
              />
              {currentQuestion.Question.option2}
            </div>
            <div onClick={() => handleOptionClick('option3')}>
              <input
                type="radio"
                name="option"
                value="option3"
                checked={currentSelectedOption === 'option3'}
              />
              {currentQuestion.Question.option3}
            </div>
            <div onClick={() => handleOptionClick('option4')}>
              <input
                type="radio"
                name="option"
                value="option4"
                checked={currentSelectedOption === 'option4'}
              />
              {currentQuestion.Question.option4}
            </div>
          </div>
        </div>
      </div>

      <div>
        {currentQuestionIndex > 0 && (
          <button onClick={handlePreviousQuestion}>Previous</button>
        )}

        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Save & Next</button>
        ) : (
          <h2>NO records Found</h2>
        )}
      </div>
      <div>
        <Link to="/FinishExam">
          <button onClick={handleFinishExam} className='question'>Finish Exam</button>
        </Link>
      </div>
    </div>
  );
};

export default Questions;
