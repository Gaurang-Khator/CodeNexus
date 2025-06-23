import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import CourseViewerSidebar from "../components/core/CourseViewer/CourseViewerSidebar";
import { useSelector, useDispatch } from "react-redux";
import { courseEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import Error from "./Error";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../components/core/slices/viewCourseSlice";
import ReviewModal from "../components/core/CourseViewer/ReviewModal";

const CourseViewer = () => {
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { GET_COURSE_PLUS_PROGRESS_DETAILS_API } = courseEndpoints;
    const [reviewModalData, setReviewModalData] = useState(false);
    console.log(reviewModalData);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                console.log('fetchign coure in fo ');
                const response = await apiConnector(
                    "POST",
                    GET_COURSE_PLUS_PROGRESS_DETAILS_API,
                    { token, courseID: courseId }
                );
                console.log("Response",response)

                if (response?.success) {
                    let lectures = 0;
                    for (let section of response.data.course.courseContent) {
                        // Add the length of the subSections array to lectures
                        lectures += section.subSections.length;
                    }
                    dispatch(setCompletedLectures(response.data.completedLectures));
                    dispatch(setEntireCourseData(response.data.course));
                    dispatch(setCourseSectionData(response.data.course.courseContent));
                    dispatch(setTotalNoOfLectures(lectures));
                } else {
                    // Render error component or handle error
                    return (<div><Error /></div>);
                }
            } catch (error) {
                console.error("Problem occurred while fetching the course data:", error);
            }
        };

        fetchCourseData();
    }, [token, GET_COURSE_PLUS_PROGRESS_DETAILS_API, courseId, dispatch]);

    return (
        <div className="flex flex-row">
            <div className="w-[20%] min-h-screen border-r-[1px] border-r-[white]">
                <CourseViewerSidebar setReviewModalData={setReviewModalData} />
            </div>
            <div className="w-[80%] min-h-screen">
                <Outlet />
            </div>
            {reviewModalData && (
                <ReviewModal setReviewModalData={setReviewModalData} />
            )}
        </div>
    );
};

export default CourseViewer;
