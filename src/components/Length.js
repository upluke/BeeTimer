import React from 'react'
 

export default ({title, changeTime, type, time, formatTime}) => {
    
    return(
        <div>
            <h3>{title}</h3>
            <div>
                <button>down</button>
                <h3>{formatTime(time)}</h3>
                <button>Up</button>
            </div>
        </div>
    ) 
}
