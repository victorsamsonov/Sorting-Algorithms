import React, {useState, useEffect} from 'react';
import '../App.css';

function SortedLine({height=20, selected=false, final=false, id, width}) {

  return (
    <div className="sorted-line" style={{height:height*5+5, backgroundColor:final ?'green ':(selected ? 'red' : 'white'), width }}
    id={id}>
     
    </div>
  );
}

export default SortedLine;