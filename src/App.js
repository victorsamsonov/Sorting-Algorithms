import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import MainContent from "./Components/MainContent";
import Settings from "./Components/Settings";
import Configuration from "./Components/Configuration";
import SortedLine from "./Components/SortedLine";
import { quickSort } from "./Algorithms/QuickSort";
import { mergeSort, getMergeSortAnimations } from "./Algorithms/MergeSort";
import { Slider } from "material-ui-slider";
import HeapSort from "./Algorithms/HeapSort";
import Modal from "./Components/Modal";


function App() {
  const WIDTH = 550;
  const DEFAULT_DT = 70;
  // Constant for setTimeout() animations
  const QUICKSORT = "Quick Sort";
  const RANDOMIZEARRAY = "Randomize Array";
  const MERGESORT = "Merge Sort";
  const WHITE = "white";
  const HEAPSORT = "Heap Sort";
  const INFO = 'Info'
  // Colors
  const PRIMARY = "#AEFEFF";
  const SECONDARY = "#30C785";
  const TERTIARY = "#800080";
  const [fadeClass, setFadeClass] = useState("fade");
  const [vals, setVals] = useState([]);
  const [lines, setLines] = useState([]);
  const [currAnimations, setAnimations] = useState();
  const [idCounter, setidCounter] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [animation, setAnimation] = useState(true);
  const [isSorted, setIsSorted] = useState(false);
  const [DT, setDT] = useState(DEFAULT_DT);
  const [size, setSize] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const randFunc = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const transformArray = (array) => {
    let out = [];
    for (let e of array)
      out.push({
        position: e.props.index,
        arr: e,
      });
    return out;
  };

  // Settings section that determine if animations are on or off
  const handleAnimationChange = () => {
    if (animation) {
      setDT(0);
      setAnimation(false);
    } else {
      setDT(DEFAULT_DT);
      setAnimation(true);
    }
  };

  // Used to initialize the lines that are going to get sorted
  const handleVals = () => {
    setIsSorted(false);
    let vals = [];
    let out = [];
    for (let i = 0; i < size; i++)
      out.push(
        <SortedLine
          height={randFunc() * 5 + 5}
          key={i}
          id={i}
          index={i}
          selected={false}
          width={WIDTH / size}
        />
      );
    return out;
  };

  const handleQuickSortAnimation = () => {
    
    let currentAnimations = [];
    let currentArray = lines;
    let copyArray = lines.slice();
    let obj = quickSort(
      currentArray,
      0,
      currentArray.length - 1,
      currentAnimations,
      copyArray
    );
    setLines(copyArray)
    
    let animations = obj.animations;
    let newArray = obj.arr;
    // Used to determine the duration of an animation being updated
    let counter = 1;
    // Rate of animations being updated
    let dt = DT;
    let LEN = animations.length;
    // Iterates through an array containing all the animations that occured during quickSort()
    while (animations.length) {
      let animation = animations.shift();
      // Handles the current pivot animation (purple)
      if (animation.pivot) {
        setTimeout(() => {
          document.getElementById(
            animation.arr.props.id
          ).style.backgroundColor = TERTIARY;
        }, counter * dt);
      }
      // Handles the current left element animation (cyan)
      if (animation.left) {
        setTimeout(
          () =>
            (document.getElementById(
              animation.arr.props.id
            ).style.backgroundColor = PRIMARY),
          counter * dt
        );
        setTimeout(
          () =>
            (document.getElementById(
              animation.arr.props.id
            ).style.backgroundColor = "white"),
          (counter + 1) * dt
        );
      }
      // Handles the current right element animation (cyan)
      if (animation.right) {
        setTimeout(
          () =>
            (document.getElementById(
              animation.arr.props.id
            ).style.backgroundColor = PRIMARY),
          counter * dt
        );
        setTimeout(
          () =>
            (document.getElementById(
              animation.arr.props.id
            ).style.backgroundColor = "white"),
          (counter + 1) * dt
        );
      }
      // Animates the two elements being swapped (colors them green)
      if (animation.swap) {
        setTimeout(() => {
          document.getElementById(
            animation.arrLeft.props.id
          ).style.backgroundColor = PRIMARY;
          document.getElementById(
            animation.arrRight.props.id
          ).style.backgroundColor = PRIMARY;
          let temp = document.getElementById(animation.arrLeft.props.id).style
            .height;
          document.getElementById(animation.arrLeft.props.id).style.height = `${
            document.getElementById(animation.arrRight.props.id).style.height
          }`;
          document.getElementById(
            animation.arrRight.props.id
          ).style.height = `${temp}`;
        }, counter * dt);

        setTimeout(() => {
          document.getElementById(
            animation.arrLeft.props.id
          ).style.backgroundColor = "white";
          document.getElementById(
            animation.arrRight.props.id
          ).style.backgroundColor = "white";
        }, (counter + 1) * dt);
      }
      counter++;
      // Buttons enabled once again since the animation is over
      if (!animations.length) {
        setTimeout(() => {
          setButtonsDisabled(false);
          setIsSorted(true);
        }, counter * dt);
      }
    }
  };

  const handleMergeSortAnimation = () => {
    let currentArray = lines.slice();
    let copy = lines.slice();
    let currentAnimations = [];
    let newArray = mergeSort(currentArray, copy, currentAnimations);
    let animationsLength = currentAnimations.length;
    let linesToSort = document.getElementsByClassName("sorted-line");
    // Loops throught the animation array
    for (let i = 0; i < animationsLength; i++) {
      let isColorChange = i % 3 !== 2;
      if (isColorChange) {
        let [ptr1, ptr2] = currentAnimations[i];
        let color = i % 3 === 0 ? TERTIARY : WHITE;
        setTimeout(() => {
          linesToSort[ptr1].style.backgroundColor = color;
          linesToSort[ptr2].style.backgroundColor = color;
        }, i * DT);
      } else {
        setTimeout(() => {
          let [ptr1, newHeight, ptr2] = currentAnimations[i];
          console.log(ptr1, ptr2);
          let temp = linesToSort[ptr1].style.height;
          console.log(temp, newHeight);
          linesToSort[ptr1].style.height = `${newHeight}px`;
          if (newHeight !== temp) linesToSort[ptr2].style.height = `${temp}px`;
        }, i * DT);
      }
    }
    // Resets the Lines color to white
    setTimeout(() => {
      setButtonsDisabled(false);
      setIsSorted(true);
      for (let sortedLine of linesToSort)
        sortedLine.style.backgroundColor = WHITE;
      setLines([newArray]);
    }, DT * animationsLength);
  };

  // Handles the buttons clicked in the header (determines whether to randomize, perform an algorithm or display more info about sorting algorithms)
  function handleSettingsClick(prop) {
    console.log(prop);
    // Randomizes Array
    if (prop == RANDOMIZEARRAY) {
      setLines([]);
      setLines(handleVals());
    } else if (prop === QUICKSORT) {
      setButtonsDisabled(true);
      setTimeout(handleQuickSortAnimation, 1);
    } else if (prop === MERGESORT) {
      setButtonsDisabled(true);
      handleMergeSortAnimation();
    } else if (prop == HEAPSORT) {
      setButtonsDisabled(true);
      let currentArray = lines.slice();
      let copy = lines.slice();
      let currentAnimations = [];
      let newArray = HeapSort(currentArray, copy, currentAnimations);
      let counter = 0;
      while (currentAnimations.length) {
        let animation = currentAnimations.pop();
        let { arr1, arr2, type } = animation;
        if (arr1.props.id !== arr2.props.id) {
          arr1 = document.getElementById(arr1.props.id);
          arr2 = document.getElementById(arr2.props.id);
          setTimeout(() => {
            let arr2Height = arr2.style.height;
            let arr1Height = arr1.style.height;
            // Swap the height values
            arr1.style.height = arr2Height;
            arr2.style.height = arr1Height;
            arr1.style.backgroundColor = type === 'min' ? SECONDARY : PRIMARY
            arr2.style.backgroundColor = type === 'min' ? SECONDARY : PRIMARY

            console.log();
          }, DT * counter);

          setTimeout(() => {
            arr1.style.backgroundColor = WHITE;
            arr2.style.backgroundColor = WHITE;
          }, DT * (counter+1));
        }

        if (!currentAnimations.length) {
          setTimeout(() => {
            setButtonsDisabled(false)
            setIsSorted(true)
            setLines([newArray])
          }, DT * counter);
        }
        counter++;
      }
    } else if (prop === INFO) {
      setOpenModal(!openModal)
    }
  }

  useEffect(() => {
    setLines(handleVals());
  }, [size]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Sorting Visualizer</h1>
        <Settings
          onClick={(out) => {
            // Disables the buttons since an animation is taking place
            if (out !== RANDOMIZEARRAY && !isSorted && lines.length !== 1) {
              handleSettingsClick(out);
            } else if (out === RANDOMIZEARRAY) {
              handleSettingsClick(out);
            }
          }}
          buttonsDisabled={buttonsDisabled}
          modal={openModal}
        />
      </header>
      <div className="body">
        {isSorted ? (
          <text className="sorted-text">
            The Array is Sorted, please generate a new array
          </text>
        ) : (
          <>
            <text className="sorted-text"></text>
          </>
        )}
         { openModal && <Modal setOpenModal={(prop)=>setOpenModal(prop)}
        closeModal={setOpenModal}/>}
        <MainContent className={fadeClass} lines={lines} />
        <header className="bottom-header">
          <h1 className="title"> Settings </h1>
          <Configuration
            currentSpeed={1500 - DT}
            currentSize={size}
            speedFunc={(value) => setDT(value)}
            buttonsDisabled={buttonsDisabled}
            sizeFunc={(value) => {
              setSize(value);
            }}
            animation={animation}
            animationButton={true}
            animationFunc={handleAnimationChange}
          />
          
        </header>
       
      </div>
      
    </div>
  );
}

export default App;
