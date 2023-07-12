import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  //States

  const [dice, setDice] = useState(allNewDice())
  const [hasWon, setHasWon] = useState(false)
  const [score, setScore] = useState(0)
  const [dieStyle, setDieStyle] = useState(true)
  const [timer, setTimer] = useState(0)
  


    function changeDieStyle(){
        setDieStyle(prevDieStyle => !prevDieStyle)
    }


  //TENZIES has 2 winning conditions. all dice are held and all are of the same value/number.


  //effect to sync dice and win states
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const refValue = dice[0].value
    const allSameValue = dice.every(die => die.value === refValue)

    if(allHeld && allSameValue) {
      setHasWon(true)
    }
  }, [dice])

  //Timer Effect

  useEffect(() => {
    let interval = null
    if(!hasWon) {
      interval = setInterval(() => {
          setTimer(timer => timer + 1)
      }, 1000);    // here 1000 = 1s
    } else {
        clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [hasWon])


  //Effect to store Score and Time in localStorage

  useEffect(() => {
      localStorage.setItem('Score', JSON.stringify(score))
      localStorage.setItem('Time', JSON.stringify(timer))
  }, [hasWon])


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
    
    const diceElements = dice.map((die) => <Die key={die.id} value={die.value} changeIsHeld={() => changeIsHeld(die.id)}
    isHeld={die.isHeld}
    dieStyle={dieStyle}/>)

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
        setHasWon(false)
        setDice(allNewDice())
        setScore(0)
        setTimer(0)
      }
    }

    
  return (
    <main>
      {hasWon && <Confetti
      width={1920}
      height={1080} 
      numberOfPieces={200}
      confettiSource={{
        x: 2200 / 2,
        y: 0}}
        />}
        <div className="game-board">
        <div className="game--ui-wrapper">
          <button className='style-btn'
          onClick={changeDieStyle}>{dieStyle ? "1" : "•"}</button>
          <h4 className="game--score">Score: {score}</h4>
          <span className="game--timer">{timer}s</span>
        </div>

          <h1 className="game--title">Tenzies</h1>
          <p className="game--description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
          {diceElements}
          </div>
          <button 
          onClick={rollDice}
          className='roll-btn'>
            {hasWon ? "New Game" : "Roll"}
            </button>
        </div>
    </main>
  )
}

export default App
