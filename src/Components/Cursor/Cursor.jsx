import React from 'react'
import { useState } from 'react';
import './Cursor.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Cursor = () => {

    let [mousePosition, setMousePosition] = useState({x:0, y:0-100});

    // Here add gsap for mouse cursor
  useGSAP(()=>{
    const mouseMove = (e)=>{
      setMousePosition({
        x: e.clientX,
        y: e.clientY-120
      })
    }
    window.addEventListener("mousemove",mouseMove);

    gsap.to(".mouseCr",{
      x: mousePosition.x,
      y: mousePosition.y,
    })
  },[mousePosition]);

  return (
    <>
      <span className='mouseCr'></span>
    </>
  )
}

export default Cursor
