import React, {useState, useEffect} from 'react'

function Button({title, func, isSelected=true, isSettings=false}) {
 
  return (
    <div  className={`button ${isSelected ? 'is-selected' : ''} ${isSettings ? 'is-settings' : ''}`} onClick={func}>
        <h1 className='button-text'>
            {title}
        </h1>
    </div>
  );
}

export default Button;