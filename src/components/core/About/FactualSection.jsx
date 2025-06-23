import React from 'react'

const FactualSection = () => {
    const Facts=[
        {counter:"5K", text:"Active Students"},
        {counter:"10+", text:"Mentors"},
        {counter:"200+", text:"Courses"},
        {counter:"50+", text:"Awards"},
    ]
  return (
    <div className='flex flex-row justify-between w-10/12 max-w-maxContent mx-auto py-20'>
        {
            Facts.map((fact,index)=>{
                return(
                    <div className='flex flex-col gap-4' key={index}>
                        <div className='text-3xl font-bold'>
                            {fact.counter}
                        </div>
                        <div className='text-richblack-500'>
                            {fact.text}
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default FactualSection