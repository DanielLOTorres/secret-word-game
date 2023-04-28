import './App.css';

import { useCallback, useEffect, useState } from 'react';

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';


import {wordsList} from './data/words'

const initialPoints = 0

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {

  const [stage, setStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(initialPoints)

  const pickWordAndCategory = useCallback(() =>{
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return{word, category}
  }, [words])


  const startGame = useCallback(() =>{

    clearLetterStates()

    const {word, category} = pickWordAndCategory()
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((i) => i.toLowerCase() )

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setStage(stages[1].name)
  }, [pickWordAndCategory]);

  const verifyLetter = (letter)=>{
    const normalLetter = letter.toLowerCase()

    if (guessedLetters.includes(normalLetter) || wrongLetters.includes(normalLetter)) return

    if(letters.includes(normalLetter)){
      setGuessedLetters([...guessedLetters, normalLetter])
    }else{
      setWrongLetters([...wrongLetters, normalLetter])
      setGuesses((guesses) => guesses - 1)
    }
  }

  const clearLetterStates = ()=>{
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if(guesses <= 0){
      clearLetterStates()
      setStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    if(uniqueLetters.length === guessedLetters.length){
      setScore((actualScore) => actualScore += 100)
      startGame()
    }

  },[guessedLetters, letters, startGame])

  const retry = () =>{
    setGuesses(3)
    setScore(initialPoints)
    setStage(stages[0].name)
  }
  const endGame = () =>{
  }
    

  return (
    <div className="App">
      {stage === 'start' && <StartScreen startGame={startGame}/>}
      {stage === 'game' && <Game 
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        verifyLetter={verifyLetter}
        endGame={endGame}
      />}
      {stage === 'end' && <GameOver retry={retry} score={score}/>}
      
    </div>
  );
}

export default App;
