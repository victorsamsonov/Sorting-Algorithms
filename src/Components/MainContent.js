import React, {useState, useEffect} from 'react';
import '../App.css';
import SortedLine from './SortedLine';

function MainContent({className, lines}) {
  const [currentLines, setCurrentLines] = useState(lines)
  useEffect (()=>{
    setCurrentLines(lines)
  }, [lines])
  return (
    <div className={`main-wrapper ${className}`}>
        {currentLines} 
    </div>
  );
}

export default MainContent;