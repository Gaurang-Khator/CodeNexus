import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import hello from "../../../../assets/Images/helloIcon.png";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../../services/apiConnector";
import { profileEndpoints } from "../../../../services/apis";
import InstructorChart from "./InstructorChart";

const InstructorDashboard = () => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { GET_INSTRUCTOR_DASHBOARD_DETAILS } = profileEndpoints;
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchInstructorInfo = async () => {
            setLoading(true); // Set loading to true before making API call
            try {
                const response = await apiConnector(
                    "POST",
                    GET_INSTRUCTOR_DASHBOARD_DETAILS,
                    { token }
                );
                if (response?.success) {
                    console.log(response);
                    setCourseData(response.data);
                } else {
                    throw new Error("Some problem occurred");
                }
            } catch (error) {
                console.error("Error occurred while calling the API", error);
                // Handle error here, e.g., display an error message
            } finally {
                setLoading(false); // Set loading to false after API call completes
            }
        };

        fetchInstructorInfo();
    }, [GET_INSTRUCTOR_DASHBOARD_DETAILS, token]);

    if (loading) return <div>Loading...</div>;
    return (
        <div className="bg-richblack-900 w-full">
            <div className="mx-auto w-8/12 pt-10">
                <div>
                    <p className="flex flex-row gap-2 items-center">
                        <div className="text-white font-bold text-xl">Hi {user.firstName} </div>
                        <img src={hello} width={30} />
                    </p>
                    <p className="text-richblack-100 font-semibold">Let's start something else</p>
                </div>
                <div className="flex flex-row justify-between mt-5">
                    <div className="w-[70%]">
                        {/* //Chart componetn */}
                        <InstructorChart courses={courseData.courseStatData}  />
                    </div>
                    <div className="bg-richblack-800 p-4 pr-16 pb-20 rounded-lg w-[28%]">
                        <h1 className="text-richblack-5 font-bold text-lg mb-5" >Statistics</h1>
                        <div>
                            <div className="text-richblack-200 font-mono">Total Courses</div>
                            <div className="text-richblack-5 font-bold text-xl" >{courseData.courseStatData.length}</div>
                        </div>
                        <div>
                            <div className="text-richblack-200 font-mono">Total Students</div>
                            <div className="text-richblack-5 font-bold text-xl" >{courseData.totalStudents}</div>
                        </div>
                        <div>
                            <div className="text-richblack-200 font-mono">Total Income</div>
                            <div className="text-richblack-5 font-bold text-xl" >Rs. {courseData.totalAmount}</div>
                        </div>
                    </div>
                </div>

                {/* Course Section  */}
                <div className="bg-richblack-800 rounded-lg  p-4 mt-10">
                    <div className="flex flex-row justify-between ">
                        <div className="text-richblack-5 font-bold text-xl mb-4">Your courses</div>
                        <div
                            onClick={() => {
                                navigate("/dashboard/my-courses");
                            }}
                            className="cursor-pointer text-yellow-100 font-bold"
                        >
                            View all
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        {/* 3 courses */}
                        {courseData.courseStatData.slice(0, 3).map((course) => {
                            return (
                                <div key={course.courseId}>
                                    <div>
                                        <img
                                            src={course.image}
                                            className="aspect-video w-[330px] rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-richblack-5">{course.courseName}</div>
                                        <div className="flex flex-row gap-1 text-richblack-300">
                                            <div>
                                                {course.studentsEnrolled}{" "}
                                                students
                                            </div>
                                            <div>|</div>
                                            <div>Rs. {course.price}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;
