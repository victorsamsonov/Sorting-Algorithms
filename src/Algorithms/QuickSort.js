import SortedLine from '../Components/SortedLine'

function partition (arr, l, r, animations=[], copy){
   
    var p = arr[Math.floor((r + l)/2)].props.height;
    let pivotAnimationArray = {
        pivot:true,
        arr: copy[Math.floor((r + l)/2)],
        index: Math.floor((r + l)/2)
    }
    animations.push(pivotAnimationArray)

    // setTimeout(()=>{
    //             document.getElementById(arr[Math.floor((r + l)/2)].props.id).style.backgroundColor = 'purple'
    //         }, dt*(l+r))
    
    while (l <= r) {
    
        while (arr[l].props.height < p){
            let leftPointerAnimationArray = {
                left:true,
                arr: copy[l],
                index: l
            }
            animations.push(leftPointerAnimationArray)
            // setTimeout(()=>{
            //     document.getElementById(arr[l].props.id).style.backgroundColor = 'green'
            // }, l*dt)
            l++;
            // setTimeout(()=>{
            //     document.getElementById(arr[l].props.id).style.backgroundColor = 'white'
            // }, l*dt)
        }

        while (arr[r].props.height > p){
            let rightPointerAnimationArray = {
                right:true,
                arr: copy[r],
                index: r
            }
            animations.push(rightPointerAnimationArray)
            // setTimeout(()=>{
            //     document.getElementById(arr[r].props.id).style.backgroundColor = 'red'
            // }, r*dt)
            // setTimeout(()=>{
            //     document.getElementById(arr[r].props.id).style.backgroundColor = 'white'
            // }, (r+1)*dt)
            r--; 
        }

        if (l <= r){
            let swapAnimation = {
                swap:true,
                arrLeft: copy[l],
                arrRight: copy[r],
                l,
                r
            }
            animations.push(swapAnimation)
            swap(arr, l, r);
            l++;
            r--;
        }
     }
    return l
}

function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

export function quickSort(arr, l, r, animations=[], copy){
    // updateLines([arr])
    var index;
   
    if (arr.length > 1){
        index = partition(arr, l, r, animations, copy);
        
        if(l < index - 1){
            quickSort(arr, l, index-1, animations, copy);
        }

        if (index < r){
            quickSort(arr, index, r, animations, copy);
        }
    }

    return {arr, animations};  

}


export default {quickSort}











// import SortedLine from '../Components/SortedLine'

// function partition (arr, l, r, animations=[]){
//     const dt = 200;
//     var p = arr[Math.floor((r + l)/2)].props.height;
//     let pivotAnimationArray = {
//         pivot:true,
//         arr: arr[Math.floor((r + l)/2)]
//     }
//     animations.push(pivotAnimationArray)

//     // setTimeout(()=>{
//     //             document.getElementById(arr[Math.floor((r + l)/2)].props.id).style.backgroundColor = 'purple'
//     //         }, dt*(l+r))
    
//     while (l <= r) {
    
//         while (arr[l].props.height < p){
//             let leftPointerAnimationArray = {
//                 left:true,
//                 arr: arr[l]
//             }
//             animations.push(leftPointerAnimationArray)
//             // setTimeout(()=>{
//             //     document.getElementById(arr[l].props.id).style.backgroundColor = 'green'
//             // }, l*dt)
//             l++;
//             // setTimeout(()=>{
//             //     document.getElementById(arr[l].props.id).style.backgroundColor = 'white'
//             // }, l*dt)
//         }

//         while (arr[r].props.height > p){
//             let rightPointerAnimationArray = {
//                 right:true,
//                 arr: arr[r]
//             }
//             animations.push(rightPointerAnimationArray)
//             // setTimeout(()=>{
//             //     document.getElementById(arr[r].props.id).style.backgroundColor = 'red'
//             // }, r*dt)
//             // setTimeout(()=>{
//             //     document.getElementById(arr[r].props.id).style.backgroundColor = 'white'
//             // }, (r+1)*dt)
//             r--;
             
//         }

//         if (l <= r){
//             let swapAnimation = {
//                 swap:true,
//                 arrLeft: arr[l],
//                 arrRight: arr[r]
//             }
//             animations.push(swapAnimation)
//             swap(arr, l, r);
//             l++;
//             r--;
//         }
//      }
//     return {index:l, animations}
// }

// function swap(items, leftIndex, rightIndex){
//     var temp = items[leftIndex];
//     items[leftIndex] = items[rightIndex];
//     items[rightIndex] = temp;
// }

// export function quickSort(arr, l, r, animations=[]){
    
//     var index;
//     var newAnimations;
    
//     if (arr.length > 1){
//         {index, newAnimations} = partition(arr, l, r, animations);

//         if(l < index - 1){
//             quickSort(arr, l, index-1, animations);
//         }

//         if (index < r){
//             quickSort(arr, index, r, animations);
//         }
//     }

//     return {arr, animations};  
// }


// export default {quickSort}