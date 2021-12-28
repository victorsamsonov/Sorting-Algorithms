import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
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
  const DT = 10;
  const QUICKSORT = 'Quick Sort';
  const RANDOMIZEARRAY = 'Randomize Array';
  const MERGESORT = 'Merge Sort';
  const HEAPSORT = 'Heap Sort'; 
  const [fadeClass, setFadeClass] = useState("fade");
  const [vals, setVals] = useState([]);
  const [lines, setLines] = useState([]);
  const [currAnimations, setAnimations] = useState();
  const [idCounter, setidCounter] = useState(0)
  const [buttonsDisabled, setButtonsDisabled] = useState(false)
  const [isSorted, setIsSorted] = useState(false)

  const randFunc = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const transformArray = (array) => {
    let out = [];
    for (let e of array) out.push({
      position:e.props.index,
      arr: e
    })
    return out;
  }
  const handleVals = () => {
      setIsSorted(false)
      let vals = [];
      let out = [];
      for (let i = 0; i < size; i++) out.push(<SortedLine height={randFunc()*5 + 5} key={i} id={i} index={i} selected={false} width={WIDTH/size}/>);
      let counter = 0
      return out;
    };
  
  function handleSettingsClick (prop)
  {
    if (prop == RANDOMIZEARRAY){
      setLines([])
      setLines(handleVals())
    }
    else if (prop === QUICKSORT){
      
       let currentAnimations = []
       let currentArray = lines
       let copyArray = lines.slice()
       let obj = quickSort(currentArray, 0, currentArray.length-1, currentAnimations, copyArray)
       let animations = obj.animations
       let newArray = obj.arr
       // Used to determine the duration of an animation being updated
       let counter = 1;
       // Rate of animations being updated
       let dt = DT;
       // Iterates through an array containing all the animations that occured during quickSort()
       while (animations.length){
         let animation = animations.shift()
         // Handles the current pivot animation (purple)
         if (animation.pivot) {
           
           setTimeout(() =>{
             document.getElementById(animation.arr.props.id).style.backgroundColor='purple'
            }, counter * dt)
         }
        // Handles the current left element animation (cyan)
         if (animation.left){
           setTimeout(() =>document.getElementById(animation.arr.props.id).style.backgroundColor='#009DAE', counter * dt)
           setTimeout(() =>document.getElementById(animation.arr.props.id).style.backgroundColor='white', (counter+1) * dt)
         }
         // Handles the current right element animation (cyan)
         if (animation.right){
           setTimeout(() =>document.getElementById(animation.arr.props.id).style.backgroundColor='#009DAE', counter * dt)
            setTimeout(() =>document.getElementById(animation.arr.props.id).style.backgroundColor='white', (counter+1) * dt)
         }

         if (animation.final){
          setTimeout(() =>document.getElementById(animation.arr.props.id).style.backgroundColor='red', counter * dt)
         }
        // Animates the two elements being swapped (colors them green)
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
         // Buttons enabled once again since the animation is over
         if (!animations.length){
          setTimeout(() =>{
            setButtonsDisabled(false)
            setIsSorted(true)
            console.log('yessir')
          }, (counter+2) * dt)
         }
       }
       setLines([copyArray])
    }

    else if (prop === MERGESORT){
      let copy = transformArray(lines.slice())
      let currentAnimation = []
      let currentArray = transformArray(lines.slice())
      console.log(copy)
      let val = mergeSort(currentArray, currentAnimation, copy)  
      
      let counter = 0;
      let dt = DT;
      while (currentAnimation.length){
        let animation = currentAnimation.shift()
        // console.log(animation)
       // Animates the two elements being swapped (colors them green)
        if (animation.mark){
          setTimeout(()=>{
            for (let obj of animation.arrLeft){
              document.getElementById(obj.arr.props.id).style.backgroundColor='#30DD92';
            }
            for (let obj of animation.arrRight){
              document.getElementById(obj.arr.props.id).style.backgroundColor='red';
            }
          }, dt * counter)
          setTimeout(()=>{
            for (let obj of animation.arrLeft){
              document.getElementById(obj.arr.props.id).style.backgroundColor='white';
            }
            for (let obj of animation.arrRight){
              document.getElementById(obj.arr.props.id).style.backgroundColor='white';
            }
          }, dt * (counter+1))      
        }
        
        if (animation.swap){
          // console.log('swap')
          setTimeout(()=>{
              document.getElementById(animation.arr.props.id).style.backgroundColor='purple';
              let temp = document.getElementById(animation.arr1.props.id).style.height
              document.getElementById(animation.arr1.props.id).style.height = `${document.getElementById(animation.arr2.arr.props.id).style.height}`;
              document.getElementById(animation.arr2.arr.props.id).style.height = `${temp}`
          }, dt * counter)

          setTimeout(()=>{
            document.getElementById(animation.arr.props.id).style.backgroundColor='white'; 
        }, dt * counter)  
        }

        if (animation.pos){
          // console.log(animation)
          if (animation.right){
              console.log(animation)
              setTimeout(()=>{
              document.getElementById(animation.position).style.backgroundColor='cyan';
              let temp = document.getElementById(animation.position).style.height;
               console.log(animation.arr.arr)
              document.getElementById(animation.position).style.height = `${animation.arr.arr.props.height}px`
              document.getElementById(animation.arr.arr.props.id).style.height = `${temp}px`


          }, dt * counter)

        //   setTimeout(()=>{
        //     document.getElementById(animation.position).style.backgroundColor='white'; 
        // }, dt * counter)  
            
          }
        //   setTimeout(()=>{
        //       document.getElementById(animation.arr.props.id).style.backgroundColor='purple';
        //       let temp = document.getElementById(animation.arr1.props.id).style.height
        //       document.getElementById(animation.arr1.props.id).style.height = `${document.getElementById(animation.arr2.arr.props.id).style.height}`;
        //       document.getElementById(animation.arr2.arr.props.id).style.height = `${temp}`
        //   }, dt * counter)

        //   setTimeout(()=>{
        //     document.getElementById(animation.arr.props.id).style.backgroundColor='white'; 
        // }, dt * counter)  
        }

        counter ++;
      }
      let check = []
      for(let a of currentAnimation){
        if (check.includes){
          console.log(a.arr.key)
        }
        else check.push(a.arr.key)
      }
      // setLines(val)
      setButtonsDisabled(false)
      console.log(val)
    }
  }
  useEffect(() => {
    setLines(handleVals());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Lorem Ipsum</h1>
        <Settings onClick={(out) => {
          // Disable the buttons since an animation is taking place
          if (out !== RANDOMIZEARRAY && !isSorted){
            setButtonsDisabled(true)
            handleSettingsClick(out)
          }
          else if (out === RANDOMIZEARRAY){
            handleSettingsClick(out)
          }
          }} buttonsDisabled={buttonsDisabled}/>
      </header>
      <div className="body">
        <MainContent className={fadeClass} lines={lines}/>
      </div>
      <button onClick={()=> setLines(handleVals())}></button>
    </div>
  );
}

export default App;
