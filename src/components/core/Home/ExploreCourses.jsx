import React, { useState, useMemo } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import { Card } from "./Card";

const ExploreCourses = () => {
    const tabs = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths",
    ];
    const initialTab = HomePageExplore[0].tag;
    const initialCourses = HomePageExplore[0].courses;
    const initialCard = HomePageExplore[0].courses[0].heading;

    const [currentTab, setCurrentTab] = useState(initialTab);
    const [courses, setCourses] = useState(initialCourses);
    const [currentCard, setCurrentCard] = useState(initialCard);

    const setMyCards = (value) => {
        const probableCourses = HomePageExplore.find(
            (course) => course.tag === value
        );
        if (probableCourses) {
            setCourses(probableCourses.courses);
            setCurrentCard(probableCourses.courses[0].heading);
            setCurrentTab(value);
        }
    };

    return (
        <div className="flex flex-col gap-2 pb-60 relative">
            <div className="font-bold text-4xl">
                Unlock the <HighlightText text={"power of code"} />
            </div>
            <div className="text-richblack-400 font-semibold text-lg">
                Learn to build anything you can imagine
            </div>
            <div className="bg-richblack-800 rounded-full py-2 px-4 flex flex-row gap-4 mx-auto mt-10">
                {tabs.map((element, index) => (
                    <div
                        className={`${
                            currentTab === element
                                ? "bg-richblack-900 text-white"
                                : "bg-richblack-800 text-richblack-400"
                        } px-4 py-2 gap-4 rounded-full hover:bg-richblack-900 hover:text-white cursor-pointer transition-all duration-200`}
                        key={index}
                        onClick={() => setMyCards(element)}
                    >
                        {element}
                    </div>
                ))}
            </div>

            {/* Cards Section */}
            <div className="flex flex-row gap-12 mx-auto absolute top-72 flex-wrap">
                {courses.map((element, index) => (
                    <Card
                        course={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExploreCourses;
