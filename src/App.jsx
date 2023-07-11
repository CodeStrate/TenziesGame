import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [won, setWon] = useState(false)
  const [count, setCount] = useState(0)


  //TENZIES has 2 winning conditions. all dice are held and all are of the same value/number.


  //effect to sync states
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const refValue = dice[0].value
    const allSameValue = dice.every(die => die.value === refValue)

    if(allHeld && allSameValue) {
      setWon(true)
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
    
    const diceElements = dice.map((die) => <Die key={die.id} value={die.value} changeIsHeld={() => changeIsHeld(die.id)}
    isHeld={die.isHeld}/>)

    function changeIsHeld(id) {
      setDice(prevDice => {
        return prevDice.map((dice) => {
          return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
        })
      }) 
    }

    function rollDice(){
      if(!won) {
        setDice(prevDie => prevDie.map(die => {
          return die.isHeld ? die :
              generateNewDie()
        }))
        setCount(prevCount => prevCount + 1)
      }else {
        setWon(false)
        setDice(allNewDice())
        setCount(0)
      }
    }

    
  return (
    <main>
      {won && <Confetti
      width={1920}
      height={1080} 
      numberOfPieces={200}
      confettiSource={{
        x: 2200 / 2,
        y: 0}}
        />}
        <div className="game-board">
          <h1 className="game--title">Tenzies</h1>
          <p className="game--description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
          {diceElements}
          </div>
          <h4 className="roll--count">Number of rolls: {count}</h4>
          <button 
          onClick={rollDice}
          className='roll-btn'>
            {won ? "New Game" : "Roll"}
            </button>
        </div>
    </main>
  )
}

export default App
