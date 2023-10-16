import React, { useEffect, useState } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish, active }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false);
  
  const handleKeyUp = (e) => {
    if (e.key === lettersLeft[0]) {
      setMistake(false);
      console.log('hura', e.key)
      setLettersLeft((prevValue) => prevValue.slice(1))
      if (lettersLeft.length === 1) {
        onFinish();
      };
    } else {
      setMistake(true);
    }
  }

  console.log(mistake)

  useEffect(() => {
    if (active) {
      document.addEventListener('keyup', handleKeyUp);
      return () => document.removeEventListener('keyup', handleKeyUp);
    }
  },[lettersLeft, active]);
  
  return (
    <div className={mistake ? "wordbox wordbox--mistake" : "wordbox"}>{lettersLeft}</div>
  );
};

export default Wordbox;
