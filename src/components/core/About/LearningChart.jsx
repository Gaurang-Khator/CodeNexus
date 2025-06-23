import React from 'react'
import ModifiedButtons from '../Home/ModifiedButtons';

const LearningChart = () => {

    const learningData=[
        {
            order:-1,
            heading:"World-Class Learning for ",
            highlightText:"Anyone, Anywhere",
            text:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            btnText:"Learn More",
            btnLink:"/",
        },
        {
            order:1,
            heading:"Curriculum Based on Industry Needs",
            text:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
        },
        {
            order:2,
            heading:"Our Learning Methods",
            text:"The learning process uses the namely online and offline."
        },
        {
            order:3,
            heading:"Certification",
            text:"You will get a certificate that can be used as a certification during job hunting."
        },
        {
            order:4,
            heading:'Rating "Auto-grading"',
            text:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
        },
        {
            order:5,
            heading:"Ready to Work",
            text:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
        },
    ]
    return (
        <div className='grid lg:grid-cols-4 grid-cols-1 mx-auto w-10/12 max-w-maxContent '>
            {learningData.map((card, index) => {
                return (
                    card.order === -1 ? (
                        <div key={index} className='col-span-2 bg-richblack-900 flex items-start flex-col p-8 '>
                            <h2 className='text-4xl font-semibold'>{card.heading}</h2>
                            <h3 className='text-4xl font-semibold'>{card.highlightText}</h3>
                            <p className='text-richblack-500 mt-6 mb-10'>{card.text}</p>
                            <ModifiedButtons linkto={card.btnLink} active={true}>{card.btnText}</ModifiedButtons>
                        </div>
                    ) : (
                        <div key={index} className={`${card.order===3 && "col-start-2"} ${card.order%2==1 ? "bg-richblack-700" : "bg-richblack-800" } p-8 flex flex-col gap-y-16`}>
                            <h2 className='text-lg  tracking-wider leading-5 font-semibold'>{card.heading}</h2>
                            <p className='text-richblack-500 pb-6'>{card.text}</p>
                        </div>
                    )
                );
            })}
        </div>
    );
}  
export default LearningChart