import React, {useState, useEffect} from 'react';
import '../App.css';
import {quickSort} from '../Algorithms/QuickSort'
import { mergeSort } from '../Algorithms/MergeSort';
import Button from './Button';
import QuickSort from '../Algorithms/QuickSort';

function Settings({vals, onClick, buttonsDisabled}) {
  const [disabled, setDisabled] = useState(buttonsDisabled)
  const QUICKSORT = 'Quick Sort';
  const MERGESORT = 'Merge Sort';
  const HEAPSORT = 'Heap Sort';
  const RANDOMIZEARRAY = 'Randomize Array';
  const BUTTONSARRAY = [
    {title:QUICKSORT, isSelected:false, func:()=>onClick(QUICKSORT), disabled:buttonsDisabled}, 
    {title:MERGESORT, isSelected:false, func:()=>onClick(MERGESORT), disabled:buttonsDisabled},
    {title:HEAPSORT, isSelected:false, func:()=>console.log(20), disabled:buttonsDisabled},
    {title:'About Sorting Algorithms', isSelected:true, func:()=>console.log(20), disabled:buttonsDisabled},
    {title:RANDOMIZEARRAY, isSelected:false, func:()=>onClick(RANDOMIZEARRAY), isSettings: true, disabled:buttonsDisabled }
  ];

 const handleButtons = () => {
     let out = []
     for (let button of BUTTONSARRAY){
        out.push(
            <Button disabled={button.disabled} title={button.title} isSelected={button.isSelected} isSettings={button.isSettings} func={button.func}/>
        )
     }
     return out
 }
 
  return (
    <div className="settings-wrapper">
       {handleButtons()}
    </div>
  );
}

export default Settings;