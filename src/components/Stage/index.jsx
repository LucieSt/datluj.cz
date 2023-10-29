import React, { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};
 
const Stage = () => {
  const [words, setWords] = useState([generateWord(6), generateWord(6), generateWord(6), generateWord(6)]);
  const [writing, setWriting] = useState('');

  const handleFinish = () => {
    setWords([]);
    setWords([...words.slice(1), generateWord(6)]);
  }

  const handleWritingChange = (newText) => {
    setWriting(newText)
  };

  return (
    <div className="stage">
      {/* <div className="stage__mistakes">Chyb: 0</div> */}
      <div className="stage__words">
        {words.map((word, index) => <Wordbox word={word} key={word} onFinish={handleFinish} active={index === 0} value={writing} onChange={handleWritingChange}/>)}
      </div>
      <div className='stage__paper'>
        <p>{writing}</p>
      </div>
    </div>
  );
};

export default Stage;
