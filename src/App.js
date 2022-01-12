import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import MainContent from "./Components/MainContent";
import Settings from "./Components/Settings";
import SortedLine from "./Components/SortedLine";
import { quickSort } from "./Algorithms/QuickSort";
import { mergeSort, getMergeSortAnimations } from "./Algorithms/MergeSort";

function App() {
  const [size, setSize] = useState(500);
  const WIDTH = 550;
  // Constant for setTimeout() animations
  const DT = 5;

  const QUICKSORT = "Quick Sort";
  const RANDOMIZEARRAY = "Randomize Array";
  const MERGESORT = "Merge Sort";
  const WHITE = "white";
  const HEAPSORT = "Heap Sort";
  // Colors
  const PRIMARY = "#009DAE";
  const SECONDARY = "#30DD92";
  const TERTIARY = "#8843F2";
  const [fadeClass, setFadeClass] = useState("fade");
  const [vals, setVals] = useState([]);
  const [lines, setLines] = useState([]);
  const [currAnimations, setAnimations] = useState();
  const [idCounter, setidCounter] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

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
    let animations = obj.animations;
    let newArray = obj.arr;
    // Used to determine the duration of an animation being updated
    let counter = 1;
    // Rate of animations being updated
    let dt = DT;
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
          console.log("yessir");
        }, (counter + 2) * dt);
      }
    }
    setLines([copyArray]);
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
          let [ptr1, newHeight] = currentAnimations[i];
          linesToSort[ptr1].style.height = `${newHeight}px`;
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
    // Randomizes Array
    if (prop == RANDOMIZEARRAY) {
      setLines([]);
      setLines(handleVals());
    } else if (prop === QUICKSORT) {
      handleQuickSortAnimation();
    } else if (prop === MERGESORT) {
      handleMergeSortAnimation();
    }
  }
  useEffect(() => {
    setLines(handleVals());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Sorting Visualizer</h1>
        <Settings
          onClick={(out) => {
            // Disables the buttons since an animation is taking place
            if (out !== RANDOMIZEARRAY && !isSorted) {
              setButtonsDisabled(true);
              handleSettingsClick(out);
            } else if (out === RANDOMIZEARRAY) {
              handleSettingsClick(out);
            }
          }}
          buttonsDisabled={buttonsDisabled}
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
        <MainContent className={fadeClass} lines={lines} />
      </div>
    </div>
  );
}

export default App;
