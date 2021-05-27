import React,{useState} from 'react'
import Length from './Length'

const TimerPage = () => {
    const [displayTime, setDisplayTime]=useState(3)
    const [breakTime, setBreakTime]=useState(3)
    const [sessionTime, setSessionTime]=useState(5)
    const [timerOn, setTimerOn]=useState(false)
    const [onBreak, setOnBreak]=useState(false)
    const [breakAudio, setBreakAudio]=useState(new Audio('./breakTime.mp3'))

    const playBreakSound=()=>{
        breakAudio.currentTime=0;
        breakAudio.play()
    }
 
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

    const controlTime=()=>{
        let second =1000;
        let date=new Date().getTime();
        let nextDate=new Date().getTime()+second
        console.log(date,"**",nextDate)
        let onBreakVariable=onBreak
        if(!timerOn){
            let interval=setInterval(()=>{
                date=new Date().getTime()
                if (date>nextDate){
                    setDisplayTime((prev)=>{
                        if(prev<=0 && !onBreakVariable){
                            playBreakSound();
                            onBreakVariable=true;
                            setOnBreak(true);
                            return breakTime
                        }else if(prev<=0 && onBreakVariable){
                            playBreakSound();
                            onBreakVariable=false;
                            setOnBreak(false);
                            return sessionTime
                        }
                        return prev -1
                    })
                    nextDate+=second
                }
            },30)
            localStorage.clear();
            localStorage.setItem('interval-id',interval)
        }
        if(timerOn){
            clearInterval(localStorage.getItem('interval-id'))
        }
        setTimerOn(!timerOn)
    }

    const resetTime=()=>{
        setDisplayTime(9*60)
        setBreakTime(3*60)
        setSessionTime(4*60)
    }

    return(
    <div>
        <h1>Training Timer</h1>
        <div>
            <Length title={"break length"} changeTime={changeTime} type={"break"} time={breakTime} formatTime={formatTIme} />
            <Length title={"session length"} changeTime={changeTime} type={"sessionTime"} time={sessionTime} formatTime={formatTIme} />
        </div>
        <h3>{onBreak?"Break":"session"}</h3>
        {formatTIme(displayTime)}
        <button onClick={controlTime}>
            {timerOn?(
                "pause"
            ):(
                "play"
            )}
        </button>
        <button onClick={resetTime}>
            reset
        </button>
    </div>
    )
}

export default TimerPage