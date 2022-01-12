function partition (arr, l, r, animations=[], copy, finalize=false){
   
    var p = arr[Math.floor((r + l)/2)].props.height;
    let pivotAnimationArray = {
        pivot:true,
        arr: copy[Math.floor((r + l)/2)],
        index: Math.floor((r + l)/2)
    }
    animations.push(pivotAnimationArray)
    while (l <= r) {
    
        while (arr[l].props.height < p){
            let leftPointerAnimationArray = {
                left:true,
                arr: copy[l],
                index: l
            }
            animations.push(leftPointerAnimationArray)
            l++;
        }

        while (arr[r].props.height > p){
            let rightPointerAnimationArray = {
                right:true,
                arr: copy[r],
                index: r
            }
            animations.push(rightPointerAnimationArray)
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
    var index;
   
    if (arr.length > 1){
        index = partition(arr, l, r, animations, copy);
        
        if(l < index - 1){
            quickSort(arr, l, index-1, animations, copy);

        }

        if (index < r){
            quickSort(arr, index, r, animations, copy, true);
        }
    }
    return {arr, animations};  

}

export default {quickSort}