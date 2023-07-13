import { useEffect, useState } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'


export default function Game({theme, changeTheme, hasWon, setHasWon, time, resetTime}){
    
  //States

  const [dice, setDice] = useState(allNewDice())
  const [score, setScore] = useState(0)
  const [dieStyle, setDieStyle] = useState(true)
  

  //TENZIES has 2 winning conditions. all dice are held and all are of the same value/number.


  //effect to sync dice and win states
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const refValue = dice[0].value
    const allSameValue = dice.every(die => die.value === refValue)

    if(allHeld && allSameValue) {
      setHasWon()
    }
  }, [dice])


  //helper
  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }


  function allNewDice(){
    const dieValueArray = []
    for (let i = 0; i < 10; i++) {
      dieValueArray.push(
        generateNewDie()
        )
      }
      return dieValueArray
    }
    
    const diceElements = dice.map((die) => 
    <Die 
    key={die.id}

    value={die.value}

    changeIsHeld={() => changeIsHeld(die.id)}

    isHeld={die.isHeld}

    dieStyle={dieStyle}
    
    lightMode={theme}/>)

    function changeIsHeld(id) {
      setDice(prevDice => {
        return prevDice.map((dice) => {
          return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
        })
      }) 
    }

    function rollDice(){
      if(!hasWon) {
        setDice(prevDie => prevDie.map(die => {
          return die.isHeld ? die :
              generateNewDie()
        }))
        setScore(prevScore => prevScore + 1)
      }else {
        setHasWon()
        setDice(allNewDice())
        setScore(0)
        resetTime()
      }
    }



    return (
        <main className="game-board">
        <div className="game--ui-wrapper">
          <button className='btn style'
          onClick={() => setDieStyle(prevDieStyle => !prevDieStyle)}
          >{dieStyle ? "1" : "•"}</button>
          <h4 className="game--score">Score: {score}</h4>
          <span className="game--timer">{time.minutes > 0 && `${time.minutes}m `}{time.seconds}s</span>
        </div>

          <h1 className="game--title">Tenzies</h1>
          <p className="game--description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
          {diceElements}
          </div>
          <div className="game--ui-wrapper bottom">
          <button 
          onClick={rollDice}
          className='roll-btn'>
            {hasWon ? "New Game" : "Roll"}
            </button>
            <button
            className='btn theme'
            onClick={changeTheme}
            >{theme ? "L" : "D"}</button>
          </div>
    </main>
    )
}