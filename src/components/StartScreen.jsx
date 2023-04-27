import React from 'react'
import './StartScreen.css'

export default function StartScreen({startGame}) {


  return (
    <div className='start'>
        <h1>Secret Word Game</h1>
        <button onClick={startGame}>Começar o Jogo</button>
        
    </div>
  )
}
