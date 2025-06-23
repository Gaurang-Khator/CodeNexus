import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { profileEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { GET_ENROLLED_COURSES_API } = profileEndpoints;

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const response = await apiConnector(
                    "POST",
                    GET_ENROLLED_COURSES_API,
                    { token }
                );
                setEnrolledCourses(response.data);
                console.log("data", response.data);
            } catch (error) {
                console.error(
                    "Problem occurred while fetching the courses:",
                    error
                );
            }
        };

        fetchEnrolledCourses();
    }, [token, GET_ENROLLED_COURSES_API]);

    const handleCourseClick = (courseId, sectionId, subSectionId) => {
        navigate(
            `/view-course/${courseId}/section/${sectionId}/subSection/${subSectionId}`
        );
    };

    if (!enrolledCourses) {
        return <div>Loading...</div>;
    }

    if (enrolledCourses.length === 0) {
        return <div>You have not enrolled in any course</div>;
    }

    return (
        <div className="flex flex-col gap-2 w-full bg-richblack-900">
            <div className="w-11/12 mx-auto mt-10">
                <div>
                    <div className="text-richblack-300">
                        <span onClick={()=>{navigate('/')}} className="cursor-pointer text-sm text-richblack-400 ">Home</span>{" / "}
                        <span onClick={()=>{navigate('/dashboard/my-profile')}} className="cursor-pointer text-sm text-richblack-400 ">Dashboard</span>{" / "}
                        <span className="text-yellow-200">Enrolled Courses</span>
                    </div>
                    <div className="font-bold text-4xl text-richblack-5 mt-4">
                        Enrolled Courses
                    </div>
                </div>

                <div className="mt-6 rounded-lg">
                    <Table className="border-[1px] border-richblack-600 rounded-lg">
                        <Thead className='rounded-lg text-left '>
                            <Tr className="bg-richblack-600 text-richblack-100 ">
                                <Th className="w-[50%] pl-2 py-2 text-sm ">Course Name</Th>
                                <Th className="w-[25%]">Duration</Th>
                                <Th className="w-[25%] ">Progress</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {enrolledCourses.map((course) => (
                                <Tr
                                    key={course._id}
                                    className="cursor-pointer border-[1px] border-richblack-600"
                                    onClick={() =>
                                        handleCourseClick(
                                            course._id,
                                            course.courseContent[0]._id,
                                            course.courseContent[0]
                                                .subSections[0]._id
                                        )
                                    }
                                >
                                    <Td className="flex flex-row gap-2 p-3">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.courseTitle}
                                            className="rounded-md aspect-video"
                                            width={100}
                                        />
                                        <div>
                                            <div className="text-richblack-5 capitalize">{course.courseTitle}</div>
                                            <div className="text-richblack-300">
                                                {course.courseDescription.substr(0,110)}{course.courseDescription.length>110?"...":""}
                                            </div>
                                        </div>
                                    </Td>
                                    <Td className="text-richblack-100">{course.duration}</Td>
                                    <Td className="pr-4">
                                        <div className="text-richblack-100 mb-2">
                                            Progress:{" "}
                                            {course.progressPercentage || 0}%
                                        </div>
                                        <ProgressBar
                                            completed={
                                                course.progressPercentage || 0
                                            }
                                            height="8px"
                                            isLabelVisible={false}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default EnrolledCourses;
