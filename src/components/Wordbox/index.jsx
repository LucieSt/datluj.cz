import React, { useEffect, useState } from 'react';
import { playSound } from '../../sound-effect';
import './style.css';

const Wordbox = ({ word, onFinish, active, value, onChange }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false);
  
  const handleKeyUp = (e) => {
    onChange(value + e.key);
    if (e.key === lettersLeft[0]) {
      playSound('typeSound');
      setMistake(false);
      setLettersLeft((prevValue) => prevValue.slice(1))
      if (lettersLeft.length === 1) {
        playSound('doneSound');
        onChange(value + e.key + ' ')
        onFinish();
      };
    } else {
      playSound('wrongTypeSound');
      setMistake(true);
    }
  }

  useEffect(() => {
    if (active) {
      document.addEventListener('keyup', handleKeyUp);
      return () => document.removeEventListener('keyup', handleKeyUp);
    }
  },[lettersLeft, active]);

  let classValue = "wordbox";
  if (active) {
    classValue = "wordbox wordbox--active"
  }
  
  return (
    <div className={mistake ? classValue + " wordbox--mistake" : classValue}>{lettersLeft}</div>
  );
};

export default Wordbox;
