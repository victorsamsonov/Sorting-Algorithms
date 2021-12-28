import React, {useState, useEffect} from 'react';
import '../App.css';

function SortedLine({height=20, selected=false, final=false, id, width, index}) {

  return (
    <div className="sorted-line" style={{height, backgroundColor:final ?'green ':(selected ? 'red' : 'white'), width }}
    id={id}>
     {/* {width > 20 ? 
     <text>
        {height}
     </text>:
     <></>
     } */}
    </div>
  );
}

export default SortedLine;