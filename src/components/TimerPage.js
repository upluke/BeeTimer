import React,{useState} from 'react'
import Length from './Length'

const TimerPage = () => {
    const [displayTime, setDisplayTime]=useState(9*60)
    const [breakTime, setBreakTime]=useState(3*60)
    const [sessionTime, setSessionTime]=useState(4*60)
    const [timerOn, setTimerOn]=useState(false)

    const formatTIme=(time)=>{
        let minutes=Math.floor(time/60)
        let seconds=time%60
        console.log(typeof(minutes), seconds)
        return(
            (minutes<10?"0"+minutes: minutes)+":"+(seconds<10?"0"+seconds:seconds)
        )
    }

    const changeTime=(amount, type)=>{
        if (type=="break"){
            if (breakTime<=60&&amount<0){
                return
            }
            setBreakTime((prev)=>prev+amount)
        }else{
            if (sessionTime<=60&&amount<0){
                return
            }
            setSessionTime((prev)=>prev+amount)
            if (!timerOn){
                setDisplayTime(sessionTime+amount)
            }
        }
    }
    return(
    <div>
        <h1>Training Timer</h1>
        <div>
            <Length title={"break length"} changeTime={changeTime} type={"break"} time={breakTime} formatTime={formatTIme} />
            <Length title={"session length"} changeTime={changeTime} type={"sessionTime"} time={sessionTime} formatTime={formatTIme} />
        </div>
        {formatTIme(displayTime)}
        <button>
            {timerOn?(
                <i>pause</i>
            ):(
                <i>play</i>
            )}
        </button>
    </div>
    )
}

export default TimerPage