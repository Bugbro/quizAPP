import React, { useState, useRef } from 'react';
import './Quiz.css';
import {questions} from '../../assets/questions';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP);
// Register the SplitText plugin
gsap.registerPlugin(SplitText);


const quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(questions[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  


  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let option_array = [Option1,Option2,Option3,Option4];
  
  // gsap for head animation
  useGSAP(()=>{
    const split = new SplitText(".headingGsap",{ type:"chars,words"});
    gsap.from(split.chars,{
      x: 150,
      opacity: 0,
      duration: 4, 
      ease: "power4",
      stagger: 0.04
    });
    gsap.to(split.chars,{
    opacity: 1,
    duration: 4, 
    ease: "back",
    stagger: 0.15
    });
  })

  const checkAns = (e, ans) =>{
    if(lock === false){
      setLock(true);
      if(question.ans===ans){
        e.target.classList.add("correct");
        setScore(prev => prev+1);
        console.log(score);
        
      }
      else{
        e.target.classList.add("incorrect")
        option_array[question.ans-1].current.classList.add("correct");
      }
      
    }
  }
  const next =()=>{
    if(lock===true){
      if(index === questions.length-1){
        setResult(true);
        return 0;
      }
      setLock(false);
      setIndex(++index);
      setQuestion(questions[index]);
      option_array.map((value)=>{
        value.current.classList.remove("correct");
        value.current.classList.remove("incorrect");
        return null;
      })
    }
  }
  // reset button
  const reset = ()=>{
    setIndex(0);
    setQuestion(questions[index]);
    setLock(false);
    setScore(0);
    setResult(false);
  }
   

  return (
    <div className='container'>
      <h1 className='headingGsap'>Let's Test your Skill :<br></br>
        Quiz App</h1>
      <hr/>
      {/* Ternary operator here for result */}
      {result ? 
        <>
        <h2>Your Score : {score} out of {questions.length}</h2>
        <button onClick={reset}>Reset</button>
        </> 
        :
        <>
        <h2>{index+1}. {question.question}</h2>
        <ul>
          <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
          <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
          <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
          <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index+1} of {questions.length}</div>
        </>
      }
      
    </div>
  )
}

export default quiz
