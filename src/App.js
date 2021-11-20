import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import MainContent from "./Components/MainContent";
import Settings from "./Components/Settings";
import SortedLine from "./Components/SortedLine";
import { quickSort } from "./Algorithms/QuickSort";
import { mergeSort } from "./Algorithms/MergeSort";

function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function App() {
  const [size, setSize] = useState(10);
  const WIDTH = 550;
  const DT = 500;
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
      //  setTimeout(()=>document.getElementById(lines[0].props.id).style.backgroundColor='red', 1000)
      //  setLines(lines)
      const updateLines = (arr) =>{
        setLines(arr)
      }
       let currentAnimations = []
       let currentArray = lines
       let copyArray = lines.slice()
      //  console.log(copy)
       let obj = quickSort(currentArray, 0, currentArray.length-1, currentAnimations, copyArray)
       let animations = obj.animations
       let newArray = obj.arr
      //  console.log(copy)
      //  console.log(newArray)
      //  console.log(animations)
       let counter = 1;
       let dt = DT;
       while (animations.length){
         let animation = animations.shift()
         if (animation.pivot) {
          //  console.log('yo')

           setTimeout(() =>document.getElementById(animation.arr.props.id).style.backgroundColor='purple', counter * dt)
          //  setTimeout(() =>document.getElementById(animation.arr.props.id).style.backgroundColor='white', (counter + 1) * dt)
         }

         if (animation.left){
           setTimeout(() =>document.getElementById(animation.arr.props.id).style.backgroundColor='#009DAE', counter * dt)
           setTimeout(() =>document.getElementById(animation.arr.props.id).style.backgroundColor='white', (counter+1) * dt)
         }

         if (animation.right){
           setTimeout(() =>document.getElementById(animation.arr.props.id).style.backgroundColor='#009DAE', counter * dt)
            setTimeout(() =>document.getElementById(animation.arr.props.id).style.backgroundColor='white', (counter+1) * dt)
         }

         if (animation.swap){
           setTimeout(() =>{
             document.getElementById(animation.arrLeft.props.id).style.backgroundColor='#30DD92';
             document.getElementById(animation.arrRight.props.id).style.backgroundColor='#30DD92'
            let temp = document.getElementById(animation.arrLeft.props.id).style.height
            document.getElementById(animation.arrLeft.props.id).style.height = `${document.getElementById(animation.arrRight.props.id).style.height}`;
            document.getElementById(animation.arrRight.props.id).style.height = `${temp}`
             }, counter * dt)

             setTimeout(() =>{
             document.getElementById(animation.arrLeft.props.id).style.backgroundColor='white';
             document.getElementById(animation.arrRight.props.id).style.backgroundColor='white'
            
             }, (counter + 1) * dt)
         }
         
         counter++;
         if (!animations.length){
           setTimeout(()=>{ 
            setLines([newArray])
            console.log('updateeeed')
          }, (counter) * dt)
         }
       } 
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
