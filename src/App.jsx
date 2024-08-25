import { useState, useEffect } from 'react'
import './App.css'
import ConfettiController from './ConfettiController'
import Game from './Game'



function App() {

  const [theme, setTheme] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [timer, setTimer] = useState({
    minutes: 0, seconds : 0
  })


    //Timer Effect

    useEffect(() => {
      let interval = null
      if(!hasWon) {
        interval = setInterval(() => {
          setTimer(prevTime => {
            if (prevTime.seconds === 59){
              return {seconds : 0, minutes : prevTime.minutes + 1}
            }else {
              return {...prevTime, seconds : prevTime.seconds + 1}
            }
          })
  
        }, 1000);    // here 1000 = 1s
      } else {
          clearInterval(interval)
      }
  
      return () => clearInterval(interval)
    }, [hasWon])
  
  

  //helper functions to let child control parent state (unified)
  function gameWin(){
    setHasWon(prevState => !prevState)
  }
    
  function resetTime(){
    setTimer({minutes : 0, seconds : 0})
  }



  return (
    <main className={`container ${theme ? "switch" : ""}`}>
      {hasWon && <ConfettiController />}
      <Game
      theme={theme}

      changeTheme={() => setTheme(prevTheme => !prevTheme)}

      hasWon={hasWon}

      setHasWon={() => gameWin()}

      time={timer}

      resetTime={() => resetTime()}/>
    </main>
    
  )
}

export default App
