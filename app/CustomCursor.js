"use client";
import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const mic = document.querySelector('.cur');
    const outer = document.querySelector('.outer');
  
    const handleMouseMove = (e) => {
      if (mic) {
        mic.style.top = `${e.pageY - 10}px`;
        mic.style.left = `${e.pageX - 10}px`;
      }
    };
  
    // Attach event listeners
    // outer.addEventListener('mouseenter', handleMouseEnter);
    // outer.addEventListener('mouseleave', handleMouseLeave);
    outer.addEventListener('mousemove', handleMouseMove);
  
    // Cleanup event listeners on component unmount
    return () => {
      // outer.removeEventListener('mouseenter', handleMouseEnter);
      // outer.removeEventListener('mouseleave', handleMouseLeave);
      outer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return null; // This component does not render anything
};

export default CustomCursor;