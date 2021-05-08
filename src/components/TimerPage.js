import React,{useState} from 'react'
import Length from './Length'

const TimerPage = () => {
    const [displayTime, setDisplayTime]=useState(9*60)
    const [breakTime, setBreakTime]=useState(3*60)
    const formatTIme=(time)=>{
        let minutes=Math.floor(time/60)
        let seconds=time%60
        console.log(typeof(minutes), seconds)
        return(
            (minutes<10?"0"+minutes: minutes)+":"+(seconds<10?"0"+seconds:seconds)
        )
    }
    return(
    <div>
        <Length title={"break length"} changeTime={null} type={"break"} time={breakTime} formatTime={formatTIme} />
        {formatTIme(displayTime)}
    </div>
    )
}

export default TimerPage