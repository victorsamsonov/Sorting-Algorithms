import React, {useState, useEffect} from 'react'

function Button({title, func, isSelected=true, isSettings=false, disabled, animation, animationButton}) {
  
  return (
    <button  className={`button ${isSelected ? 'is-selected' : ''} ${isSettings ? 'is-settings' : ''} ${disabled ? 'is-disabled' : ''}
    ${animation ? 'is-animation' : ''}
    ${animationButton ? 'animation-button' : ''}`} 
    onClick={disabled ? undefined : func}>
        <h1 className='button-text'>
            {title}
        </h1>
    </button>
  );
}

export default Button;