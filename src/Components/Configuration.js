import React, {useState, useEffect} from 'react';
import '../App.css';
import Button from './Button';
import { Slider } from 'material-ui-slider';

function Configuration({ buttonsDisabled, currentSpeed, currentSize, speedFunc, sizeFunc, animation, animationFunc }) {
    const MAXSPEED = 1500;
    const MAXSIZE = 400;
    const [speedValue, setSpeedValue] = useState(currentSpeed);
    const [sizeValue, setSizeValue] = useState(currentSize);
    const handleSpeedChange = (value) => {
        setSpeedValue(value)
        speedFunc(MAXSPEED - value)
    }

    const handleSizeChange = (value) => {
        setSizeValue(value)
        sizeFunc(value)
    }

  // useEffect (()=>{
  //   setSpeedValue(MAXSPEED - currentSpeed)
  // }, [currentSpeed])

  return (
    <div className="configuration-wrapper">
       <div className='configuration-section'>
            <text className="configuration-title">
                Sorting Speed
            </text>
            <Slider defaultValue={speedValue}
            max={MAXSPEED}
            onChange={handleSpeedChange}
            value={currentSpeed}
            />
       </div>
       <div className='configuration-section'>
       <text className="configuration-title">
                Array Size {sizeValue}
            </text>
            <Slider defaultValue={sizeValue}
            max={MAXSIZE+1}
            onChange={handleSizeChange}
            min={1}
            />
       </div>
       <div className='configuration-section'>
       <text className="configuration-title">
                Animations are {animation? 'ON' : 'OFF'}
            </text>
            <Button animation={!animation} title={"Animation"} func={() => animationFunc()}
            animationButton={true}
            />
       </div>
    </div>
  );
}

export default Configuration;