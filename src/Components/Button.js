import React, {useState, useEffect} from 'react'

function Button({title, func, isSelected=true, isSettings=false, disabled}) {
  
  return (
    <div  className={`button ${isSelected ? 'is-selected' : ''} ${isSettings ? 'is-settings' : ''} ${disabled ? 'is-disabled' : ''}`} onClick={disabled ? undefined : func}>
        <h1 className='button-text'>
            {title}
        </h1>
    </div>
  );
}

export default Button;