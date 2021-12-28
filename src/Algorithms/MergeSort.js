export function mergeSort(arr, animations = [], copy){
    const index = Math.floor(arr.length/2); 
    if(arr.length < 2){
        console.log(arr[0].arr.key)
        return arr;
    }
    const left = arr.splice(0, index);
    return sort(mergeSort(left, animations, copy), mergeSort(arr, animations, copy), animations, copy);
}

function sort(left, right, animations, copy) {
    let arr = [];
    let currAnimation = [];
    let leftIndex = left[0].position ? left[0].position : right[0].position;
    
    // let markAnim = {
    //     mark:true,
    //     arrLeft:left,
    //     arrRight:right
    // }
    // animations.push(markAnim)
    while (left.length && right.length) {
        if (left[0].arr.props.height < right[0].arr.props.height) {
            let tempIndex = left[0].position
            let newIndex = leftIndex
            // let swapAnimation = {
            //     swap:true,
            //     index: tempIndex,
            //     newIndex,
            //     arr: left[0].arr,
            //     arr1: copy[tempIndex].arr,
            //     arr2: copy[leftIndex]
            // }

            // // let temp = copy[tempIndex].position
            // // copy[tempIndex].position = copy[leftIndex].position
            // // copy[leftIndex].position = temp
             
            // if (copy[tempIndex] && copy[leftIndex]) animations.push(swapAnimation);
            left[0].position = leftIndex
            leftIndex ++;
            
            arr.push(left.shift());
            // 2 4 1 3
        } else {
            let tempIndex = right[0].position;
            let newIndex = leftIndex;
           
            // let swapAnimation = {
            //     swap:true,
            //     index: tempIndex,
            //     newIndex,
            //     arr: right[0].arr,
            //     arr1: copy[tempIndex].arr,
            //     arr2: copy[leftIndex]
            // }

            // let temp = copy[tempIndex].position
            // copy[tempIndex].position = copy[leftIndex].position
            // copy[leftIndex].position = temp

            // if (copy[tempIndex] && copy[leftIndex]) animations.push(swapAnimation);
            right[0].position = leftIndex
            leftIndex ++;
            arr.push(right.shift());  
        }
    }
    for (let e of arr) animations.push({
        height: e.arr.props.height,
        position: e.position,
        pos: true,
        right: true,
        arr: e
    })

    for (let e of left) animations.push({
        height: e.arr.props.height,
        position: e.position,
        pos: true,
        right: true,
        arr: e
    })

    for (let e of arr) animations.push({
        height: e.arr.props.height,
        position: e.position,
        pos: true,
        right: true,
        arr: e
    })

    

    // for (let e of left) animations.push({
    //     height: e.arr.props.height,
    //     position: e.position,
    //     pos: true,
    //     right: true
    // })

    // for (let e of right) animations.push({
    //     height: e.arr.props.height,
    //     position: e.position,
    //     pos: true,
    //     right: true
    // })

    
    return [ ...arr, ...left, ...right ];
}


export default {mergeSort}