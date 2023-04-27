import React from 'react'

export default function GameOver({retry, score}) {
  return (
    <div>
      <h1>
        Fim de jogo
      </h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>Reiniciar Jogo</button>
    </div>
  )
}
