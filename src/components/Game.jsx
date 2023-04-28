import React, { useState, useRef } from "react";
import "./Game.css";

export default function Game({
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  verifyLetter,
}) {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Score: {score}</span>
      </p>
      <h1>Guess the Word:</h1>
      <h3 className="tip">
        Tip: <span>{pickedCategory}</span>
      </h3>
      <p>You have {guesses} left</p>
      <div className="wordContainer">
        {letters.map((l, i) =>
          guessedLetters.includes(l) ? (
            <span className="letter" key={i}>
              {l}
            </span>
          ) : (
            <span className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Guess a letter</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength={1}
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Inserir</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Wrong letters:</p>
        {wrongLetters.map((l, i) => (
          <span key={i}>{l}, </span>
        ))}
        <span></span>
      </div>
    </div>
  );
}
