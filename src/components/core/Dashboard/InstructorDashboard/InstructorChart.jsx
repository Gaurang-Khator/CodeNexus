import React, { useState } from "react";
import PieChart from "./PieChart";

const InstructorChart = ({ courses }) => {
    const [isStudent, setIsStudent] = useState(true);

    const seriesRevenue = courses.map((course) => course.revenue);
    const seriesStudents = courses.map((course) => course.studentsEnrolled);
    const labels = courses.map((course) => course.courseName);
    return (
        <div className="bg-richblack-800 pr-10 pb-10 pt-4 pl-4 rounded-lg">
            <div className="text-white font-semibold text-xl">Visualize</div>
            <div className="flex flex-row gap-4 font-bold ">
                <div
                    className={`${
                        isStudent ? "text-yellow-50" : "text-yellow-500"
                    } cursor-pointer`}
                    onClick={() => {
                        setIsStudent(true);
                    }}
                >
                    Students
                </div>
                <div
                    className={`${
                        !isStudent ? "text-yellow-50" : "text-yellow-500"
                    } cursor-pointer`}
                    onClick={() => {
                        setIsStudent(false);
                    }}
                >
                    Income
                </div>
            </div>
            <div>
                {!isStudent ? (
                    <PieChart series={seriesRevenue} labels={labels} />
                ) : (
                    <PieChart series={seriesStudents} labels={labels} />
                )}
            </div>
        </div>
    );
};

export default InstructorChart;
