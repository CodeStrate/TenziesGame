import { useState } from "react"
import Dots from "./Dots"

export default function Die({changeIsHeld, value, isHeld, dieStyle}){
    
    const styles = {
        backgroundColor: isHeld ? "#21D19F" : "white"
    }


    return (
        <div
        className="die"
        style={styles}
        onClick={changeIsHeld}
        >

            {dieStyle ? <Dots value={value}/> : <h3 className="die--value">{value}</h3>}
        </div>
    )
}