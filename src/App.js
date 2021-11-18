import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import MainContent from "./Components/MainContent";
import Settings from "./Components/Settings";
import SortedLine from "./Components/SortedLine";
import { quickSort } from "./Algorithms/QuickSort";
import { mergeSort } from "./Algorithms/MergeSort";

function App() {
  const [size, setSize] = useState(200);
  const WIDTH = 550;
  const randFunc = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

   const handleVals = () => {
    let vals = [];
    let out = [];
    for (let i = 0; i < size; i++) out.push(<SortedLine height={randFunc()} id={i} selected={false} width={WIDTH/size}/>);   

    return out;
  };

  const QUICKSORT = 'Quick Sort';
  const RANDOMIZEARRAY = 'Randomize Array';
  const MERGESORT = 'Merge Sort';
  const HEAPSORT = 'Heap Sort'; 
  const [fadeClass, setFadeClass] = useState("fade");
  const [vals, setVals] = useState([]);
  const [lines, setLines] = useState(handleVals());
  
  function handleSettingsClick (prop){
    let val = 0
    if (prop == RANDOMIZEARRAY){
      setLines(handleVals())
    }

    if (prop === QUICKSORT){
      console.log(lines[0].props.height)
      let copy = lines
      let val = quickSort(copy, 0, copy.length-1)
      setLines([val])
      
    }

    if (prop === MERGESORT){
      let copy = lines
      let val = mergeSort([2, 5, 3, 1, 4, 6])  
    }
  }

  // useEffect(() => {
  //   setLines(handleVals());
  // }, [setLines]);

  // useEffect (()=>{
  //   setTimeout(300, setFadeClass(''))
  // }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Lorem Ipsum</h1>
        <Settings onClick={(out) => handleSettingsClick(out)} />
      </header>
      <div className="body">
        <MainContent className={fadeClass} lines={lines}/>
      </div>
      <button onClick={()=> setLines(handleVals())}></button>
    </div>
  );
}

export default App;
