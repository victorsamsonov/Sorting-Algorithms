import SortedLine from '../Components/SortedLine'
function partition (arr, l, r){
    const dt = 200;
    var p = arr[Math.floor((r + l)/2)].props.height;
    // setTimeout(()=>{
    //             document.getElementById(arr[Math.floor((r + l)/2)].props.id).style.backgroundColor = 'purple'
    //         }, dt*(l+r))
    
    while (l <= r) {
    
        while (arr[l].props.height < p){
            // setTimeout(()=>{
            //     document.getElementById(arr[l].props.id).style.backgroundColor = 'green'
            // }, l*dt)
            l++;
            // setTimeout(()=>{
            //     document.getElementById(arr[l].props.id).style.backgroundColor = 'white'
            // }, l*dt)
        }

        while (arr[r].props.height > p){
            let temp = arr
            setTimeout(()=>{
                document.getElementById(arr[r].props.id).style.backgroundColor = 'red'
            }, r*dt)
            setTimeout(()=>{
                document.getElementById(arr[r].props.id).style.backgroundColor = 'white'
            }, (r+1)*dt)
            r--;
             
        }

        if (l <= r){
            
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

export function quickSort(arr, l, r){
    var index;

    if (arr.length > 1){
        index = partition(arr, l, r);

        if(l < index - 1){
            quickSort(arr, l, index-1);
        }

        if (index < r){
            quickSort(arr, index, r);
        }
    }

    return arr;  
}


export default {quickSort}