import React from 'react'
 

export default ({title, changeTime, type, time, formatTime}) => {
    
    return(
        <div>
            <h3>{title}</h3>
            <div>
                <button>Up</button>
            </div>
        </div>
    ) 
}
