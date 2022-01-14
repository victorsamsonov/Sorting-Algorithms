export function oldMergeSort(arr, animations = [], copy = []) {
  const index = Math.floor(arr.length / 2);
  if (arr.length < 2) {
    return arr;
  }
  const left = arr.splice(0, index);
  return sort(
    mergeSort(left, animations, copy),
    mergeSort(arr, animations, copy),
    copy,
    animations
  );
}

function sort(left, right, copy = [], animations = []) {
  let arr = [];

  while (left.length && right.length) {
    if (left[0].arr.props.height < right[0].arr.props.height) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  return [...arr, ...left, ...right];
}

export function mergeSort(array, copy, animations) {
  if (array.length <= 1) return array;
  helper(array, 0, array.length - 1, copy, animations);
  return array
}


function helper(mainArray, leftPtr, rightPtr, copy, animations
) {
  if (leftPtr === rightPtr) return;
  let middlePtr = Math.floor((leftPtr + rightPtr) / 2);
  helper(copy, leftPtr, middlePtr, mainArray, animations);
  helper(copy, middlePtr + 1, rightPtr, mainArray, animations);
  merge(mainArray, leftPtr, rightPtr, middlePtr, copy, animations);
}

function merge(mainArray, leftPtr, rightPtr, middlePtr, copy, animations) {
  let k = leftPtr;
  let i = leftPtr;
  let j = middlePtr + 1;
  while (i <= middlePtr && j <= rightPtr) {
    // Push values that are being compared
    animations.push([i, j]);
    animations.push([i, j]);
    if (copy[i].props.height <= copy[j].props.height) {
      // Update our array with element at the left Pointer
      animations.push([k, copy[i].props.height, i]);
      mainArray[k] = copy[i];
      k++;
      i++;
    } else {
      // Update our array with element at the right Pointer
      animations.push([k, copy[j].props.height, j]);
      mainArray[k] = copy[j];
      k++;
      j++;
    }
  }
  while (i <= middlePtr) {
    animations.push([i, i]);
    animations.push([i, i]);
    // Update our array with element at the left Pointer
    animations.push([k, copy[i].props.height, i]);
    mainArray[k] = copy[i];
    i++;
    k++
  }
  while (j <= rightPtr) {
    animations.push([j, j]);
    animations.push([j, j]);
    // Update our array with element at the right Pointer
    animations.push([k, copy[j].props.height, j]);
    mainArray[k] = copy[j];
    j++;
    k++;
  }
}

export default { mergeSort };