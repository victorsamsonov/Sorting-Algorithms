import React, {useState, useEffect} from 'react';
import '../App.css';
import SortedLine from './SortedLine';

function MainContent({className, lines}) {
 
  return (
    <div className={`main-wrapper ${className}`}>
        {lines} 
    </div>
  );
}

export default MainContent;