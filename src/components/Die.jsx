import { useState } from "react"
import Dots from "./Dots"

export default function Die({changeIsHeld, value, isHeld, dieStyle, lightMode}){
    
    const holdColor = lightMode ? "#45B69C" : "#21D19F"

    const styles = {
        backgroundColor: isHeld ? holdColor : "var(--die-color)"
    }


    return (
        <div
        className={`die ${lightMode ? "switch" : ""}`}
        style={styles}
        onClick={changeIsHeld}
        >

            {dieStyle ? <Dots value={value}/> : <h3 className="die--value">{value}</h3>}
        </div>
    )
}