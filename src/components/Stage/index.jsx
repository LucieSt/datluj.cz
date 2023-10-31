import React, { useState, useEffect } from 'react';
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
  const [wordsNumber, setWordsNumber] = useState(3);
  const [words, setWords] = useState([generateWord(3), generateWord(3), generateWord(3), generateWord(3)]);
  const [writing, setWriting] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [wordsFinished, setWordsFinished] = useState(5)
  const [startGame, setStartGame] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60)
  const [text, setText] = useState(false)

  useEffect(() => {
    let timerId;
    if (startGame) {
      const countdown = () => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          setText(true);
          clearInterval(timerId);
          setStartGame(false);
          setTimeLeft(60);
        }
      };

      timerId = setInterval(countdown, 1000);
    }

    return () => clearInterval(timerId);
  }, [startGame, timeLeft]);

  const handleFinish = () => {
    if (wordsFinished%5 == 0 && wordsNumber < 20) {
      setWordsNumber(wordsNumber+1)
    }
    setWordsFinished((prevWordsFinished) => prevWordsFinished + 1)
    setWords([]);
    setWords([...words.slice(1), generateWord(wordsNumber)]);
  }

  const handleWritingChange = (newText) => {
    setWriting(newText)
  };

  const handleMistakeChange = () => {
    setMistakes((prevMistakes) => prevMistakes + 1);
  }

  return (
    <div className="stage">
      {!startGame &&
        <div>
          <h1 className="stage__headline">Magicky psaci stroj</h1>
          <p>Zapni si zvuk a pro start hry klikni na tlacitko:<br/><br/>Mas 1 minutu!</p>
          <button className="stage__button" onClick={() => {
              setText(false);
              setWriting('');
              setMistakes(0);
              setStartGame(true);
            }}>ZACIT HRU
          </button>
        </div>
      }
      {startGame && <div className="stage__words">
        {words.map((word, index) => <Wordbox
        word={word}
        key={word}
        onFinish={handleFinish}
        active={index === 0}
        text={writing}
        onTextChange={handleWritingChange}
        onMistakeChange={handleMistakeChange}
        />)}
      </div>}
      <div className='stage__paper'>
        <p className='stage__paper_mistakes'>pocet chyb: {mistakes}</p>
        <p className='stage__paper_text'>{writing}</p>
        {startGame && <div className="stage__counter">00 : {timeLeft}</div>}
        {text && <p className='Stage__paper_outro'>Skvele! Chyb jsi udelal {mistakes}, to neni spatne!!</p>}
      </div>
    </div>
  );
};

export default Stage;
