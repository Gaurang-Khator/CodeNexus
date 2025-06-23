import React from 'react'

const HighlightText = ({text}) => {
  return (
    <div className='font-bold text-blue-200 inline'>
        {" "}
        {text}
    </div>
  )
}

export default HighlightText