import './Dots.css'
import Five from './dotComponents/Five'
import Four from './dotComponents/Four'
import One from './dotComponents/One'
import Six from './dotComponents/Six'
import Three from './dotComponents/Three'
import Two from './dotComponents/Two'

export default function Dots(props){
    return (
        <div>
            {props.value === 1 && <One />}
            {props.value === 2 && <Two />}
            {props.value === 3 && <Three />}
            {props.value === 4 && <Four />}
            {props.value === 5 && <Five />}
            {props.value === 6 && <Six />}
            
        </div>
    )
}