import React from 'react'

export default function GameOver({retry, score}) {
  return (
    <div>
      <h1>
        Game Over!
      </h1>
      <h2>Your Score: <span>{score}</span></h2>
      <button onClick={retry}>Restart</button>
    </div>
  )
}
