import './Dots.css'
import Five from './dotComponents/Five'
import Four from './dotComponents/Four'
import One from './dotComponents/One'
import Six from './dotComponents/Six'
import Three from './dotComponents/Three'
import Two from './dotComponents/Two'

export default function Dots({value}){
    return (
        <div>
            {value === 1 && <One />}
            {value === 2 && <Two />}
            {value === 3 && <Three />}
            {value === 4 && <Four />}
            {value === 5 && <Five />}
            {value === 6 && <Six />}
            
        </div>
    )
}