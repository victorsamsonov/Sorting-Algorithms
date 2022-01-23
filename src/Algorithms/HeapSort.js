function heapify(array, len, idx, currentAnimations) {
  let l = 2 * idx + 1;
  let r = 2 * idx + 2;
  let max = idx;

  if (l < len && array[l].props.height > array[max].props.height) max = l;

  if (r < len && array[r].props.height > array[max].props.height) max = r;

  if (max !== idx) {
    let animation = {
      arr1: array[idx],
      arr2: array[max],
      type:'max'
    }
    currentAnimations.push(animation)
    let temp = array[idx];
    array[idx] = array[max];
    array[max] = temp;
    
    heapify(array, len, max, currentAnimations);
  }
}

function HeapSort(arr, copy, currentAnimations) {
  const LENGTH = arr.length;
  let idx = Math.floor(LENGTH / 2 - 1);
  let k = LENGTH - 1;

  while (idx >= 0) {
    heapify(arr, LENGTH, idx, currentAnimations);
    idx--;
  }

  while (k >= 0) {
    //   [arr[0], arr[k]] = [arr[k], arr[0]]
    let animation = {
      arr1: arr[k],
      arr2: arr[0],
      type: 'min'
    }
    currentAnimations.push(animation)
    let temp = arr[k];
    arr[k] = arr[0];
    arr[0] = temp;
    
    heapify(arr, k, 0, currentAnimations);
    k--;
  }

  // console.log(arr);
  return arr;
}

export default HeapSort;
