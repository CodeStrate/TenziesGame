import Dots from "./Dots"

export default function Die({changeIsHeld, value, isHeld}){

    const styles = {
        backgroundColor: isHeld ? "#21D19F" : "white"
    }

    return (
        <div
        className="die"
        style={styles}
        onClick={changeIsHeld}
        >

            <Dots value={value}/>
        </div>
    )
}