import React from 'react'

const Stars = ({data}) => {
  let str='';
  for(let i=0;i<data;i++){
    str+="⭐"
  }
  
  
  
    return (
    <div>{str}</div>
  )
}

export default Stars