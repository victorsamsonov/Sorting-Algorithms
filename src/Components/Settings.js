import React, {useState, useEffect} from 'react';
import '../App.css';
import {quickSort} from '../Algorithms/QuickSort'
import { mergeSort } from '../Algorithms/MergeSort';
import Button from './Button';
import QuickSort from '../Algorithms/QuickSort';

function Settings({vals, onClick}) {
const QUICKSORT = 'Quick Sort';
const MERGESORT = 'Merge Sort';
const HEAPSORT = 'Heap Sort';
const RANDOMIZEARRAY = 'Randomize Array';

 const BUTTONSARRAY = [
    {title:QUICKSORT, isSelected:false, func:()=>onClick(QUICKSORT)}, 
    {title:MERGESORT, isSelected:false, func:()=>onClick(MERGESORT)},
    {title:HEAPSORT, isSelected:false, func:()=>console.log(20)},
    {title:'Quick Sort', isSelected:true, func:()=>console.log(20)},
    {title:RANDOMIZEARRAY, isSelected:false, func:()=>onClick(RANDOMIZEARRAY), isSettings: true}
];

 const [buttonSettings, setButtonSettings] = useState(BUTTONSARRAY)

 const handleButtons = () => {
     let out = []
     for (let button of buttonSettings){
        out.push(
            <Button title={button.title} isSelected={button.isSelected} isSettings={button.isSettings} func={button.func}/>
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