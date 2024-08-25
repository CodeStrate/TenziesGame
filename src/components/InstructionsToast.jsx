import './toasty.css'
export default function InstructionToast(){

    return (
        <>
        <strong className="toastTitle">Welcome to Tenzies</strong>
        <p className="toastDesc">Here are the instructions..</p>
        <div className="btn-toastContainer">
        <span className="btn-demo">1</span>
        <p className="toastDesc">This button toggles the Die Style</p>
        </div>
        <div className="btn-toastContainer">
        <span className="btn-demo">D</span>
        <p className="toastDesc">Toggles Theme (Light/Dark)</p>
        </div>
        <div className="btn-toastContainer">
        <span className="btn-demo">c</span>
        <p className="toastDesc">Clears best score and time</p>
        </div>
        </>
    )
}